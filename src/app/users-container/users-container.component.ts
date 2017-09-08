import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less']
})
export class UsersContainerComponent implements OnInit {
  @Input() hasPlaceline = true;
  usersPage$;
  users$;
  user$;
  selectedUserId$;
  selectedUserDataId$;
  loadingUserId$;
  loadingUserDataId$;
  @Input() hasMap: boolean = false;
  constructor(
    private userService: HtUsersClientService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    this.usersPage$ = this.userService.analytics.getListener();
    if (this.hasPlaceline) this.user$ = this.userService.placeline.getListener();
    this.users$ = this.userService.usersPlaceline$();
    // this.user$ = this.userService.placeline.getListener();
    // console.log(this.users$);
    this.loadingUserDataId$ = this.userService.placeline.loadingObserver.data$().distinctUntilChanged();
    this.loadingUserId$ = this.userService.analytics.loadingObserver.data$().distinctUntilChanged();

    // Observable.combineLatest(
    //   this.userService.placeline.loadingObserver.data$().distinctUntilChanged(),
    //   this.userService.analytics.loadingObserver.data$().distinctUntilChanged(),
    //   (loadingUserData, loadingUser) => {
    //     // console.log(loadingUserData, loadingUser, "loading user");
    //     return !!loadingUser || !!loadingUserData;
    //   }
    // ).subscribe((loading) => {
    //   // console.log("loading", loading);
    // })

    // this.users$.subscribe((usersPage) => {
    //   console.log(usersPage, "data");
    // })
    this.selectedUserDataId$ = this.userService.placeline.idObservable.data$();
    this.selectedUserId$ = this.userService.analytics.idObservable.data$();

  }

  clear() {
    this.mapService.segmentTrace.trace(null, this.mapService.map)
  }

  onAction(payload) {
    switch (payload['action']) {
      case "close":
        this.closeUserData(payload.user);
        break;
      case "detail": {
        this.selectUserData(payload.user);
        break;
      }
      case "default": {
        this.selectUserData(payload.user);
        break
      }
      default: {

      }

    }
  };

  closeUser() {

  }

  closeUserData(user) {
    // this.userService.placeline.setId(null);
    this.userService.analytics.setId(null)
  }


  selectUser(user) {
    // console.log("user", user.id);
    const id = user.id;
    // this.id.e.next(id)
    this.userService.analytics.setId(user.id);
    this.userService.placeline.setId(id);
    // this.id$.next(id)
    // this.userService.placeline.idObservable.e.next(user.id)
    // this.id.next(user.id)
    // this.userService.analytics.setId(user.id)

    // this.filteredUser
    // this.user$.do((userData: IUserData) => {
    //   console.log(userData);
    //   this.mapService.tracePlaceline(userData);
    //   this.mapService.resetBounds()
    // })

  };

  selectUserData(userData: IUserData) {
    const id = userData.id;
    // this.id.e.next(id)
    this.userService.placeline.setId(id);
  }

}
