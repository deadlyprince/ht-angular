import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsAnalyticsListComponent } from './actions-analytics-list.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";
import {AnalyticsItemLoadModule} from "../analytics-container/analytics-item-load/analytics-item-load.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
    AnalyticsItemLoadModule
  ],
  declarations: [ActionsAnalyticsListComponent],
  exports: [ActionsAnalyticsListComponent]
})
export class ActionsAnalyticsListModule { }
