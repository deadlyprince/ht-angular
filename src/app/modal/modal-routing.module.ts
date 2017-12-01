import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModalComponent} from "./modal.component";

const routes: Routes = [
  { path: "test", component: ModalComponent, outlet: 'modal', children: [
    {path : "", loadChildren: "../login/login.module#LoginModule"},
    {path : "", loadChildren: "../account-users-switcher/account-users-switcher.module#AccountUsersSwitcherModule"},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
