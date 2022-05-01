import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { SheetComponent } from './sheet/sheet.component';
import { ResumeComponent } from './about/components/resume/resume.component';
import { ExperienceComponent } from './about/components/experience/experience.component';
import { RateComponent } from './pricing/rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MetaService } from 'src/services/meta.service';
import { ASSET_CONFIG, IconConfig, ICON_CONFIG } from './app.config';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    ContactComponent,
    DesignComponent,
    SheetComponent,
    ExperienceComponent,
    RateComponent,
  ],
  imports: [
    ServerModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private meta: MetaService
  ) {
    ICON_CONFIG.forEach((conf: IconConfig) => {
      this.addIconToRegistry(conf.name, conf.src);
    });
  }

  public addIconToRegistry(name: string, resourceUrl: string) {
    if (this.meta.isBrowser()) {
      this.matIconRegistry.addSvgIcon(
        name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(resourceUrl)
      );
    } else {
      this.matIconRegistry.addSvgIconLiteral(
        name,
        this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>')
      );
    }
  }
}
