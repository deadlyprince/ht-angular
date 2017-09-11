import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAction, ISegment, IUserData} from "ht-models";
import {NameCase} from "ht-js-utils";
import * as _ from "underscore";

@Component({
  selector: 'ht-placeline',
  template: `
    <div class="flex-column">
      <div class="flex-row segment" (click)="selectInUserData(segment)" [class.active-segment]="(selectedActivity == segment.id && segment.activityBorder && !selectedPartialSegmentId) || selectedPartialSegmentId === segment.id"  (mouseenter)="selectActivity(segment.id)" (mouseleave)="selectActivity('')"  *ngFor="let segment of placelineMod; trackBy:indexPlaceline; let last = last">
        <div class="time-container action-time">
          <div class="target-status text-muted">
          </div>
          <div class="timestamp">
            {{segment.time | timeString | dot: 'Unknown ETA'}}
          </div>
          <div class="text-muted">
            {{segment.time | dateString: 'short'}}
          </div>
        </div>
        <div class="pipe">
          <div class="bar" *ngIf="!last" [class.big]="(selectedActivity == segment.id && segment.activityBorder && !selectedPartialSegmentId) || selectedPartialSegmentId === segment.id" [class.solid]="segment.activityBorder" [ngClass]="segment.activityBorder"></div>
        </div>
        <div class="flex-column flex timeline-detail">
          <div class="activity-dot segment-dot" [class.activity-dot-ended]="segment.actionEnded" *ngIf="segment.actionD"><div class="auto">{{segment.actionD}} </div></div>
          <div *ngIf="segment.isLive" [ngClass]="segment.activityBg" class="segment-dot"><div *ngIf="segment.isLive" [ngClass]="segment.activityBg" class="pulse"></div></div>
          <div *ngIf="!segment.isLive && !segment.actionD" class="a-dot" [ngClass]="segment.activityBorder"></div>
          <div class="flex-column column-gap-10">
            <div (mouseenter)="selectAction(segment.action_id)" (mouseleave)="selectAction(null)" class="action-card" *ngIf="segment.actionText">
              <div class="flex-column column-gap-4">
                <div class="title">
                  {{segment.actionText}}
                </div>
                <div class="lookup" *ngIf="segment.actionLookupId">{{segment.actionLookupId}}</div>
                <div *ngIf="segment.expected_at && segment.actionEnd">Scheduled at {{segment.expected_at | timeString}}</div>
                <div *ngIf="segment.action_duration" class="flex-row row-gap-4">
                  <span>{{segment.action_duration / 60 | hmString}}</span>
                  <ng-template [ngIf]="(segment.action_distance || segment.action_distance == 0)">
                    <span>&bull;</span>
                    <span>{{segment.action_distance | distanceLocale}}</span>
                  </ng-template>
                </div>
              </div>
            </div>
            <!--<pre>-->
            <!--{{segment | json}}-->
            <!--</pre>-->
            <div class="activity-card flex-column" [class.activity-card-selected]="selectedPartialSegmentId == segment.id" *ngIf="segment.activityText">
              <div [ngClass]="segment.activityColor">
                {{segment.activityText | nameCase}}
              </div>
              <div class="flex-row row-gap-4 activity-stats align-center" *ngIf="segment.duration">
                <span>{{segment.duration / 60 | hmString}}</span>
                <ng-template [ngIf]="(segment.distance || segment.distance == 0) && segment.type == 'trip'">
                  <span>&bull;</span>
                  <span>{{segment.distance | distanceLocale}}</span>
                </ng-template>
              </div>
              <div>
                {{segment.placeAddress}}
              </div>
              <table class="table table-bordered table-condensed" *ngIf="segment.events && segment.events.length">
                <tbody>
                <tr *ngFor="let event of segment.events; trackBy:indexId">
                  <td>{{event.recorded_at | timeString}}</td>
                  <td>{{event.text}}</td>
                </tr>
                </tbody>
              </table>
              <!--<div class="close-card" *ngIf="selectedPartialSegmentId == segment.id && !isMobile" (click)="selectInUserData(null, $event)">-->
                <!--<i class="fa fa-times-circle fa-2x"></i>-->
              <!--</div>-->
            </div>
            <div *ngIf="segment.isLive" class="text-muted heatbeat">
              Last heartbeat
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="card" *ngIf="placelineMod && placelineMod.length == 0">
      <div class="card-content-mid text-center"><strong>No Placeline</strong></div>
    </div>
    <!--<div class="flex-column">-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container action-time">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--4: 32 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--<div class="activity-dot"><div class="auto">V</div></div>-->
    <!--<div class="action-title">-->
    <!--Visit assigned-->
    <!--</div>-->
    <!--<div class="text-sm">-->
    <!--# 15554A94-2578-480D-8BDD-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container action-time">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--4: 32 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--<div class="activity-dot"><div class="auto">S</div></div>-->
    <!--<div class="action-title">-->
    <!--Stopover assigned-->
    <!--</div>-->
    <!--<div class="text-sm">-->
    <!--# 15554A94-2578-480D-8BDD-->
    <!--</div>-->
    <!--<div class="activity-card trip-card flex-column ">-->
    <!--<div class="activity-title">-->
    <!--Walking-->
    <!--</div>-->
    <!--<div>3 Km * 32 min</div>-->
    <!--<div class="flex-row row-gap-4 align-center">-->
    <!--<i class="fa fa-plus-circle"></i>-->
    <!--<span class="badge">3</span> Events-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--4: 44 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid stop" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--&lt;!&ndash;<div class="activity-dot"><div class="auto">V</div></div>&ndash;&gt;-->
    <!--<div class="activity-card stop-card flex-column ">-->
    <!--<div class="activity-title">-->
    <!--Stop-->
    <!--</div>-->
    <!--<div>32 min</div>-->
    <!--<div class="flex-row row-gap-4 align-center">-->
    <!--<i class="fa fa-plus-circle"></i>-->
    <!--<span class="badge">1</span> Events-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--5: 02 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--&lt;!&ndash;<div class="activity-dot"><div class="auto">V</div></div>&ndash;&gt;-->
    <!--<div class="activity-card trip-card flex-column ">-->
    <!--<div class="activity-title">-->
    <!--Walking-->
    <!--</div>-->
    <!--<div>2km * 32 min</div>-->
    <!--&lt;!&ndash;<div class="flex-row row-gap-4 align-center">&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="fa fa-plus-circle"></i>&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="badge">1</span> Events&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--5: 32 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--&lt;!&ndash;<div class="activity-dot"><div class="auto">V</div></div>&ndash;&gt;-->
    <!--<div class="activity-card trip-card flex-column ">-->
    <!--<div class="activity-title">-->
    <!--Driving-->
    <!--</div>-->
    <!--<div>12km * 32 min</div>-->
    <!--&lt;!&ndash;<div class="flex-row row-gap-4 align-center">&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="fa fa-plus-circle"></i>&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="badge">1</span> Events&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container action-time">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--5: 54 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar solid trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--<div class="activity-dot"><div class="auto">V</div></div>-->
    <!--<div class="action-title">-->
    <!--Visit completed-->
    <!--</div>-->
    <!--<div class="text-sm">-->
    <!--# 15554A94-2578-480D-8BDD-->
    <!--</div>-->
    <!--<div class="activity-card trip-card flex-column ">-->
    <!--<div class="activity-title">-->
    <!--Walking-->
    <!--</div>-->
    <!--<div>3 Km * 32 min</div>-->
    <!--<div class="flex-row row-gap-4 align-center">-->
    <!--<i class="fa fa-plus-circle"></i>-->
    <!--<span class="badge">3</span> Events-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp-text">Last known</div>-->
    <!--<div class="timestamp">-->
    <!--6: 03 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar line no-info" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--<div class="activity-dot trip-dot"><div class="pulse"></div></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="flex-row">-->
    <!--<div class="time-container action-time">-->
    <!--<div class="target-status text-muted">-->
    <!--</div>-->
    <!--<div class="timestamp">-->
    <!--6: 32 pm-->
    <!--</div>-->
    <!--<div class="text-muted">-->
    <!--Aug 13-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="pipe">-->
    <!--<div class="bar trip" ngClass=""></div>-->
    <!--</div>-->
    <!--<div class="flex-column flex timeline-detail">-->
    <!--<div class="activity-dot"><div class="auto">S</div></div>-->
    <!--<div class="action-title">-->
    <!--Stopover expected-->
    <!--</div>-->
    <!--<div class="text-sm">-->
    <!--# 15554A94-2578-480D-8BDD-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  `,
  styles: [`
    .text-center {
      text-align: center;
    }
    .text-muted {
      color: #798E9B;
    }
    .text-right {
      text-align: right;
    }
    .text-left {
      text-align: left;
    }
    .text-1 {
      font-size: 2em;
    }
    .text-4 {
      font-size: 0.8em;
    }
    .text-capitalize {
      text-transform: capitalize;
    }
    .text-uppercase {
      text-transform: uppercase;
    }
    .text-ontime {
      color: #58ae5b;
    }
    .text-late {
      color: #E6413E;
    }
    .text-warning {
      color: #E6413E !important;
    }
    .text-red {
      color: #E6413E;
    }
    .text-blue {
      color: #5496F8;
    }
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .flex-row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
          -ms-flex-direction: row;
              flex-direction: row;
    }
    .flex-column {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }
    .column-gap-4 > :not(:last-child) {
      margin-bottom: 4px;
    }
    .row-gap-4 > :not(:last-child) {
      margin-right: 4px;
    }
    .column-gap-7 > :not(:last-child) {
      margin-bottom: 7px;
    }
    .row-gap-7 > :not(:last-child) {
      margin-right: 7px;
    }
    .column-gap-10 > :not(:last-child) {
      margin-bottom: 10px;
    }
    .row-gap-10 > :not(:last-child) {
      margin-right: 10px;
    }
    .column-gap-20 > :not(:last-child) {
      margin-bottom: 20px;
    }
    .row-gap-20 > :not(:last-child) {
      margin-right: 20px;
    }
    .wrap {
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
    }
    .flex {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
    }
    .auto {
      margin: auto;
    }
    .relative {
      position: relative;
    }
    .space-between {
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
    }
    .space-around {
      -ms-flex-pack: distribute;
          justify-content: space-around;
    }
    .justify-center {
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }
    .flex-center {
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
    .align-center {
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
    .clickable {
      cursor: pointer;
    }
    .round-icon {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 23px;
      height: 23px;
      background: #315790;
      border-radius: 50%;
    }
    .flex-half {
      -ms-flex-preferred-size: 50%;
          flex-basis: 50%;
    }
    .link-unstyled {
      color: inherit;
    }
    .link-unstyled:hover {
      text-decoration: none;
    }
    .half {
      width: 50%;
    }
    .noselect {
      -webkit-touch-callout: none;
      /* iOS Safari */
      -webkit-user-select: none;
      /* Chrome/Safari/Opera */
      /* Konqueror */
      -moz-user-select: none;
      /* Firefox */
      -ms-user-select: none;
      /* Internet Explorer/Edge */
      user-select: none;
      /* Non-prefixed version, currently
                                      not supported by any browser */
    }
    .hover-shadow:hover {
      -webkit-box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);
              box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.16);
    }
    .marker-transparent {
      opacity: 0.4;
    }
    .marker-fade {
      -webkit-filter: contrast(16%) brightness(160%) blur(0.6px);
              filter: contrast(16%) brightness(160%) blur(0.6px);
    }
    .tooltip-warning {
      background: #e04745;
      color: #fff;
    }
    .tooltip-warning-arrow {
      border-right-color: #e04745 !important;
    }
    .tooltip-info {
      background: #5496F8;
      color: #fff;
    }
    .tooltip-info-arrow {
      border-right-color: #5496F8 !important;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      color: inherit;
      text-decoration: none;
    }
    a:active {
      color: inherit;
      text-decoration: none;
    }
    a:focus {
      outline: none;
      color: inherit;
      text-decoration: none;
    }
    .card.clickable:hover {
      background: #edeff1;
    }
    .clickable-card {
      cursor: pointer;
      z-index: 1;
    }
    .clickable-card:hover {
      background: #fafafa;
    }
    .clickable-card:active {
      top: 1px;
    }
    .card-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      position: relative;
    }
    .card-container .card {
      margin-bottom: -1px;
    }
    .card-container .sub-status {
      font-size: 9px;
      margin-top: -16px;
      margin-bottom: 20px;
      text-align: center;
      color: #798E9B;
      text-transform: uppercase;
      padding-top: 3px;
    }
    .card-container .card-action {
      height: 30px;
      background: #5496F8;
      color: #fff;
      border: 1px solid #C9D6DE;
      position: relative;
      top: -3px;
      margin: 0 10px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      padding: 0 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      text-transform: uppercase;
    }
    .card-container .card-action:hover {
      background: #3c87f7;
      font-weight: 500;
    }
    [hidden] {
      display: none !important;
    }
    .card {
      color: #52616A;
      background: #fff;
      border: 0.4px solid #d5dfe5;
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
    .card .text-muted {
      font-size: 10px;
      font-weight: 300;
    }
    .card-content {
      padding-right: 10px;
      padding-left: 10px;
    }
    .card-content-top {
      padding-right: 10px;
      padding-left: 10px;
      padding-top: 10px;
    }
    .card-content-bottom {
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
    }
    .card-content-mid {
      padding-right: 10px;
      padding-left: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .card .border {
      padding-right: 10px;
      padding-left: 10px;
      border-top: 1px solid #C9D6DE;
    }
    .card-selected {
      -webkit-box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.18);
              box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.18);
      z-index: 1;
    }
    .card-quick-action {
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #C9D6DE;
      font-size: 0.8em;
      padding: 5px 9px;
      border-bottom-left-radius: 4px;
    }
    .card-quick-action .element {
      -webkit-transform: scale(0);
              transform: scale(0);
      width: 0;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    .card-quick-action:hover .element {
      width: 100%;
      -webkit-transform: scale(1);
              transform: scale(1);
    }
    .card-stack .card {
      border-bottom-width: 0;
    }
    .card-stack .card:last-child {
      border-bottom-width: 0.4px;
    }
    .card-stack .card:nth-child(odd) {
      background: #fbfbfb;
    }
    .spinner-wave {
      margin: 0 auto;
      width: 100px;
      height: 20px;
      text-align: center;
    }
    .spinner-wave > div {
      background-color: #5496F8;
      height: 100%;
      width: 6px;
      display: inline-block;
      -webkit-animation: wave 1.2s infinite ease-in-out;
      animation: wave 1.2s infinite ease-in-out;
    }
    .spinner-wave div:nth-child(2) {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    .spinner-wave div:nth-child(3) {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    .spinner-wave div:nth-child(4) {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    .spinner-wave div:nth-child(5) {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    @-webkit-keyframes wave {
      0%,
      40%,
      100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1);
      }
    }
    @keyframes wave {
      0%,
      40%,
      100% {
        -webkit-transform: scaleY(0.4);
                transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1);
                transform: scaleY(1);
      }
    }
    @media screen and (max-width: 480px) {
      .hide-xs {
        display: none !important;
      }
    }
    @media screen and (min-width: 480px) {
      .show-xs {
        display: none !important;
      }
    }
    .ht-btn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      padding: 4px 13px;
      border: 0;
      background: #ffffff;
      color: #52616A;
      -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
              box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    .ht-btn:focus {
      background: #fcfcfc;
      outline: 0;
    }
    .ht-btn-card:hover {
      background: #5496F8;
      color: rgba(255, 255, 255, 0.96);
      -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
              box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    .stopped-color {
      color: #FFBB44;
    }
    .drive-color {
      color: #5496F8;
    }
    .walk-color {
      color: #5496F8;
    }
    .moving-color {
      color: #5496F8;
    }
    .logged_off-color {
      color: #A9BAC4;
    }
    .network_offline-color {
      color: #d19191;
    }
    .location_disabled-color {
      color: #d19191;
    }
    .location_low_accuracy-color {
      color: #d19191;
    }
    .stopped-bg {
      background: #FFBB44;
    }
    .drive-bg {
      background: #5496F8;
    }
    .walk-bg {
      background: #5496F8;
    }
    .moving-bg {
      background: #5496F8;
    }
    .logged_off-bg {
      background: #A9BAC4;
    }
    .network_offline-bg {
      background: #d19191;
    }
    .location_disabled-bg {
      background-color: #d19191;
    }
    .location_low_accuracy-bg {
      background-color: #d19191;
    }
    :host {
      margin: 30px 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
    }
    .segment {
      border-radius: 4px;
      padding-right: 18px;
    }
    .active-segment {
      background: rgba(255, 255, 255, 0.75);
    }
    .trip-status {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      text-align: center;
      color: #52616A;
      margin-bottom: 20px;
      position: relative;
    }
    .trip-status .status-main {
      font-size: 31px;
      font-weight: 600;
    }
    .trip-status .status-sub {
      color: #798E9B;
      font-size: 12px;
    }
    .ht-breadcrumb {
      padding-bottom: 19px;
    }
    .card {
      margin-bottom: 9px;
    }
    .card .action-img {
      margin: 0 auto;
    }
    .card .content-right {
      -ms-flex-pack: distribute;
          justify-content: space-around;
      position: relative;
      text-align: center;
    }
    .driver-container {
      margin-bottom: 20px;
      border-bottom: 1px solid #C9D6DE;
      padding-bottom: 16px;
    }
    .driver-container .text-muted {
      color: #A9BAC4;
    }
    .task-status {
      padding-bottom: 20px;
      text-align: center;
      color: #52616A;
    }
    .time-container {
      width: 84px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      text-align: right;
      padding-right: 20px;
      padding-bottom: 16px;
      z-index: 5;
    }
    .time-container .target-status {
      font-size: 10px;
    }
    .time-container .timestamp {
      font-size: 14px;
      color: #52616A;
    }
    .time-container .text-muted {
      color: #A9BAC4;
      font-size: 12px;
    }
    .time-container .timestamp-text {
      font-size: 12px;
      color: #52616A;
      font-weight: 700;
    }
    .pipe {
      width: 20px;
      min-width: 20px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
    .pipe .bar {
      height: 100%;
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
    }
    .pipe .big {
      outline: 2px solid;
    }
    .pipe .solid {
      border-right: 3px solid #798E9B;
    }
    .pipe .line {
      border-right: 3px dotted #798E9B;
    }
    .pipe .line-border {
      border-right: 3px dotted #798E9B;
      outline: 0;
    }
    .pipe .light {
      border-right: 3px dashed rgba(121, 142, 155, 0.4);
    }
    .pipe .fade {
      border-right: 3px solid rgba(121, 142, 155, 0.14);
    }
    .timeline-detail {
      padding-bottom: 22px;
      position: relative;
      padding-left: 16px;
      min-height: 66px;
    }
    .timeline-detail .task-action {
      font-size: 16px;
      color: #52616A;
      text-transform: capitalize;
      margin-bottom: 4px;
      -webkit-transition: font-size 0.4s;
      transition: font-size 0.4s;
    }
    .timeline-detail .action-title {
      font-size: 16px;
      color: #52616A;
      text-transform: capitalize;
      -webkit-transition: font-size 0.4s;
      transition: font-size 0.4s;
      font-weight: 700;
    }
    .timeline-detail .task-detail {
      background: #fff;
      padding: 6px 10px;
      color: #52616A;
      -webkit-transition: font-size 0.4s;
      transition: font-size 0.4s;
    }
    .timeline-detail .task-icon {
      position: absolute;
      left: -23px;
      top: -2px;
    }
    .timeline-detail .task-ontime-status {
      color: #55ad58;
      padding-bottom: 4px;
      font-size: 11px;
      -webkit-transition: font-size 0.4s;
      transition: font-size 0.4s;
    }
    .timeline-detail .text-late {
      color: #E6413E;
    }
    .selected-task .task-action {
      font-size: 18px;
    }
    .selected-task .task-detail {
      font-size: 13px;
    }
    .selected-task .task-ontime-status {
      font-size: 13px;
    }
    .trip-event .pipe {
      padding-top: 7px;
    }
    .trip-event .time-container {
      padding-bottom: 24px;
    }
    .segment-dot {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: -1px;
      left: -23px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
    .a-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #798E9B;
      position: absolute;
      top: -8px;
      left: -16px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background-color: white;
    }
    .activity-dot {
      border: 1px solid #798E9B;
      font-size: 10px;
    }
    .activity-dot-ended {
      background: #798E9B;
      color: #fff;
    }
    .trip-dot {
      border: 0px solid #5496F8;
      background: #5496F8;
    }
    .trip-dot .pulse {
      background: #5496F8;
    }
    .stop-dot {
      border: 0px solid #5496F8;
      background: #5496F8;
    }
    .stop-dot .pulse {
      background: #5496F8;
    }
    .pulse {
      border-radius: 50%;
      height: 25px;
      width: 25px;
      -webkit-animation: pulse 3s ease-out;
              animation: pulse 3s ease-out;
      -webkit-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      position: absolute;
      z-index: 10;
      opacity: 1;
      margin: auto;
    }
    .trip {
      color: #5496F8;
      border-color: #5496F8 !important;
    }
    .stop {
      color: #FFBB44;
      border-color: #FFBB44 !important;
    }
    .no-info {
      color: #FFBB44;
      border-color: #A9BAC4 !important;
    }
    .ht-faded {
      opacity: 0.4;
    }
    .action {
      position: absolute;
      top: 6px;
      padding: 3px;
      font-size: 19px;
      color: #798E9B;
    }
    .action-left {
      left: 11px;
      font-size: 35px;
      color: #A9BAC4;
    }
    .action-left:hover {
      color: #798E9B;
    }
    .text-sm {
      font-size: 11px;
      color: #52616A;
      padding-bottom: 7px;
    }
    .title {
      font-size: 13px;
      font-weight: bold;
    }
    .activity-card {
      padding: 6px 10px;
      color: #52616A;
      -webkit-transition: font-size 0.4s;
      transition: font-size 0.4s;
      font-size: 13px;
      position: relative;
      cursor: pointer;
    }
    .activity-card-selected {
      background: #fff;
    }
    .activity-card-selected:hover {
      background: #fff;
    }
    .activity-card .close-card {
      position: absolute;
      top: -3px;
      right: -3px;
      color: #52616A;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
    .activity-card .close-card .fa {
      margin: auto;
    }
    .action-card {
      background: #fff;
      padding: 3px 11px;
      border: 1px solid #C9D6DE;
      font-size: 11px;
      cursor: pointer;
      color: #52616A;
      margin-left: -127px;
      padding-left: 134px;
      margin-top: -9px;
      min-height: 50px;
      -webkit-box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.07);
              box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.07);
    }
    .action-card:hover {
      border: 1px solid #798E9B;
    }
    .action-card-active {
      border: 1px solid #798E9B;
    }
    .trip-border {
      border-color: #5496F8 !important;
      outline-color: #5496F8 !important;
    }
    .stop-border {
      border-color: #FFBB44 !important;
      outline-color: #FFBB44 !important;
    }
    .no-info-border {
      border-color: #A9BAC4 !important;
      outline-color: #A9BAC4 !important;
    }
    .warning-border {
      border-color: #d19191 !important;
      outline-color: #d19191 !important;
    }
    .trip-bg {
      background: #5496F8;
    }
    .stop-bg {
      background: #FFBB44;
    }
    .no-info-bg {
      background: #A9BAC4;
    }
    .warning-bg {
      background: #d19191;
    }
    .trip-color {
      color: #5496F8;
    }
    .stop-color {
      color: #ffb025;
    }
    .no-info-color {
      color: #A9BAC4;
    }
    .warning-color {
      color: #d19191;
    }
    .table {
      margin: 7px 0;
      font-size: 11px;
    }
    .activity-stats {
      font-size: 12px;
      font-weight: bold;
    }
    .heatbeat {
      padding-left: 12px;
      font-size: 13px;
    }
  `]
})
export class PlacelineComponent implements OnInit {

