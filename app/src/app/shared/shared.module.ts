import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SharedMaterialModule } from './shared-material.module';
import { TrayComponent } from './components/tray/tray.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    ErrorComponent, 
    SheetComponent, 
    TrayComponent, 
    ArchiveComponent, 
    ArticleComponent
  ],
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
    TrayComponent,
  ],
})
export class SharedModule {}
