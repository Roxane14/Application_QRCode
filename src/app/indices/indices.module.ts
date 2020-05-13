import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndicesPageRoutingModule } from './indices-routing.module';

import { IndicesPage } from './indices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndicesPageRoutingModule
  ],
  declarations: [IndicesPage]
})
export class IndicesPageModule {}