  @Output() hoveredActivity = new EventEmitter();
  @Output() hoveredAction = new EventEmitter();
  @Output() selectedPartialSegment = new EventEmitter();
  @Input() userData: IUserData;
  @Input() selectedPartialSegmentId: string;
  selectedAction: string | null = null;
  selectedActivity: string | null = "";
  hardSelectedActivity: string | null = "";
  // icons = TaskCardIcon;
  actionMap = {};
  isMobile: boolean = false;
  constructor(private ref: ChangeDetectorRef) {

  }

  selectInUserData(segment, event?) {
    if(segment && (segment.type == 'trip' || segment.type == 'stop')) {
      this.hardSelectedActivity = segment.id;
      this.selectedPartialSegment.next({segments: [segment]})
    } else {
      this.hardSelectedActivity = "";
      this.selectedPartialSegment.next(null);
      if(event) event.stopPropagation()
    }
  }

  selectSegment(segment, toShow: boolean = true) {
    if(segment.actionText) {
      let actionId = toShow ? segment.action_id : null;
      this.selectAction(actionId)
    } else {
      let userId = toShow ? segment.id : null;
      this.selectActivity(userId)
    }
  }

  hoverActivity(activityId) {
    this.selectedActivity = activityId;
    this.ref.markForCheck()
  }

