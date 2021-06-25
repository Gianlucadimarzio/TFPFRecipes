import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRicettaPage } from './add-ricetta.page';

const routes: Routes = [
  {
    path: '',
    component: AddRicettaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRicettaPageRoutingModule {}
