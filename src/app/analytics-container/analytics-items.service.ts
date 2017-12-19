import { Injectable } from '@angular/core';
import {IAnalyticsItem} from "../interfaces/analytics-item";
import {UsersAnalyticsListComponent} from "../users-analytics-list/users-analytics-list.component";
import {usersAnalyticsListPresets, UsersAnalyticsListService} from "../users-analytics-list/users-analytics-list.service";
import {ActionsStatusGraphComponent} from "../../";
import {actionsConfigPreset, ActionsStatusGraphService} from "../actions-status-graph/actions-status-graph.service";

@Injectable()
export class AnalyticsItemsService {
  items: IAnalyticsItem[] = [
    new ActionsStatusGraphService(actionsConfigPreset.status),
    new UsersAnalyticsListService(usersAnalyticsListPresets.max_location_disabled_duration),
    new UsersAnalyticsListService(usersAnalyticsListPresets.max_stop_duration),
    new UsersAnalyticsListService(usersAnalyticsListPresets.max_network_offline),
    new UsersAnalyticsListService(usersAnalyticsListPresets.max_distance),
  ];
  constructor() { }

}
