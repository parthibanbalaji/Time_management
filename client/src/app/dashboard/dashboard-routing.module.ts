import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { DashboardComponent }     from "./dashboard-c/dashboard.component"


const routes: Routes = [
  { path: '',
    component: DashboardComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/