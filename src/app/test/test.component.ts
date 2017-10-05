import { Component, OnInit } from '@angular/core';
import {HtClientService, HtUsersClientService} from "ht-angular-client";
import {QueryLabel} from "ht-js-client"
import {Color} from "ht-js-utils";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "9eab3039-9e46-4048-ae29-ba068de325c7";
  constructor(
    private userService: HtUsersClientService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {


  }


}

