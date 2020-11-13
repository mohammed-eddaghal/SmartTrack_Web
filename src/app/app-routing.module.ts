import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { EtatComponent } from './etat/etat.component';
//import { DeauthGuard } from './guards/deauth.guard';
import { PositionComponent } from './position/position.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"etat",component:EtatComponent
  //,canActivate:[AuthGuard]
  },
  {path:"position",component:PositionComponent
  //,canActivate:[AuthGuard]
  },
  {path:"dashboard",component:DashboardComponent
  //,canActivate:[AuthGuard]
},
{path:"action/utilisateurs",component:UtilisateursComponent
  //,canActivate:[AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
