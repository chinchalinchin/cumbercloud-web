import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactMaterialModule } from './contact-material.module';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { SentComponent } from './components/sent/sent.component';

@NgModule({
  declarations: [ContactComponent, SentComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ContactMaterialModule,
    SharedModule,
  ],
})
export class ContactModule {}
