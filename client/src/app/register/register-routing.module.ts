import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { RegisterComponent }     from './register-c/register.component';


const routes: Routes = [
  { path: '',
    component: RegisterComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/