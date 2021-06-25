import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRicettaPageRoutingModule } from './add-ricetta-routing.module';

import { AddRicettaPage } from './add-ricetta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRicettaPageRoutingModule
  ],
  declarations: [AddRicettaPage]
})
export class AddRicettaPageModule {}
