import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IAccount, IAccountUser, IMembership, Page} from "ht-models";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {StorageService} from "../internal/storage.service";
import {GetSecretToken, getAuthHeaders} from "ht-data";
import {Observable} from "rxjs/Observable";
import {HtClientService} from "../ht/ht-client.service";
import {HtAccountUsersService} from "../ht/ht-account-users.service";

@Injectable()
export class AccountsService {
  accountUsers$: BehaviorSubject<null | IAccountUser> = new BehaviorSubject(null);
  memberships$: BehaviorSubject<null | Page<IMembership>> = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private client: HtClientService,
    private accountClient: HtAccountUsersService
  ) {
    this.getAccountUser()
  }
  environment: 'production' | 'test' = 'production';

  login(user) {

    return this.accountClient.api.login(user).pipe(
      tap((accountsUser: IAccountUser) => {
        this.setAccountUsers(accountsUser)
      })
    )
  };

  logout() {
    this.storage.removeAll();
    location.reload()
  };

  fetchAccountUsers(id, token): Observable<IAccountUser> {
    const headers = getAuthHeaders(token);
    return this.http.get<IAccountUser>(`https://api.hypertrack.com/api/v1/account_users/${id}`, {headers})
  }

  getAccountUser() {
    const token = this.storage.getToken();
    const tempToken = this.storage.getTempToken();
    const id = this.storage.getUserId();
    if (token && id) {
      this.client.token = token;
      if (tempToken) this.client.tempToken = tempToken;
      this.fetchAccountUsers(id, token).subscribe((accountUser) => {
        this.setAccountUsers(accountUser)
      });
      this.accountClient.api.membershipsAll(id, {}, {headers: getAuthHeaders(token)}).subscribe((members) => {
        this.memberships$.next(members)
      })
    }


  }

  setAccountUsers(accountUser: IAccountUser) {
    this.accountUsers$.next(accountUser);
    const account = accountUser.default_account;
    const id = accountUser.id;
    this.setAccount(account);
    this.storage.setUserId(id);
  }

  setAccount(account: IAccount, admin = true) {
    const token = GetSecretToken(account, this.environment);
    this.client.token = token;
    admin ? this.storage.setToken(token) : this.storage.setTempToken(token)
  };

}
