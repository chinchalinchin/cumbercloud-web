import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { SheetComponent } from './sheet/sheet.component';
import { ExperienceComponent } from './about/components/experience/experience.component';
import { MetaService } from 'src/services/meta.service';
import { IconConfig, ICON_CONFIG } from './app.config';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    DesignComponent,
    SheetComponent,
    ExperienceComponent,
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
