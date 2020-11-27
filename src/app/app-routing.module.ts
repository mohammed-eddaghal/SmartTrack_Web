import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { EtatComponent } from './etat/etat.component';
//import { DeauthGuard } from './guards/deauth.guard';
import { PositionComponent } from './position/position.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChauffeurComponent} from './chauffeur/chauffeur.component';
import { ReportComponent } from './report/report.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "state",
    component: EtatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "position",
    component: PositionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "action/users",
    component: UtilisateursComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "action/chauffeur",
    component: ChauffeurComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "action/maintenance",
    component: MaintenanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "report",
    component: ReportComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
