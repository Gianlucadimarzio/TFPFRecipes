import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RicercaRicetteCategoriaPageRoutingModule } from './ricerca-ricette-categoria-routing.module';

import { RicercaRicetteCategoriaPage } from './ricerca-ricette-categoria.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RicercaRicetteCategoriaPageRoutingModule
  ],
  declarations: [RicercaRicetteCategoriaPage]
})
export class RicercaRicetteCategoriaPageModule {}
