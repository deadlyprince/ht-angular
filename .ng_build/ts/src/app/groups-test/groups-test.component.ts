import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-groups-test',
  template: `
    <ht-groups-container></ht-groups-container>
  `,
  styles: [`
    :host {
      margin: auto;
      max-width: 500px;
    }
  `]
})
export class GroupsTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
