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
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MetaService } from 'src/services/meta.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
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
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _meta: MetaService
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
    if (this._meta.isBrowser()) {
      this._matIconRegistry.addSvgIcon(
        name,
        this._domSanitizer.bypassSecurityTrustResourceUrl(resourceUrl)
      );
    } else {
      this._matIconRegistry.addSvgIconLiteral(
        name,
        this._domSanitizer.bypassSecurityTrustHtml('<svg></svg>')
      );
    }
  }
}
