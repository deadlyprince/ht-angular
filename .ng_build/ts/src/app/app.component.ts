import { Component } from '@angular/core';
import {HtUsersClient} from "ht-js-client";
import {HtMapService, HtUsersClientService} from "ht-angular-client";
import {IUserData} from "ht-models";

@Component({
  selector: 'ht-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`

  `]
})
export class AppComponent {

  constructor() {

  }


}
