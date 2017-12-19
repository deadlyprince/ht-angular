import { Injectable } from '@angular/core';
import {IAnalyticsItem} from "../interfaces/analytics-item";
import {UsersAnalyticsListComponent} from "../users-analytics-list/users-analytics-list.component";
import {usersAnalyticsListPresets, UsersAnalyticsListService} from "../users-analytics-list/users-analytics-list.service";
import {ActionsStatusGraphComponent} from "../../";
import {actionsConfigPreset, ActionsStatusGraphService} from "../actions-status-graph/actions-status-graph.service";

@Injectable()
export class AnalyticsItemsService {
  items: IAnalyticsItem[] = [
    {
      component: ActionsStatusGraphComponent,
      className: "is-12",
      tags: ['actions'],
      setData(instance: ActionsStatusGraphComponent) {
        instance.service = new ActionsStatusGraphService(actionsConfigPreset.status)
      }
    },
    {
      component: UsersAnalyticsListComponent,
      className: "is-6",
      tags: ['users'],
      setData(instance: UsersAnalyticsListComponent) {
        instance.listService = new UsersAnalyticsListService(
          usersAnalyticsListPresets.max_location_disabled_duration
        );
      }
    },
    {
      component: UsersAnalyticsListComponent,
      className: "is-6",
      tags: ['users'],
      setData(instance: UsersAnalyticsListComponent) {
        instance.listService = new UsersAnalyticsListService(
          usersAnalyticsListPresets.max_stop_duration
        );
      }
    },
    {
      component: UsersAnalyticsListComponent,
      className: "is-6",
      tags: ['users'],
      setData(instance: UsersAnalyticsListComponent) {
        instance.listService = new UsersAnalyticsListService(
          usersAnalyticsListPresets.max_network_offline
        );
      }
    },
    {
      component: UsersAnalyticsListComponent,
      className: "is-6",
      tags: ['users'],
      setData(instance: UsersAnalyticsListComponent) {
        instance.listService = new UsersAnalyticsListService(
          usersAnalyticsListPresets.max_distance
        );
      }
    }
  ];
  constructor() { }

}
