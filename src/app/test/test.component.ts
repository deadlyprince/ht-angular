import { Component, OnInit } from '@angular/core';
import {HtUsersClientService} from "ht-angular-client";

@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "d3a6ac4f-bb9a-46ec-9cba-5af77d0c6d0e";

  constructor(
    private userService: HtUsersClientService
  ) { }

  ngOnInit() {

  }

}
