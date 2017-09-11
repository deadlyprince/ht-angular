import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupTestRoutingModule } from './group-test-routing.module';
import { GroupTestComponent } from './group-test.component';

@NgModule({
  imports: [
    CommonModule,
    GroupTestRoutingModule
  ],
  declarations: [GroupTestComponent]
})
export class GroupTestModule { }
