import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule, 
    MatIconModule, 
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule, 
    MatIconModule, 
    MatTooltipModule
  ],
})
export class SharedMaterialModule {}
