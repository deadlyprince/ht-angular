import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
// const missingUrl = require("../../../images/missing.png");

@Component({
  selector: 'ht-profile',
  template: `
    <div [style.height.px]="height" [style.width.px]="height" class="profile-img" [ngStyle]="{ 'background-image': 'url(' + (url || defaultUrl) + ')'}">

    </div>
  `,
  styles: [`
    :host .profile-img {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      border-radius: 50%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Input() url: string;
  @Input() height: number = 30;
  defaultUrl: string = "";
  constructor() {

  }

  ngOnInit() {
    // this.url = this.url || "images/missing.png"

  }

}
