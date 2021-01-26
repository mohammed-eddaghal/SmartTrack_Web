import { PagerService } from './services/pager.service';
import { AuthGuard } from './guards/auth.guard';
import { DeauthGuard } from './guards/deauth.guard';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AdminService } from './services/admin.service';
import { SubUserService } from './services/subuser.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryReportComponent } from './report/summary-report/summary-report.component';
import { SpeedReportComponent } from './report/speed-report/speed-report.component';
import { CustomtimeformatterPipe } from 'src/pipes/customtimeformatter.pipe';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LiveComponent } from './position/live/live.component';
import {DecimalPipe} from '@angular/common';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { DeviceComponent } from './device/device.component';
import { SpeedPercentReportComponent } from './report/speed-percent-report/speed-percent-report.component';
import { TemperatureReportComponent } from './report/temperature-report/temperature-report.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AlarmesComponent } from './notifications/alarmes/alarmes.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
// import { registerLocaleData } from '@angular/common';
// import localeFr from '@angular/common/locales/fr';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgbAlertModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

// registerLocaleData(localeFr, 'fr');

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
    SummaryReportComponent,
    SpeedReportComponent,
    CustomtimeformatterPipe,
    MapComponent,
    LiveComponent,
    DeviceComponent,
    SpeedPercentReportComponent,
    TemperatureReportComponent,
    MaintenanceComponent,
    AlarmesComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    LeafletModule,
    LeafletModule.forRoot(),
    LeafletModule,
    LeafletMarkerClusterModule,
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
    DatePipe,
    DecimalPipe
    // { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
