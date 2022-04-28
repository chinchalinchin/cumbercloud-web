import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AnimationControl,
  Animations,
  AnimationTriggers,
  ExpandStates,
  HighlightStates,
} from 'src/animations';
import {
  Certification,
  CERTIFICATION_CONFIG,
  Experience,
  EXPERIENCE_CONFIG,
  ResumePopUpStates,
} from 'src/app/app.config';
import { MetaService } from 'src/services/meta.service';
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%'),
    Animations.getManualHighlightTrigger(1.25),
  ],
})
export class ResumeComponent {
  public screenSize: string = '';
  public selectedCertTab: number = 0;
  public selectedEducationTab: number = 0;
  public popupExpandCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  public popUpStates = ResumePopUpStates;
  public popUpState: ResumePopUpStates = ResumePopUpStates.null;
  public experience: Experience[] = EXPERIENCE_CONFIG;
  public certifications: Certification[] = CERTIFICATION_CONFIG;
  public factHighlightCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
  ];

  constructor(private meta: MetaService, public dialog: MatDialog) {
    this.meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
    this.popupExpandCntl.setState(ExpandStates.closed);
  }

  public indexFromState(state: ResumePopUpStates) {
    switch (state) {
      case this.popUpStates.one:
        return 0;
      case this.popUpStates.two:
        return 1;
      case this.popUpStates.three:
        return 2;
      case this.popUpStates.four:
        return 3;
      default:
        return 0;
    }
  }

  public stateArray() {
    return [
      this.popUpStates.one,
      this.popUpStates.two,
      this.popUpStates.three,
      this.popUpStates.four,
    ];
  }

  public mobileMode() {
    return (
      this.screenSize == 'md' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'xs'
    );
  }

  public expandPopUp(state: ResumePopUpStates): void {
    this.popUpState = state;
    this.popupExpandCntl.animate();
  }

  public closePopUp(): void {
    this.popUpState = ResumePopUpStates.null;
    this.popupExpandCntl.prime();
  }

  public isPopUpClosed(): boolean {
    return this.popupExpandCntl.state == ExpandStates.closed;
  }

  public getPopupTitle(): string {
    switch (this.popUpState) {
      case this.popUpStates.one:
        return 'Professional Experience';
      case this.popUpStates.two:
        return 'Technical Certifications';
      case this.popUpStates.three:
        return 'Academic Career';
      case this.popUpStates.four:
        return 'Project Gallery';
      default:
        return '';
    }
  }

  public isFactHighlighted(state: ResumePopUpStates) {
    return (
      this.factHighlightCntls[this.indexFromState(state)].state ==
      HighlightStates.highlight
    );
  }

  public highlightFact(state: ResumePopUpStates): void {
    this.factHighlightCntls[this.indexFromState(state)].animate();
  }

  public delightFact(state: ResumePopUpStates): void {
    this.factHighlightCntls[this.indexFromState(state)].prime();
  }

  public getFactMessage(state: ResumePopUpStates): string {
    if (
      this.factHighlightCntls[this.indexFromState(state)].state ==
      HighlightStates.normal
    ) {
      switch (state) {
        case this.popUpStates.one:
          return 'Experience';
        case this.popUpStates.two:
          return 'Certifications';
        case this.popUpStates.three:
          return 'Education';
        case this.popUpStates.four:
          return 'Portfolio';
        default:
          return '';
      }
    } else {
      switch (state) {
        case this.popUpStates.one:
          return 'Professional career';
        case this.popUpStates.two:
          return 'Industry recognized accolades';
        case this.popUpStates.three:
          return 'Diverse technical background';
        case this.popUpStates.four:
          return 'Websites, applications & projects';
        default:
          return '';
      }
    }
  }

  public openExperience(exp: Experience) {
    this.dialog.open(ExperienceComponent, {
      data: exp,
      width: '85%',
      height: '95%',
      panelClass: 'experience-bg',
    });
  }

  public incrementCertTab() {
    this.selectedCertTab++;
    if (this.selectedCertTab > this.certifications.length - 1) {
      this.selectedCertTab = 0;
    }
  }

  public decrementCertTab() {
    this.selectedCertTab--;
    if (this.selectedCertTab < 0) {
      this.selectedCertTab = this.certifications.length - 1;
    }
  }

  public incrementEdTab() {
    this.selectedEducationTab++;
    if (this.selectedEducationTab > 1) {
      this.selectedEducationTab = 0;
    }
  }

  public decrementEdTab() {
    this.selectedEducationTab--;
    if (this.selectedEducationTab < 0) {
      this.selectedEducationTab = 1;
    }
  }
}
