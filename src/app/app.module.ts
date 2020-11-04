import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { IsAdminService } from './services/is-admin.service';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PositionComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,
              DataService,
              IsAdminService,
              AuthService,
              AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
