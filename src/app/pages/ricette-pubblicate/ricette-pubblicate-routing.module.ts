import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RicettePubblicatePage } from './ricette-pubblicate.page';

const routes: Routes = [
  {
    path: '',
    component: RicettePubblicatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RicettePubblicatePageRoutingModule {}
