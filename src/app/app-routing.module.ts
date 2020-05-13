import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'generation',
    loadChildren: () => import('./generation/generation.module').then( m => m.GenerationPageModule)
  },
  {
    path: 'indices',
    loadChildren: () => import('./indices/indices.module').then( m => m.IndicesPageModule)
  },
  {
    path: 'test-menu',
    loadChildren: () => import('./test-menu/test-menu.module').then( m => m.TestMenuPageModule)
  },
  {
    path: 'creation',
    loadChildren: () => import('./creation/creation.module').then( m => m.CreationPageModule)
  },
  {
    path: 'jouer',
    loadChildren: () => import('./jouer/jouer.module').then( m => m.JouerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
