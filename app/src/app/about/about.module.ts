import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutMaterialModule } from './about-material.module';
import { SharedModule } from '../shared.module';

import { ProfileComponent } from './components/profile/profile.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ExperienceComponent } from './components/experience/experience.component';

@NgModule({
  declarations: [ProfileComponent, ResumeComponent, ExperienceComponent],
  imports: [AboutRoutingModule, AboutMaterialModule, SharedModule],
})
export class AboutModule {}
