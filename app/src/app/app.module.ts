import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  DomSanitizer,
  HammerModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { HammerConfig } from 'src/hammer';
import { MatIconRegistry } from '@angular/material/icon';
import {
  ASSET_CONFIG,
  ICON_CONFIG,
  IconConfig,
  AssetConfig,
} from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { SheetComponent } from './sheet/sheet.component';
import { ExperienceComponent } from './about/components/experience/experience.component';
import { MetaService } from 'src/services/meta.service';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    DesignComponent,
    SheetComponent,
    ExperienceComponent,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HammerModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private meta: MetaService
  ) {
    ICON_CONFIG.forEach((conf: IconConfig) => {
      this.addIconToRegistry(conf.name, conf.src);
    });
    ASSET_CONFIG.forEach((conf: AssetConfig) => {
      let img = new Image();
      img.src = conf.src;
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
