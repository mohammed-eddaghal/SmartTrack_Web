import { DeauthGuard } from './guards/deauth.guard';
import { PositionComponent } from './position/position.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:"",component:LoginComponent,canActivate:[DeauthGuard]},
  {path:"position",component:PositionComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
