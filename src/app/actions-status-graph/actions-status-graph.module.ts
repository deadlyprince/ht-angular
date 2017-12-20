import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsStatusGraphComponent } from './actions-status-graph.component';
import {DateRangeModule} from "../filters/date-range/date-range.module";
import {AnalyticsTagsModule} from "../analytics-container/analytics-tags/analytics-tags.module";
import {AnalyticsItemLoadModule} from "../analytics-container/analytics-item-load/analytics-item-load.module";

@NgModule({
  imports: [
    CommonModule,
    DateRangeModule,
    AnalyticsTagsModule,
    AnalyticsItemLoadModule,
  ],
  declarations: [ActionsStatusGraphComponent],
  exports: [ActionsStatusGraphComponent]
})
export class ActionsStatusGraphModule { }
