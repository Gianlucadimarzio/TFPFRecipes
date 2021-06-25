import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRecensionePage } from './add-recensione.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecensionePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecensionePageRoutingModule {}
