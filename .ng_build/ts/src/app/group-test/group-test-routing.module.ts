import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupTestComponent} from "./group-test.component";

const routes: Routes = [
  {path: "", component: GroupTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupTestRoutingModule { }
