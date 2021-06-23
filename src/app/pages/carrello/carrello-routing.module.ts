import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrelloPage } from './carrello.page';

const routes: Routes = [
  {
    path: '',
    component: CarrelloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrelloPageRoutingModule {}
