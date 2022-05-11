import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  AnimationControl,
  Animations,
  AnimationTriggers,
  BinaryState,
} from 'src/animations';
import {
  CertificationConfig,
  CERTIFICATION_CONFIG,
  ExperienceConfig,
  EXPERIENCE_CONFIG,
  ProfileConfig,
  PROFILE_CONFIG,
  ResumePopUpStates,
} from 'src/app/app.config';
import { MetaService } from 'src/services/meta.service';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [
    Animations.getManualDilateTrigger('60%', '80%'),
    Animations.getManualHighlightTrigger(1.25),
  ],
})
export class ResumeComponent {
  public selectedProfile?: ProfileConfig;
  public profileConfig: ProfileConfig[] = PROFILE_CONFIG;
  public screenSize: string = '';
  public selectedCertTab: number = 0;
  public selectedEducationTab: number = 0;
  public popupDilateCntl = new AnimationControl(AnimationTriggers.cntl_dilate);
  public popUpStates = ResumePopUpStates;
  public popUpState: ResumePopUpStates = ResumePopUpStates.null;
  public experience: ExperienceConfig[] = EXPERIENCE_CONFIG;
  public certifications: CertificationConfig[] = CERTIFICATION_CONFIG;
  public factHighlightCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
  ];

  constructor(
    private _meta: MetaService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _ga: GoogleAnalyticsService
  ) {
    this.selectedProfile = this.profileConfig
      .filter(
        (profile) => profile.key === this._route.snapshot.paramMap.get('name')
      )
      .pop();
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
    this.popupDilateCntl.setState(BinaryState.off);
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
    this.popupDilateCntl.animate();
    this._ga.event('resume', 'popup', state.toString());
  }

  public closePopUp(): void {
    this.popUpState = ResumePopUpStates.null;
    this.popupDilateCntl.prime();
  }

  public isPopUpClosed(): boolean {
    return !this.popupDilateCntl.fired();
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
      BinaryState.on
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
      BinaryState.off
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

  public openExperience(exp: ExperienceConfig) {
    this._dialog.open(ExperienceComponent, {
      data: exp,
      width: '85%',
      height: '95%',
      panelClass: 'experience-bg',
      ariaLabel: exp.aria_label,
    });
    this._ga.event('resume', 'experience', exp.company);
  }

  public incrementCertTab() {
    this.selectedCertTab++;
    if (this.selectedCertTab > this.certifications.length - 1) {
      this.selectedCertTab = 0;
    }
    this._ga.event('resume', 'certification', this.selectedCertTab.toString());
  }

  public decrementCertTab() {
    this.selectedCertTab--;
    if (this.selectedCertTab < 0) {
      this.selectedCertTab = this.certifications.length - 1;
    }
    this._ga.event('resume', 'certification', this.selectedCertTab.toString());
  }

  public incrementEdTab() {
    this.selectedEducationTab++;
    if (this.selectedEducationTab > 2) {
      this.selectedEducationTab = 0;
    }
    this._ga.event('resume', 'education', this.selectedEducationTab.toString());
  }

  public decrementEdTab() {
    this.selectedEducationTab--;
    if (this.selectedEducationTab < 0) {
      this.selectedEducationTab = 1;
    }
    this._ga.event('resume', 'education', this.selectedEducationTab.toString());
  }
}
