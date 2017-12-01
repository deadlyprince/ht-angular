import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {filter, map, pluck} from "rxjs/operators";

@Component({
  selector: 'ht-account-users-modal',
  templateUrl: './account-users-modal.component.html',
  styleUrls: ['./account-users-modal.component.scss']
})
export class AccountUsersModalComponent implements OnInit {

  constructor(
    private router: Router,
    private accountUsersService: AccountsService
  ) { }

  ngOnInit() {
  }

  close() {
    this.router.navigate([{outlets: {modal: null}}])
  }

  get memberships$() {
    return this.accountUsersService.memberships$.pipe(
      filter(data => !!data),
      pluck('results')
    );
  }

}