  selectActivity(activityId) {
    this.hoveredActivity.next(activityId);
    this.hoverActivity(activityId);
    // console.log(this.selectedActivity, "sele");
  }

  selectAction(actionId) {
    this.selectedAction = actionId;
    this.hoveredAction.next(actionId);
    this.ref.markForCheck()
  }

  get placelineMod() {
    let placeline = this.userData;
    if(this.userData.segments.length == 0) return [];
    let actions = placeline.actions;
    this.actionMap = {};
    let {currentActions, expActions} = this.currentExpActions(actions);
    let allEvents = this.userData.events;


    let {activitySegments} = _.reduce(this.userData.segments, (acc, segment: ISegment) => {
      let time = segment.started_at;
      let activityText = this.getActivityText(segment);
      let activityClass = this.getActivityClass(segment);
      let placeAddress = this.getActivityPlaceAddress(segment);
      let lastSeg = segment;
      let gapSegment = this.getGapSegment(segment, acc.lastSeg);
      // let lastSeg = _.last(acc.activitySegments);
      let currentActivitySegment = {...segment, time, events: [], ...this.getSegmentStyle(activityClass), activityText, placeAddress};
      let events = _.reject(acc.events, (event) => {

        if(this.isEventInSegment(segment, event)) {
          // event = {...event, ...this.getEventDisplay(event)};
          let eventDisplay = this.getEventDisplay(event);
          if(eventDisplay) currentActivitySegment.events.push({...event, ...eventDisplay});
          return true
        }
        return false
      });
      // console.log(gapSegment, "gap");
      let activitySegments =  [...acc.activitySegments, ...gapSegment, currentActivitySegment];
      // let activitySegments =  [...acc.activitySegments, currentActivitySegment];
      return {activitySegments, events, lastSeg};
    }, {activitySegments: [], events: allEvents, lastSeg: null});


    let lastSeg = this.lastSeg(placeline);
    // activitySegments.push(lastSeg);
    // return activitySegments


    let {actionSegments, actionEvents} = _.reduce([...activitySegments, lastSeg], (acc, segment, i, placelineM) => {
      activitySegments = acc.activitySegments;
      let lastSeg = segment;
      let activityClass = acc.lastSeg ? acc.lastSeg.activityClass : 'no-info';
      let actionSegments = acc.actionSegments;
      let actionEvents = _.reject(acc.actionEvents, (actionEvent) => {
        let actionMin = this.getMinute(actionEvent.actionTime);
        let segTime = this.getMinute(segment.time);
        if(actionMin == segTime && !segment.ended && !segment.actionText) {
          // if(actionEvent.actionTime == segment.time) {
          let actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
          segment = {...actionSegment, ...segment};
          return true
        } else if(actionEvent.actionTime <= segment.time) {
          // console.log("np match");
          let actionSegment = this.createActionSegment(actionEvent, activityClass, acc.lastSeg);
          actionSegments.push(actionSegment);
          return true
        } else {
        }
        return false
      });
      if(segment.ended && !segment.actionText) {
      } else if(segment.ended) {
        activitySegments.push({...segment, ended: false});
      } else {
        activitySegments.push(segment);
      }
      // activitySegments.push(segment);
      return {activitySegments, actionEvents, lastSeg, actionSegments}
    }, {activitySegments: [], actionEvents: currentActions, lastSeg: null, actionSegments: []});
    // activitySegments.pop();

    let unsortedCurrentSegment = [...activitySegments, ...actionSegments];
    let currentSegment = _.sortBy(unsortedCurrentSegment, (segment) => {
      return segment.time
    });
    let restActiviySegments = _.map(actionEvents, (actionEvent, i) => {
      lastSeg['activityBorder'] = 'no-info-border';
      lastSeg['activityText'] = 'No information';
      // let activityClass = i < actionEvents.length - 2 ? 'no-info' : 'line';
      return this.createActionSegment(actionEvent, 'no-info')
    });
    let expActionSegments = _.map(expActions, (actionEvent, i, expEvents) => {
      if(actionEvents.length == 0) {
        lastSeg['activityBorder'] = 'line-border';
      }
      let activityClass = i < expEvents.length - 2 ? 'line' : '';
      return this.createActionSegment(actionEvent, activityClass)
    });
    // console.log(actionSegments, expActionSegments, "ac");
    // console.log("last seeg", lastSeg);
    // console.log(activitySegments.length,actionSegments.length , expActionSegments.length);
    // console.log(this.userData.segments.length, this.userData.actions.length);
    return lastSeg['time'] ? [...currentSegment, lastSeg, ...restActiviySegments, ...expActionSegments] : [...currentSegment, ...expActionSegments]
  }

