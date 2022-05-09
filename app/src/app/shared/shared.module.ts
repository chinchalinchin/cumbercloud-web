import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SharedMaterialModule } from './shared-material.module';
import { SafePipe } from './pipes/sanitize.pipe';

@NgModule({
  declarations: [ErrorComponent, SheetComponent, SafePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SafePipe,
  ],
})
export class SharedModule {}
