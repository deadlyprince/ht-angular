import { Component, OnInit } from '@angular/core';
import {HtClientService} from "ht-angular-client";

@Component({
  selector: 'ht-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.less']
})
export class GroupsContainerComponent implements OnInit {
  groups$;
  constructor(
    private clientService: HtClientService
  ) { }

  ngOnInit() {
    this.clientService.groups.list.initListener();
    this.groups$ = this.clientService.groups.list.dataArray$
  }

}
