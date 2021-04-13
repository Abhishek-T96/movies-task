import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '@app/guards/auth.guard';
import { ModalModule } from '@Movies-common/common';

import { AppContainerComponent } from './app-container.component';


const appContainerRoutes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    canActivate: [ AuthGuard ]
  }
]

@NgModule({
  declarations: [AppContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appContainerRoutes),
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [RouterModule]
})
export class AppContainerModule { }
