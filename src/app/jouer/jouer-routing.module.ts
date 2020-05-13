import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JouerPage } from './jouer.page';

const routes: Routes = [
  {
    path: '',
    component: JouerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JouerPageRoutingModule {}
