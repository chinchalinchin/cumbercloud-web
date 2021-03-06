import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArchiveComponent } from './components/archive/archive.component';
import { ArticleComponent } from './components/article/article.component';
import { BlogMaterialModule } from './blog-material.module';

@NgModule({
  declarations: [ArchiveComponent, ArticleComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    BlogMaterialModule,
    SharedModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          headerIds: true,
        },
      },
    }),
  ],
})
export class BlogModule {}
