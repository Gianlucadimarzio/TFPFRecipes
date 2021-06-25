import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecensionePageRoutingModule } from './add-recensione-routing.module';

import { AddRecensionePage } from './add-recensione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecensionePageRoutingModule
  ],
  declarations: [AddRecensionePage]
})
export class AddRecensionePageModule {}
