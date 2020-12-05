import { PagerService } from './services/pager.service';
import { AuthGuard } from './guards/auth.guard';
import { DeauthGuard } from './guards/deauth.guard';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AdminService } from './services/admin.service';
import { SubUserService } from './services/subuser.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionComponent } from './position/position.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { EtatComponent } from './etat/etat.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ReportComponent } from './report/report.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SummaryReportComponent } from './report/summary-report/summary-report.component';
import { SpeedReportComponent } from './report/speed-report/speed-report.component';
import { CustomtimeformatterPipe } from 'src/pipes/customtimeformatter.pipe';
import {DatePipe} from '@angular/common';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbAlertModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PositionComponent,
    NavbarComponent,
    DashboardComponent,
    EtatComponent,
    UtilisateursComponent,
    ChauffeurComponent,
    ReportComponent,
    MaintenanceComponent,
    SummaryReportComponent,
    SpeedReportComponent,
    CustomtimeformatterPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHVQYBlEDRUG-832fnRV9mzMcavXR84Kg',
    })
  ],
  providers: [
    SubUserService,
    DataService,
    AdminService,
    AuthService,
    AuthGuard,
    DeauthGuard,
    GoogleMapsAPIWrapper,
    PagerService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
