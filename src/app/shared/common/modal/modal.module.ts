import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { ModalHeaderTemplate, ModalBodyTemplate } from './modal.directives';


const COMPONENTS = [ ModalComponent ];
const DIRECTIVES = [ ModalHeaderTemplate, ModalBodyTemplate ];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class ModalModule { }
