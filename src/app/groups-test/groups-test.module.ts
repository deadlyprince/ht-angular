import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsTestRoutingModule } from './groups-test-routing.module';
import { GroupsTestComponent } from './groups-test.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsTestRoutingModule
  ],
  declarations: [GroupsTestComponent]
})
export class GroupsTestModule { }
