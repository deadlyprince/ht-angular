import {Component, Input, OnInit} from '@angular/core';
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserAnalytics, IUserData} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
import {htUser} from "ht-js-data";

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
    if (this.hasPlaceline) {
      this.user$ = this.userService.placeline.getListener();
      this.users$ = this.userService.usersPlaceline$();
    } else {
      this.users$ = this.userService.analytics.dataArray$
    }

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




    // this.userService.marks.getAll$((data, isFirst) => {
    //
    // }).subscribe((data) => {
    //   console.log(data);
    // });

    // this.userService.

    // console.log();
    // let a = this.userService.analytics.getAll$((data) => {
    //
    // }, () => {
    //
    // });
    // // console.log(this.userService.analytics);
    // a.subscribe((d) => {
    //   // console.log(d);
    // })
  }

  clear() {
    this.mapService.segmentTrace.trace(null, this.mapService.map)
  }

  selectUserMarker(user) {
    this.mapService.usersCluster.highlight(user)
  }

  onAction(payload) {
    console.log(payload, payload['action']);
    switch (payload['action']) {
      case "close":
        this.closeUser(payload.event);
        break;
      case "detail": {
        this.selectUserCard(payload.user);
        // this.selectUserMarker(payload.user);
        // this.selectUser(payload.user);
        break;
      }
      case "default": {
        this.selectUserCardAction(payload.user, payload.event);
        // this.selectUserData(payload.user, payload.event);
        break
      }
      default: {

      }

    }
  };

  selectUserCard(user) {
    if (this.hasPlaceline) {
      this.selectUser(user)
    } else {
      this.selectUserMarker(user)
    }

  }

  selectUserCardAction(user, event) {
    if (this.hasPlaceline) {
      this.selectUserData(user, event);
    } else {
      this.selectUserMarker(user);
    }
  }

  closeUser(event) {
    event.stopPropagation()
    // this.userService.placeline.setId(null);
    this.userService.analytics.setId(null)
  }


  selectUser(user) {
    const id = user.id;
    // this.id.e.next(id)
    this.userService.analytics.toggleId(user.id);
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

  selectUserData(userData: IUserData, event) {
    const id = userData.id;
    // this.id.e.next(id)
    event.stopPropagation();
    this.userService.placeline.toggleId(id);
  }

}
