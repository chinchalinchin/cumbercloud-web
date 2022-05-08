import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatDividerModule, MatIconModule, MatTooltipModule],
  exports: [MatDividerModule, MatIconModule, MatTooltipModule],
})
export class SharedMaterialModule {}
