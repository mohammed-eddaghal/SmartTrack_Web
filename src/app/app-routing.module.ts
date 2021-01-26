import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { EtatComponent } from './etat/etat.component';
//import { DeauthGuard } from './guards/deauth.guard';
import { PositionComponent } from './position/position.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ReportComponent } from './report/report.component';
import { LiveComponent } from './position/live/live.component';
import { DeviceComponent } from './device/device.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { AlarmesComponent } from './notifications/alarmes/alarmes.component';


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
    path: "live/:deviceID",
    component: LiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "notifications/alarmes",
    component: AlarmesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "notifications/notifications",
    component: NotificationsComponent,
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
    path: "action/device",
    component: DeviceComponent,
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
