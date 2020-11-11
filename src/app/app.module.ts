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
import { FormsModule } from '@angular/forms';
import { PositionComponent } from './position/position.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
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
    HttpClientModule,
    NgbModule,


  ],
  providers: [
    UserService,
    DataService,
    AdminService,
    AuthService,
    AuthGuard,
    DeauthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
