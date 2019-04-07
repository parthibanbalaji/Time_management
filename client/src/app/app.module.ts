import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//added
import { JwtModule } from '@auth0/angular-jwt';

//components
import { LoginComponent }     from './login-c/login.component';
import { LogoutComponent }     from './logout-c/logout.component';

//services
import {AuthService} from './general-services/auth.service';
import {AuthGuardLogin} from './general-services/auth-guard.service'


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }

    })

  ],
  providers: [
    AuthService,
    AuthGuardLogin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
