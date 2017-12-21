import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAnalyticsListComponent } from './users-analytics-list.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";
import {UserTableModule} from "../user-table/user-table.module";
import {AnalyticsItemLoadModule} from "../analytics-container/analytics-item-load/analytics-item-load.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
    UserTableModule,
    AnalyticsItemLoadModule,
  ],
  declarations: [UsersAnalyticsListComponent],
  exports: [UsersAnalyticsListComponent]
})
export class UsersAnalyticsListModule { }
