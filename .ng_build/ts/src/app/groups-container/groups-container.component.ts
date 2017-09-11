import { Component, OnInit } from '@angular/core';
import {HtClientService} from "ht-angular-client";

@Component({
  selector: 'ht-groups-container',
  template: `
    <div class="container" *ngIf="groups$ | async as groups">
      <ht-groups [groups]="groups"></ht-groups>
    </div>
  `,
  styles: [`
    .container {
      width: 100%;
    }
  `]
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
