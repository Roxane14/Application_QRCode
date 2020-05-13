import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JouerPageRoutingModule } from './jouer-routing.module';

import { JouerPage } from './jouer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JouerPageRoutingModule
  ],
  declarations: [JouerPage]
})
export class JouerPageModule {}
