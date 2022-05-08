import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './shared/components/archive/archive.component';
import { ArticleComponent } from './shared/components/article/article.component';
import { ErrorComponent } from './shared/components/error/error.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: ErrorComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'article/:id', component: ArticleComponent },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'pricing',
    loadChildren: () =>
      import('./pricing/pricing.module').then((m) => m.PricingModule),
  },
  {
    path: 'design',
    loadChildren: () =>
      import('./design/design.module').then((m) => m.DesignModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
