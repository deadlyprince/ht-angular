import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: "./test/test.module#TestModule"},
  { path: 'groups', loadChildren: "./groups-test/groups-test.module#GroupsTestModule"},
  { path: 'groups', loadChildren: "./group-test/group-test.module#GroupTestModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
