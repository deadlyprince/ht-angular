import {Component, Input, OnInit} from '@angular/core';
import {IGroup} from "ht-models";

@Component({
  selector: 'ht-groups',
  template: `
    <div class="card-stack">
      <a [routerLink]="['/groups', group.id]" class="card" *ngFor="let group of groups">
        <div class="card-content-mid">
          {{group.name}}
        </div>
      </a>
    </div>
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
    .card-stack {
      max-width: 500px;
      margin: auto;
    }
  `]
})
export class GroupsComponent implements OnInit {
  @Input() groups: IGroup[];
  constructor() { }

  ngOnInit() {
  }

}
