import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicesPage } from './indices.page';

const routes: Routes = [
  {
    path: '',
    component: IndicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicesPageRoutingModule {}
