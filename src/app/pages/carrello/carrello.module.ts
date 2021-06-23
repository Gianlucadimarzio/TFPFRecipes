import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrelloPageRoutingModule } from './carrello-routing.module';

import { CarrelloPage } from './carrello.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrelloPageRoutingModule
  ],
  declarations: [CarrelloPage]
})
export class CarrelloPageModule {}
