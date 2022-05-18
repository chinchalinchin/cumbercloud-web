import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [MatIconModule, MatListModule],
  exports: [MatIconModule, MatListModule],
})
export class BlogMaterialModule {}
