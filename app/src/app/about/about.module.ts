import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutMaterialModule } from './about-material.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './components/profile/profile.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { DesignComponent } from './components/design/design.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ResumeComponent,
    ExperienceComponent,
    DesignComponent,
  ],
  imports: [AboutRoutingModule, AboutMaterialModule, SharedModule],
})
export class AboutModule {}
