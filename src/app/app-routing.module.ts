import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { PositionComponent } from './position/position.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SysadminGuard } from './guards/sysadmin.guard';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ReportComponent } from './report/report.component';
import { LiveComponent } from './position/live/live.component';
import { DeviceComponent } from './device/device.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { AlarmesComponent } from './notifications/alarmes/alarmes.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './accounts/account/account.component';
import { DeviceStateComponent } from './device-state/device-state.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "state",
    component: DeviceStateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "position",
    component: PositionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "live/:deviceID/:vehicleModel",
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
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "action/accounts",
    component: AccountComponent,
    canActivate: [AuthGuard, SysadminGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
