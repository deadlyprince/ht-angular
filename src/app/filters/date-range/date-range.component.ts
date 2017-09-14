import { Component, OnInit } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";
import * as moment from 'moment-mini'
import {IDateRange} from "ht-js-client";

@Component({
  selector: 'ht-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less']
})
export class DateRangeComponent implements OnInit {
  dateRange$;

  customDates = [
    {
      label: "Yesterday",
      range: {
        start: moment().subtract(1, 'days').toISOString(),
        end: moment().subtract(1, 'days').endOf('day').toISOString()
      }
    }
  ];

  constructor(
    private usersClientService: HtUsersClientService
  ) { }

  ngOnInit() {
    this.dateRange$ = this.usersClientService.dateRangeObserver.data$();
  }

  setDateRange(range: IDateRange) {
    console.log(range);
    this.usersClientService.dateRangeObserver.updateData(range)
  }

}
