import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NativeFeaturePageRoutingModule } from './native-feature-routing.module';

import { NativeFeaturePage } from './native-feature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NativeFeaturePageRoutingModule
  ],
  declarations: [NativeFeaturePage]
})
export class NativeFeaturePageModule {}
