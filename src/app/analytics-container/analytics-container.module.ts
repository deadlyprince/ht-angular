import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsContainerComponent } from './analytics-container.component';
import {ActionsStatusGraphModule} from "../actions-status-graph/actions-status-graph.module";
import {UsersAnalyticsListModule} from "../users-analytics-list/users-analytics-list.module";
import {AnalyticsTestRoutingModule} from "../analytics-test/analytics-test-routing.module";
import { AnalyticsSlotDirective } from './analytics-item/analytics-slot.directive';
import {ActionsStatusGraphComponent, UsersAnalyticsListComponent} from "../../";
import { AnalyticsItemsService } from './analytics-items.service';
import { AnalyticsItemComponent } from './analytics-item/analytics-item.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsTestRoutingModule,
    ActionsStatusGraphModule,
    UsersAnalyticsListModule
  ],
  declarations: [AnalyticsContainerComponent, AnalyticsSlotDirective, AnalyticsItemComponent],
  exports: [AnalyticsContainerComponent, AnalyticsSlotDirective, AnalyticsItemComponent],
  entryComponents: [UsersAnalyticsListComponent, ActionsStatusGraphComponent],
  providers: [AnalyticsItemsService]
})
export class AnalyticsContainerModule { }
