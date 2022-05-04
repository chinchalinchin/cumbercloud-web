import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  AnimationControl,
  AnimationPeriods,
  Animations,
  AnimationTriggers,
  FadeStates,
} from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { HomeConfig, HomeStates, HOME_CONFIG, ImgConfig } from '../app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    Animations.getManualPositionTrigger(
      { top: '40%', left: '48.5%' },
      [{ top: '0%', left: '45%' }],
      'center',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '40%', left: '45%' },
      [{ top: '0%', left: '45%' }],
      'center_mobile',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '100%', left: '0%', right: '0%', bottom: '0%' },
      [{ top: '10%', left: '0%', right: '0%', bottom: '0%' }],
      'selector',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '0%', left: '48%' },
      [
        { top: '20%', left: '72.5%' },
        { top: '20%', left: '87.5%' },
      ],
      'cloud_btn_1',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '0%', left: '48%' },
      [
        { top: '40%', left: '72.5%' },
        { top: '40%', left: '87.5%' },
      ],
      'cloud_btn_2',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '0%', left: '48%' },
      [
        { top: '60%', left: '72.5%' },
        { top: '60%', left: '87.5%' },
      ],
      'cloud_btn_3',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '0%', left: '48%' },
      [
        { top: '80%', left: '72.5%' },
        { top: '80%', left: '87.5%' },
      ],
      'cloud_btn_4',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '35%', left: '5%' },
      [{ top: '81%', left: '77.5%', right: '0%' }],
      'cloud_line_desktop_1',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '55%', left: '8.5%' },
      [{ top: '61%', left: '77.5%', right: '0%' }],
      'cloud_line_desktop_2',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '35%', right: '4%' },
      [{ top: '41%', left: '77.5%', right: '0%' }],
      'cloud_line_desktop_3',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '55%', right: '12%' },
      [{ top: '21%', left: '77.5%', right: '0%' }],
      'cloud_line_desktop_4',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '32%', left: '7.5%', right: '7.5%' },
      [{ top: '32%', left: '200%' }],
      'cloud_line_mobile_1',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '60%', left: '5%', right: '5%' },
      [{ top: '60%', left: '-100%' }],
      'cloud_line_mobile_2',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '68%', right: '5%' },
      [{ top: '68%', left: '-100%' }],
      'cloud_line_mobile_3',
      AnimationPeriods.short
    ),
    Animations.getManualFadeTrigger(null, AnimationPeriods.short),
    Animations.getSlideTrigger(false, '', AnimationPeriods.short),
    Animations.getSlideTrigger(true, 'reverse', AnimationPeriods.short),
    Animations.getScaleTrigger(1),
  ],
})
export class HomeComponent implements OnInit {
  public pressable: boolean = false;
  public animating: boolean = false;
  public selecting: boolean = false;
  public moved: boolean = false;
  public animated: boolean = false;
  public screenSize: string = '';
  public states = HomeStates;
  public state = HomeStates.one;
  public homeConfig: HomeConfig[] = HOME_CONFIG;
  public centerFadeCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_fade
  );
  public selectionFadeCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_fade
  );
  public cloudFadeCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_fade
  );
  public centerPositionCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_position
  );
  public selectionPositionCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_position
  );
  public cloudBtnPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public cloudLineDesktopPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public cloudLineMobilePositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];

  public constructor(
    private _meta: MetaService,
    private _ga: GoogleAnalyticsService
  ) {
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
  }

  ngOnInit(): void {
    this.cloudFadeCntl.setState(FadeStates.out);
    setTimeout(() => {
      this.pressable = true;
    }, AnimationPeriods.short * 1000);
  }

  private getConfigFromState(
    fromState: HomeStates | undefined = undefined
  ): HomeConfig {
    let filterState: string = fromState ? fromState : this.state;
    let conf = this.homeConfig
      .filter((conf) => conf.state === filterState)
      .pop();
    if (conf) return conf;
    return this.homeConfig[0];
  }

  public mobileMode() {
    return (
      this.screenSize === 'md' ||
      this.screenSize === 'sm' ||
      this.screenSize === 'xs'
    );
  }

  public landscapeMode() {
    return this.screenSize === 'lg';
  }

  public display() {
    this.animating = true;
    this.centerPositionCntl.animatePosition(0);
    this.selectionPositionCntl.animatePosition(0);

    if (this.mobileMode()) {
      this.cloudLineMobilePositionCntls.forEach((cntl: AnimationControl) => {
        cntl.animatePosition(0);
      });
    } else {
      this.cloudLineDesktopPositionCntls.forEach((cntl: AnimationControl) => {
        cntl.animatePosition(0);
      });
    }

    setTimeout(() => {
      this.moved = true;
    }, AnimationPeriods.short * 500);

    setTimeout(() => {
      this.centerFadeCntl.animate();
      this.cloudFadeCntl.prime();

      setTimeout(() => {
        this.cloudBtnPositionCntls.forEach((cntl: AnimationControl) => {
          if (!this.mobileMode()) {
            cntl.animatePosition(0);
          } else {
            cntl.animatePosition(1);
          }
        });

        setTimeout(() => {
          this.animated = true;
        }, AnimationPeriods.short * 1000);
      }, AnimationPeriods.short * 500);
    }, AnimationPeriods.short * 500);
  }

  public setState(state: HomeStates) {
    this.selectionFadeCntl.animate();
    this.selecting = true;
    setTimeout(() => {
      this.state = state;
      this.selecting = false;
      this.selectionFadeCntl.prime();
    }, AnimationPeriods.short * 1000);
    this._ga.event('home', 'state', state.toString());
  }

  public selected(state: HomeStates) {
    return this.state == state;
  }

  public getImgConfig(fromState: HomeStates | undefined = undefined): ImgConfig {
    return this.getConfigFromState(fromState).img;
  }

  public getTitle(fromState: HomeStates | undefined = undefined): string {
    return this.getConfigFromState(fromState).title;
  }

  public getSubtitle(fromState: HomeStates | undefined = undefined): string {
    return this.getConfigFromState(fromState).subtitle;
  }

  public getBlurb(fromState: HomeStates | undefined = undefined): string {
    return this.getConfigFromState(fromState).blurb;
  }

  public getLine(fromState: HomeStates | undefined = undefined): string {
    let conf = this.getConfigFromState(fromState);
    if (this.mobileMode()) return conf.line.mobile;
    else if (this.moved) return conf.line.desktop.moved;
    else return conf.line.desktop.unmoved;
  }

  public getHeidegger() {
    return 'The less we stare at the button-Thing, and the more we seize hold of it and use it, the more primordial does our relationship to it become, and the more unveiledly is it encountered as that which it is-as equipment … If we look at Things just ‘theoretically’, we can get along without understanding readiness-to-hand. But when we deal with them by using them and manipulating them, this activity is not a blind one; it has its own kind of sight, by which our manipulation is guided and from which it acquires its specific Thing character';
  }
}
