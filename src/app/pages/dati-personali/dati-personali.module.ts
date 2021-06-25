import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatiPersonaliPageRoutingModule } from './dati-personali-routing.module';

import { DatiPersonaliPage } from './dati-personali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatiPersonaliPageRoutingModule
  ],
  declarations: [DatiPersonaliPage]
})
export class DatiPersonaliPageModule {}
