import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecensionePageRoutingModule } from './recensione-routing.module';

import { RecensionePage } from './recensione.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecensionePageRoutingModule
  ],
  declarations: [RecensionePage]
})
export class RecensionePageModule {}
