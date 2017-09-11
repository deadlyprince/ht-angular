import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupTestRoutingModule } from './group-test-routing.module';
import { GroupTestComponent } from './group-test.component';
import {UsersMapContainerModule} from "../users-map-container/users-map-container.module";

@NgModule({
  imports: [
    CommonModule,
    GroupTestRoutingModule,
    UsersMapContainerModule
  ],
  declarations: [GroupTestComponent]
})
export class GroupTestModule { }
