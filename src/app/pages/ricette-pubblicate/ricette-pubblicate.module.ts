import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RicettePubblicatePageRoutingModule } from './ricette-pubblicate-routing.module';

import { RicettePubblicatePage } from './ricette-pubblicate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RicettePubblicatePageRoutingModule
  ],
  declarations: [RicettePubblicatePage]
})
export class RicettePubblicatePageModule {}
