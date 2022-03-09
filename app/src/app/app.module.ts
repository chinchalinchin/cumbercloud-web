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
import { MatRadioModule } from '@angular/material/radio';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule,

    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
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
    this.matIconRegistry.addSvgIcon('apigateway', 
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-apigateway.svg'))
    this.matIconRegistry.addSvgIcon('angular', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/angular.svg'));
    this.matIconRegistry.addSvgIcon('cognito', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-cognito.svg'));
    this.matIconRegistry.addSvgIcon('cloudfront', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-cloudfront.svg'));
    this.matIconRegistry.addSvgIcon('drawio',
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/flow-chart.svg'));
    this.matIconRegistry.addSvgIcon('dynamodb', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-dynamodb.svg'));
    this.matIconRegistry.addSvgIcon('docker',
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/docker-round.svg'));
    this.matIconRegistry.addSvgIcon('django',
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/django.svg'));
    this.matIconRegistry.addSvgIcon('github', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/github.svg'));
    this.matIconRegistry.addSvgIcon('gimp', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gimp-color.svg'));
    this.matIconRegistry.addSvgIcon('html', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/html5.svg'));
    this.matIconRegistry.addSvgIcon('lambda', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-lambda.svg'));
    this.matIconRegistry.addSvgIcon('pypi', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pypi.svg'));
    this.matIconRegistry.addSvgIcon('python', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/python.svg'));
    this.matIconRegistry.addSvgIcon('rds', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-rds.svg'));
    this.matIconRegistry.addSvgIcon('s3', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/aws-s3.svg'));
    this.matIconRegistry.addSvgIcon('typescript', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/typescript.svg'));
    this.matIconRegistry.addSvgIcon('xd', 
                                      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/adobe-xd.svg'));
  }
}
