import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RicettarioPage } from './ricettario.page';

const routes: Routes = [
  {
    path: '',
    component: RicettarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RicettarioPageRoutingModule {}
