import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {path:"home", loadChildren:() => import('src/app/pages/home/home.module').then(res => res.HomePageModule)},
      {path:"recipes", loadChildren:() => import('src/app/pages/ricerca-ricette/ricerca-ricette.module').then(res => res.RicercaRicettePageModule)},
      {path:"addRicetta", loadChildren:() => import('src/app/pages/add-ricetta/add-ricetta.module').then(res => res.AddRicettaPageModule)},
      {path:"profile", loadChildren:() => import('src/app/pages/profile/profile.module').then(res => res.ProfilePageModule)},
    ]
  },
  {
    path:'',
    redirectTo: "tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
