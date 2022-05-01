import { NgModule } from '@angular/core';

import { DesignRoutingModule } from './design-routing.module';
import { DesignMaterialModule } from './design-material.module';
import { SharedModule } from '../shared/shared.module';

import { DesignComponent } from './components/design/design.component';

@NgModule({
  declarations: [DesignComponent],
  imports: [DesignRoutingModule, DesignMaterialModule, SharedModule],
})
export class DesignModule {}
