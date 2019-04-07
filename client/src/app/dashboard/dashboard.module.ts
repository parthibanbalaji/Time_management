import { NgModule }           from '@angular/core';
import { DashboardComponent }     from './dashboard-c/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ DashboardComponent ],
  providers:    [  ]
})
export class DashboardModule { }
