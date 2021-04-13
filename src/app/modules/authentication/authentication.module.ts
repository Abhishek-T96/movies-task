import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';

const authenticationRoutes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  }
]

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationModule { }
