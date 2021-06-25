import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecensionePage } from './recensione.page';

const routes: Routes = [
  {
    path: '',
    component: RecensionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecensionePageRoutingModule {}
