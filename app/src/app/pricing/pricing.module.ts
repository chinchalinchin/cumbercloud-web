import { NgModule } from '@angular/core';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingMaterialModule } from './pricing-material.module';
import { SharedModule } from '../shared.module';
import { PricingComponent } from './components/pricing/pricing.component';
import { RateComponent } from './components/rate/rate.component';


@NgModule({
  declarations: [
    PricingComponent,
    RateComponent
  ],
  imports: [
    SharedModule,
    PricingRoutingModule,
    PricingMaterialModule
  ]
})
export class PricingModule { }
