import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'design', component: DesignComponent },
  { path: '404', component: ErrorComponent },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
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
