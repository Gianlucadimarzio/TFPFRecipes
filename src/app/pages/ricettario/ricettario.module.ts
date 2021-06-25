import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RicettarioPageRoutingModule } from './ricettario-routing.module';

import { RicettarioPage } from './ricettario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RicettarioPageRoutingModule
  ],
  declarations: [RicettarioPage]
})
export class RicettarioPageModule {}