  private createActionSegment(actionEvent, activityClass = 'no-info', seg = {}) {
    let id = seg ? seg['id'] : '';
    return {...actionEvent, time: actionEvent.actionTime, ...this.getSegmentStyle(activityClass), ended: false, isLive: false, id};
  }

  private getSegmentStyle(activityClass = 'no-info') {
    return activityClass ? {activityBg: `${activityClass}-bg`, activityBorder: `${activityClass}-border`, activityClass, activityColor: `${activityClass}-color`} : {}
  }

  private isEventInSegment(segment, event): boolean {
    if(!!segment.ended_at && !!event.recorded_at) {
      let eventMin = this.getMinute(event.recorded_at);
      let segEndMin = this.getMinute(segment.ended_at);
      let segStartMin = this.getMinute(segment.started_at);
      return eventMin >= segStartMin && eventMin <= segEndMin;
    }
    return false;
  }

  private getMinute(time: string) {
    let timeStamp = new Date(time).getTime();
    return Math.round(timeStamp - timeStamp % 60000)
  }

  private currentExpActions(actions: IAction[]) {
    return _.reduce(actions, (acc, action: IAction) => {
      let expActions = [];
      this.actionMap = this.setActionMap(action);
      let assign = {
        actionText: `${NameCase(action.type)} assigned`,
        actionTime: action.assigned_at,
        actionD: NameCase(action.type[0]) + this.actionMap[action.id],
        action_id: action.id,
        actionLookupId: action.lookup_id,
        ...action
      };
      let currentActions = (assign.actionTime) ? [...acc.currentActions, assign] : acc.currentActions;
      if(action.display.ended_at) {
        let end = {
          actionText: `${NameCase(action.type)} ${action.status}`,
          actionTime: action.display.ended_at,
          actionD: NameCase(action.type[0]) + this.actionMap[action.id],
          actionEnd: true,
          action_id: action.id,
          action_distance: action.distance,
          action_duration: action.duration,
          actionEnded: true,
          actionLookupId: action.lookup_id,
          ...action
        };
        currentActions = [...currentActions, end];
      } else {
        let end = {
          actionText: `${NameCase(action.type)} scheduled`,
          actionTime: action.eta || null,
          actionD: NameCase(action.type[0]) + this.actionMap[action.id],
          actionEnd: true,
          action_id: action.id,
          action_distance: action.distance,
          action_duration: action.duration,
          actionLookupId: action.lookup_id,
          ...action
        };
        expActions.push(end)
      }

      return {currentActions, expActions}
    }, {currentActions: [], expActions: []});
  }

