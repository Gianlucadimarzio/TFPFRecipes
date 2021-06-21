import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RicercaRicettePage } from './ricerca-ricette.page';

const routes: Routes = [
  {
    path: '',
    component: RicercaRicettePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RicercaRicettePageRoutingModule {}
