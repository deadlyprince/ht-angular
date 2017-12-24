import {Component, Input, OnInit} from '@angular/core';
import {IAnalyticsList} from "../interfaces/analytics-list";

@Component({
  selector: 'ht-actions-analytics-list',
  templateUrl: './actions-analytics-list.component.html',
  styleUrls: ['./actions-analytics-list.component.scss']
})
export class ActionsAnalyticsListComponent implements OnInit {
  @Input() listService: IAnalyticsList;
  constructor() { }

  ngOnInit() {
  }

  showActionDetail() {

  }

}
