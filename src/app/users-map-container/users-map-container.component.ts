import {Component, Input, OnInit} from '@angular/core';
import {IUserData} from "ht-models";
import {HtClientService, HtMapService, HtUsersClientService} from "ht-angular-client";

@Component({
  selector: 'ht-users-map-container',
  templateUrl: './users-map-container.component.html',
  styleUrls: ['./users-map-container.component.less']
})
export class UsersMapContainerComponent implements OnInit {
  @Input() hasPlaceline: boolean = true;
  @Input() key: string;
  constructor(
    private clientService: HtClientService
  ) {

  }

  ngOnInit() {
    if (this.key) {
      // console.log(this.key);
      this.clientService.setToken(this.key)
    }
  }

}