  // private getActionsSegments(segment: ISegment, actionsEvents, lastSeg) {
  //   let currentSegment = {};
  //   let start = segment.started_at;
  //   let lastStart = lastSeg ? lastSeg.started_at : null;
  //
  //   preSegment = _.filter(actionsEvents, (actionEvent) => {
  //     return lastStart ? (actionEvent.actionTime < start && actionEvent.actionTime > lastStart) : actionEvent.actionTime < start
  //   });
  //   postSegment = _.filter(actionsEvents, (actionEvent) => {
  //     return lastStart ? (actionEvent.actionTime > start && actionEvent.actionTime > lastStart) : actionEvent.actionTime < start
  //   });
  //   return {preSegment, postSegment, currentSegment}
  // }

  private lastSeg(placeline: IUserData) {
    let lastSeg: ISegment = _.last(placeline.segments);
    if(!lastSeg) return {};
    // let last = {time: lastSeg['last_heartbeat_at']};
    let pipeClass = "";
    let time;
    let isLive = false;
    if(lastSeg.ended_at) {
      time = lastSeg.ended_at
    } else {
      isLive = true;
      time = placeline.last_heartbeat_at
    }
    let activityClass = this.getActivityClass(lastSeg);
    return {time, pipeClass, lastSeg: true, isLive, ended: true, activityClass, activityBg: `${this.getActivityClass(lastSeg)}-bg`}
  }

