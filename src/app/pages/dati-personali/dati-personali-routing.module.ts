import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatiPersonaliPage } from './dati-personali.page';

const routes: Routes = [
  {
    path: '',
    component: DatiPersonaliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatiPersonaliPageRoutingModule {}
