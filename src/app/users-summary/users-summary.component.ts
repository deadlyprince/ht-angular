import {Component, Input, OnInit} from '@angular/core';
import {IUserListSummary} from "ht-models";

@Component({
  selector: 'ht-users-summary',
  templateUrl: './users-summary.component.html',
  styleUrls: ['./users-summary.component.less']
})
export class UsersSummaryComponent implements OnInit {

  @Input() summary: IUserListSummary;

  constructor() { }

  ngOnInit() {

  }

  indexId(index, item) {
    return item.label
  }

}
