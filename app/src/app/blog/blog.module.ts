import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArticleComponent } from './components/article/article.component';


@NgModule({
  declarations: [
    ArchiveComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          headerIds: true,
        },
      }
    })
  ]
})
export class BlogModule { }
