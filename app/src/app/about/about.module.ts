import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutMaterialModule } from './about-material.module';

import { ProfileComponent } from './components/profile/profile.component';
import { ResumeComponent } from './components/resume/resume.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [ProfileComponent, ResumeComponent],
  imports: [AboutRoutingModule, AboutMaterialModule, SharedModule],
})
export class AboutModule {}
