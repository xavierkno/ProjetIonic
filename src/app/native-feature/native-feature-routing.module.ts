import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NativeFeaturePage } from './native-feature.page';

const routes: Routes = [
  {
    path: '',
    component: NativeFeaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NativeFeaturePageRoutingModule {}
