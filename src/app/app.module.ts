import { AuthGuard } from './guards/auth.guard';
import { DeauthGuard } from './guards/deauth.guard';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
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
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { NgbAlertModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PositionComponent,
    NavbarComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHVQYBlEDRUG-832fnRV9mzMcavXR84Kg',
    })
  ],
  providers: [
    UserService,
    DataService,
    AdminService,
    AuthService,
    AuthGuard,
    DeauthGuard,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
