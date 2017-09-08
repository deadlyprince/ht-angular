import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  userId = "14b9d62e-27b3-4485-94dd-687900bb48de";

  constructor() { }

  ngOnInit() {
  }

}
