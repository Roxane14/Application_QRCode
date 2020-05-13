import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerationPageRoutingModule } from './generation-routing.module';

import { GenerationPage } from './generation.page';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerationPageRoutingModule, 
    QRCodeModule
  ],
  declarations: [GenerationPage]
})
export class GenerationPageModule {}
