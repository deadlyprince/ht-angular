import {IActionStatusGraph} from "ht-models";
import {DateRangeMap} from "ht-data";
import {ActionsStatusGraphService} from "../../actions-status-graph/actions-status-graph.service";
import {IAnalyticsPresets} from "./users-list-preset";
import {ActionsAnalyticsListService} from "../../actions-analytics-list/actions-analytics-list.service";
import {DateString, DistanceLocale, HMString, NameCase, TimeString} from "ht-utility";
import {IAction} from "ht-models";
import {ActionsSummaryService} from "../../actions-summary-chart/actions-summary.service";

export const actionsConfigPreset: IAnalyticsPresets = {
  status() {
    return {
      service: ActionsStatusGraphService,
      initialConfig: {
        title: "Actions status chart",
        initialDateRange: DateRangeMap.last_30_days,
        tags: [],
        chartFormat: [
          {
            title: "Completed",
            selector(graphData: IActionStatusGraph) {
              return graphData.completed
            }
          },
          {
            title: "Assigned",
            selector(graphData: IActionStatusGraph) {
              return graphData.assigned
            }
          }

        ]
      }
    }
  },
  max_distance() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Actions with max distance",
        tags: ['distance'],
        query: {ordering: '-distance'},
        tableFormat: [
          {
            column: "id",
            selector(action: IAction) {
              return action.lookup_id || "NA"
            }
          },
          {
            column: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            column: "distance",
            selector(action: IAction) {
              return action.distance ? DistanceLocale(action.distance) : "--"
            }
          },
          {
            column: "total duration",
            selector(action: IAction) {
              return action.duration ? HMString(action.duration / 60) : "--"
            }
          }
        ]
      }
    }
  },
  recently_assigned() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most Recent assigned actions",
        tags: ['live'],
        query: {ordering: '-assigned_at', status: 'assigned,started'},
        updateStrategy: "live",
        hideDatePicker: true,
        initialDateRange: DateRangeMap.last_30_days,
        tableFormat: [
          {
            column: "User",
            selector(action: IAction) {
              return action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            column: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            column: "Assigned at",
            selector(action: IAction) {
              return action.assigned_at ? TimeString(action.assigned_at) + " " + DateString(action.assigned_at, 'short') : "--"
            }
          },
          {
            column: "Expected at",
            selector(action: IAction) {
              return action.expected_at ?
                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                  TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--"
            }
          },
          {
            column: "Distance remaining",
            selector(action: IAction) {
              return action.display.distance_remaining ? DistanceLocale(action.display.distance_remaining) : "--"
            }
          }
        ]
      }
    }
  },
  recently_completed() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most Recent completed actions",
        tags: ['live'],
        query: {ordering: '-completed_at', status: 'completed'},
        updateStrategy: "live",
        hideDatePicker: true,
        initialDateRange: DateRangeMap.last_30_days,
        tableFormat: [
          {
            column: "User",
            selector(action: IAction) {
              return action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            column: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            column: "Completed at",
            selector(action: IAction) {
              return action.completed_at ? TimeString(action.completed_at) + " " + DateString(action.completed_at, 'short') : "--"
            }
          },
          {
            column: "Ontime",
            selector(action: IAction) {
              return action.display.is_late ? "Late" : "Ontime"
            }
          },
          {
            column: "Distance/Duration",
            selector(action: IAction) {
              const distance = action.distance ? DistanceLocale(action.distance) : "--";
              const duration = action.duration ? HMString(action.duration) : "--";
              return `${distance} / ${duration}`
            }
          }
        ]
      }
    }
  },
  max_duration() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Actions with max duration",
        query: {ordering: '-duration'},
        tableFormat: [
          {
            column: "User",
            selector(action: IAction) {
              return  action.user ? NameCase(action.user.name) : "NA";
            }
          },
          {
            column: "Type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            column: "duration",
            selector(action: IAction) {
              return action.duration ? HMString(action.duration / 60) : "--"
            }
          },
          {
            column: "total distance",
            selector(action: IAction) {
              return action.distance ? DistanceLocale(action.distance) : "--"
            }
          }
        ]
      }
    }
  },
  users_on_action() {
    return {
      service: ActionsAnalyticsListService,
      initialConfig: {
        title: "Most recent user on action",
        query: {ordering: '-assigned_at'},
        tags: ['users', 'live'],
        updateStrategy: 'live',
        hideDatePicker: true,
        tableFormat: [
          {
            column: "Name",
            selector(action: IAction) {
              return action.user ? action.user.name : "NA"
            }
          },
          {
            column: "Assigned at",
            selector(action: IAction) {
              return action.assigned_at ? TimeString(action.assigned_at) : "--"
            }
          },
          {
            column: "Last updated at",
            selector(action: IAction) {
              return action.user ? TimeString(action.user.last_heartbeat_at) : "--"
            }
          },
          {
            column: "Action type",
            selector(action: IAction) {
              return action.type
            }
          },
          {
            column: "Expected At",
            selector(action: IAction) {

              return action.expected_at ?
                TimeString(action.expected_at) + " " + DateString(action.expected_at, 'short') : action.eta ?
                  TimeString(action.eta) + " " + DateString(action.eta, 'short') : "--"
            }
          }
        ]
      }
    }
  },
  summary(actionsClient?, dateRangeService?, title?, queryLabels?) {
    return {
      service: ActionsSummaryService,
      initialConfig: {
        title: title || "Actions status summary",
        updateStrategy: 'live',
        tags: ['live'],
        query: {},
        queryLabels,
        dateRangeService,
        client: actionsClient
      }
    }
  }
};
