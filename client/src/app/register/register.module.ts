import { NgModule }           from '@angular/core';
import { RegisterComponent }     from './register-c/register.component';
import { RegisterService }       from './services/register.service';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common'

@NgModule({
  imports: [
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [ RegisterComponent ],
  providers:    [ RegisterService ]
})
export class RegisterModule { }
