import { Component, OnInit } from '@angular/core';
import {QueryLabel} from "ht-client"
import {Color} from "ht-utility";
import {HtUsersService} from "../ht/ht-users.service";
import {HtClientService} from "../ht/ht-client.service";
@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "1373d1e5-4435-4168-90cb-1d7d8ead7d4b";
  constructor(
    private userService: HtUsersService,
    private clientService: HtClientService
  ) { }

  ngOnInit() {


  }


}

