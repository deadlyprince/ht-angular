import {Component, Input, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {HtMapService, HtUsersClientService} from "ht-angular-client";

@Component({
  selector: 'ht-users-map-container',
  templateUrl: './users-map-container.component.html',
  styleUrls: ['./users-map-container.component.less']
})
export class UsersMapContainerComponent implements OnInit {
  @Input() hasPlaceline: boolean = true;
  constructor() {

  }

  ngOnInit() {

  }

}
