import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserAnalytics, IUserData} from "ht-models";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import * as _ from "underscore";
// import {htUser} from "ht-js-data";
import {ApiType, QueryLabel} from "ht-client";
import {HtMapService} from "../ht/ht-map.service";
import {HtUsersService} from "../ht/ht-users.service";
import {Color} from "ht-utility";

@Component({
  selector: 'ht-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.less']
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  @Input() hasPlaceline = true;
  usersPage$;
  users$;
  user$;
  selectedUserId$;
  selectedUserDataId$;
  loadingUserId$;
  loadingUserDataId$;
  loadingUsers$;
  @Input() hasMap: boolean = false;
  @Input() showStatusSummary: boolean = true;
  @Input() showActiveSummary: boolean = true;
  @Input() apiType: ApiType = ApiType.analytics;
  queryMap: QueryLabel[] = [
    {
      label: 'Logged in',
      values: ['stopped', 'on_trip', 'network_offline'],
      color: Color.blue
    },
    {
      label: 'Logged off',
      values: ['logged_off'],
      color: '#a8a8a8',
    },
    {
      label: 'Location disabled',
      values: ['location_disabled'],
      color: Color.red
    },
  ];
  constructor(
    private userService: HtUsersService,
    private mapService: HtMapService
  ) { }

  ngOnInit() {
    // this.userService.list.setApiType(this.apiType);
    this.userService.list.setActive();
    if (this.hasPlaceline) {
      // this.user$ = Observable.empty();
      this.user$ = this.userService.placeline.data$;
      // this.users$ = this.userService.placelineOrList$();
      this.usersPage$ = this.userService.listPage$();
      this.mapService.usersCluster.onClick = (mapItems, entity) => {
        this.selectUserCard(entity.data);
      };
      // this.mapService.usersCluster.onClick = (data, marker) => {
      //   this.selectUserCard(data)
      // }
    } else {
      this.usersPage$ = this.userService.list.data$;
      // this.users$ = this.userService.list.dataArray$;
    }
    this.users$ = this.usersPage$.map((pageData) => {
      return pageData ? pageData.results : pageData
    });

    this.loadingUsers$ = this.userService.list.loading$.map(data => !!data).distinctUntilChanged();

    this.loadingUserDataId$ = this.userService.placeline.loading$.map(data => !!data).distinctUntilChanged();
    // this.loadingUserId$ = this.userService.list.loading$.distinctUntilChanged();

    this.selectedUserDataId$ = this.userService.placeline.id$;
    this.selectedUserId$ = this.userService.list.id$;
  }

  clear() {
    this.mapService.segmentTrace.trace(null)
  }

  selectUserMarker(user) {
    this.mapService.usersCluster.highlight(user)
  }

  onAction(payload) {
    // console.log(payload, payload['action']);
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
    event.stopPropagation();
    this.userService.list.setId(null);
    this.userService.placeline.setId(null)
  }


  selectUser(user) {
    const id = user.id;
    this.userService.list.toggleId(id);
    this.userService.placeline.toggleId(id);
    // this.userService.placeline.setId(id);

  };

  selectUserData(userData: IUserData, event) {
    const id = userData.id;
    event.stopPropagation();
    this.userService.placeline.toggleId(id);
  }

  fetchPage(number) {
    this.userService.list.setQuery({page: number})
  }

  hoverUser(userId: string | null) {
    this.mapService.usersCluster.setPopup(userId)
  }

  closeHoverUser() {
    this.hoverUser(null)
  }

  ngOnDestroy() {

  }

}
