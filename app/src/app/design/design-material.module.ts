import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
  ],
})
export class DesignMaterialModule {}