  private getActivityClass(segment) {
    const type = segment.type;
    if (type === 'location_void') {
      return 'warning'
    }
    return type === 'stop' ? 'stop' : 'trip'
  }

  getPipeClass(status: string) {

    return status === 'stop' ? 'stop solid' : 'trip solid'
  }

  private getActivityText(segment: ISegment | any) {
    if(segment.activity) {
      return segment.activity
    } else if (segment.type === 'stop') {
      return 'Stop'
    } else if(segment.reason) {
      return this.getLocationVoidText(segment)
    } else {
      return NameCase(segment.type)
    }
  }

  private getActivityPlaceAddress(segment: ISegment) {
    if (segment.type === 'stop' && segment.place && segment.place.locality) {
      return segment.place.locality
    }
    return ""
  }

  private getLocationVoidText(segment) {
    switch (segment.reason) {
      case 'disabled':
        return "Location disabled";
      case 'no_permission':
        return "Location permission unavailable";
      case 'unknown':
        return "Location unavailable";
      default:
        return "Location unavailable"
    }
  }

  private getEventDisplay(event) {
    switch (event.type) {
      case 'tracking.started':
        return {
          text: 'Tracking started',
          subtext: ''
        };
      case 'tracking.ended':
        return {
          text: 'Tracking ended',
          subtext: ''
        };
      // case 'device.location.disabled':
      //   return {
      //     text: 'Location disabled',
      //     subtext: ''
      //   };
      // case 'device.location.enabled':
      //   return {
      //     text: 'Location enabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.disabled':
      //   return {
      //     text: 'Location permission disabled',
      //     subtext: ''
      //   };
      // case 'device.location_permission.enabled':
      //   return {
      //     text: 'Location permission enabled',
      //     subtext: ''
      //   };
      case 'device.secondary.ignored':
        return {
          text: 'Secondary device ignored',
          subtext: ''
        };
    }
  }

