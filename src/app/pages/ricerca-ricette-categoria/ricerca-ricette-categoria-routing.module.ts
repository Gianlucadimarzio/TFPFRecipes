import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RicercaRicetteCategoriaPage } from './ricerca-ricette-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: RicercaRicetteCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RicercaRicetteCategoriaPageRoutingModule {}
