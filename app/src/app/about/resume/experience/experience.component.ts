import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Experience } from 'src/app/app.config';
import { MetaService } from 'src/services/meta.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  public screenSize: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Experience,
    private meta: MetaService
  ) {
    this.meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
  }

  public mobileMode(): boolean {
    return (
      this.screenSize == 'xs' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'md'
    );
  }
}
