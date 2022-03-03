import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// TODO: material module
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatChipsModule } from '@angular/material/chips'; 
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'; 
import { MatListModule } from '@angular/material/list'; 
import { MatRippleModule } from '@angular/material/core';  
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

// TODO: lazy loaded components 
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { DesignComponent } from './design/design.component';
import { TeamComponent } from './team/team.component';
import { SheetComponent } from './sheet/sheet.component';
import { GrantComponent } from './team/members/grant/grant.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    ContactComponent,
    DesignComponent,
    TeamComponent,
    SheetComponent,
    GrantComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private matIconRegistry: MatIconRegistry, 
              private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon('github', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/github.svg'));
    this.matIconRegistry.addSvgIcon('pypi', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pypi.svg'))
  }
}
