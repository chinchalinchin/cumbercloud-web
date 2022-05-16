import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignComponent } from './components/design/design.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [
  { path: 'design', component: DesignComponent },
  { path: ':name', component: ProfileComponent },
  { path: 'resume/:name', component: ResumeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
