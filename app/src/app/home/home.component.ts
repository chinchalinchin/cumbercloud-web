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
import { HomeStates } from '../app.config';

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
      { top: '32%', left: '12.5%' },
      [{ top: '32%', left: '200%' }],
      'cloud_line_mobile_1',
      AnimationPeriods.short
    ),
    Animations.getManualPositionTrigger(
      { top: '60%', left: '7.5%' },
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

  public mobileMode() {
    return (
      this.screenSize == 'md' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'xs'
    );
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

  public getSrc(fromState: HomeStates | undefined = undefined): string {
    let switchState: string = fromState ? fromState : this.state;
    switch (switchState) {
      case this.states.one:
        return '/assets/imgs/circuitry-banner.jpg';
      case this.states.two:
        return '/assets/imgs/money-banner.jpg';
      case this.states.three:
        return '/assets/imgs/expertise-banner.jpg';
      case this.states.four:
        return '/assets/imgs/human_centric_design-banner.jpg';
      default:
        return '/assets/imgs/circuitry-banner.jpg';
    }
  }

  public getTitle(fromState: HomeStates | undefined = undefined): string {
    let switchState: string = fromState ? fromState : this.state;
    switch (switchState) {
      case this.states.one:
        return 'Web Design and Hosting';
      case this.states.two:
        return 'Cloud Cost Savings';
      case this.states.three:
        return 'Professional Solutions';
      case this.states.four:
        return 'Human Centric Design';
      default:
        return '';
    }
  }

  public getSubtitle(fromState: HomeStates | undefined = undefined): string {
    let switchState: string = fromState ? fromState : this.state;
    switch (switchState) {
      case this.states.one:
        return 'Responsive sites built on modern technology';
      case this.states.two:
        return 'Expert services at an affordable price';
      case this.states.three:
        return 'Years of web design and software experience';
      case this.states.four:
        return 'User driven development process';
      default:
        return '';
    }
  }

  public getBlurb(fromState: HomeStates | undefined = undefined): string {
    let switchState: string = fromState ? fromState : this.state;
    switch (switchState) {
      case this.states.one:
        return 'The <strong>Cumberland Cloud</strong> offers custom web page design and cloud-based hosting for small business owners looking to expand their online footprint without breaking the bank.';
      case this.states.two:
        return 'We specialize in using the latest in serverless cloud technology to architect cost-optimized web solutions that require litte-to-no overhead or recurring fees to maintain.';
      case this.states.three:
        return 'Our team has a rich professional background in web development, with experience on production-scale projects from the leading names in the industry.';
      case this.states.four:
        return 'Every website we produce is built with your users in mind. Each detail is crafted to streamline the user experience and improve conversion for your business.';
      default:
        return '';
    }
  }

  public getLine(fromState: HomeStates | undefined = undefined): string {
    let switchState: string = fromState ? fromState : this.state;
    switch (switchState) {
      case this.states.four:
        if (!this.mobileMode()) {
          if (this.moved) return 'User Experience';
          return 'Give me a page to land';
        }
        return '';
      case this.states.three:
        if (!this.mobileMode()) {
          if (this.moved) return 'Cloud Expertise';
          return 'And a button big enough';
        }
        return 'For the button by itself';
      case this.states.two:
        if (!this.mobileMode()) {
          if (this.moved) return 'Affordable Quality';
          return 'And I will move the world.';
        }
        return 'Incites the hand to push it';
      case this.states.one:
        if (!this.mobileMode()) {
          if (this.moved) return 'Custom Web Design';
          return '- <a href="https://www.cs.drexel.edu/~crorres/Archimedes/Lever/LeverQuotes_OLD.html" target="_blank" rel="noopener noreferrer">Archimedes, probably</a>';
        }
        return '- <a href="http://www.mlahanas.de/Greeks/Texts/Odyssey/Odyssey19.html" target="_blank" rel="noopener noreferrer">Homer, probably</a>';
      default:
        return '';
    }
  }

  public getHeidegger() {
    return 'The less we stare at the button-Thing, and the more we seize hold of it and use it, the more primordial does our relationship to it become, and the more unveiledly is it encountered as that which it is-as equipment … If we look at Things just ‘theoretically’, we can get along without understanding readiness-to-hand. But when we deal with them by using them and manipulating them, this activity is not a blind one; it has its own kind of sight, by which our manipulation is guided and from which it acquires its specific Thing character';
  }
}