  private getGapSegment(segment, lastSeg) {
    let gaps = [];
    if(!lastSeg) return [];
    if(segment.started_at && lastSeg.ended_at) {
      let endMin = this.getMinute(segment.started_at);
      let startMin = this.getMinute(lastSeg.ended_at);
      let duration = (new Date(segment.started_at).getTime() -  new Date(lastSeg.ended_at).getTime()) / 1000
      if(endMin != startMin && startMin < endMin) {
        let gap = {...this.getSegmentStyle('no-info'), time: lastSeg.ended_at, activityText: 'No information', events: [], duration, id: "asd"};
        gaps.push(gap)
      }
    }
    return gaps
  }

  private setActionMap(action) {
    let actionMap = this.actionMap;
    let type = action.type;
    let id = action.id;
    let typeCount = this.actionMap[type];
    let actionShort = this.actionMap[id];
    if(typeCount) {
      if(!actionShort) {
        actionMap[type] = this.actionMap[type] + 1;
        actionMap[id] = '' + this.actionMap[type]
      }

    } else {
      actionMap[type] = 1;
      actionMap[id] = ''

    }
    // console.log(actionMap, "map");
    return {...actionMap}
  }

  indexId(index, item){
    return item.id
  }

  indexPlaceline(index, item) {
    return item.time || ""
  }

  log(a) {
    console.log(a)
  }

  ngOnInit() {
  }

}
