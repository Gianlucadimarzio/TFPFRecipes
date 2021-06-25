import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/load/load.module').then( m => m.LoadPageModule)
  },

  {
    path: '',
    redirectTo: 'pages/load',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ricetta/:xyz',
    loadChildren: () => import('./pages/ricetta/ricetta.module').then( m => m.RicettaPageModule)
  },
  {
    path: 'carrello',
    loadChildren: () => import('./pages/carrello/carrello.module').then( m => m.CarrelloPageModule)
  },
  {
    path: 'recensione',
    loadChildren: () => import('./pages/recensione/recensione.module').then( m => m.RecensionePageModule)
  },  {
    path: 'add-ricetta',
    loadChildren: () => import('./pages/add-ricetta/add-ricetta.module').then( m => m.AddRicettaPageModule)
  },
  {
    path: 'add-recensione/:xyz',
    loadChildren: () => import('./pages/add-recensione/add-recensione.module').then( m => m.AddRecensionePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
