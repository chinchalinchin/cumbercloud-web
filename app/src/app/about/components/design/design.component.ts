import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  AnimationControl,
  AnimationPeriods,
  Animations,
  AnimationTriggers,
  SwipeStates,
} from 'src/animations';
import { ImgConfig } from 'src/properties';
import { MetaService } from 'src/services/meta.service';
import {
  ChipConfig,
  GalleryConfig,
  GALLERY_CONFIG,
  DESIGN_CONFIG,
  StateImgConfig,
  SVG_CONFIG,
  TOOL_CHIPS,
} from '../../../app.config';

enum Phases {
  none = 'none',
  splash = 'splash',
  design = 'design',
  develop = 'develop',
  deploy = 'deploy',
  deliver = 'deliver',
  done = 'done',
}
enum Splash {
  untouched = 'untouched',
  touched = 'touched',
}

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [
    './css/design.component.css',
    './css/design.component.desktop.css',
    './css/design.component.mobile.css',
  ],
  animations: [
    Animations.getScaleTrigger(1),
    Animations.getManualScaleTrigger(1.15),
    Animations.getManualScaleTrigger(1.1, 'slow', AnimationPeriods.medium),
    Animations.getManualFadeTrigger(),
    Animations.getEnlargeTrigger('5%'),
    Animations.getEnlargeTrigger('17%', 'large'),
    Animations.getEnlargeTrigger('100%', 'full'),
    Animations.getExpandTrigger('100%', 'full'),
    Animations.getExpandTrigger('50%', 'half'),
    Animations.getExpandTrigger('25%', 'quarter'),
    Animations.getEnlargeTrigger('70%', 'underline'),
    Animations.getManualFullSwipeTrigger(),
  ],
})
export class DesignComponent implements OnInit {
  @ViewChildren(MatRipple) ripples?: QueryList<MatRipple>;

  public phases: any = Phases;
  public phase: Phases = Phases.none;
  public splashes: any = Splash;
  public splash: Splash = Splash.untouched;
  public oscillating: boolean = false;
  public oscillations: number = 0;
  public lured: boolean = false;
  public screenSize: string = '';
  public toolConfig: ChipConfig[] = TOOL_CHIPS;
  public svgConfig: any = SVG_CONFIG;
  public splashConfig: StateImgConfig[] = DESIGN_CONFIG;
  public galleryConfig: GalleryConfig[] = GALLERY_CONFIG;
  public galleryIndex: number = 0;
  public selectedGalleryConfig = this.galleryConfig[this.galleryIndex];
  public swipeStates: any = SwipeStates;
  public phaseIcons: any[] = [
    ['xd', 'inkscape', 'gimp', 'drawio'],
    ['typescript', 'python', 'angular', 'django'],
    ['docker', 'cloudfront', 's3', 'lambda', 'apigateway'],
  ];
  public splashLines1FadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public splashLines2FadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public designLinesFadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public developLinesFadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public deployLinesFadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public deliverLinesFadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public doneLinesFadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
  ];
  public splashSrcFadeCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_fade
  );
  public splashSrcDetonateCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_scale
  );
  public lureScaleCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_scale
  );
  public gallerySwipeCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_swipe
  );

  constructor(private _meta: MetaService, private _ga: GoogleAnalyticsService) {
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
    this.splashLines1FadeCntl
      .concat(this.splashLines2FadeCntl)
      .concat(this.designLinesFadeCntl)
      .concat(this.developLinesFadeCntl)
      .concat(this.deployLinesFadeCntl)
      .concat(this.deliverLinesFadeCntl)
      .forEach((cntl: AnimationControl) => {
        cntl.animate();
      });
  }

  ngOnInit() {
    this.splashLines1FadeCntl.forEach((cntl: AnimationControl, ind: number) => {
      setTimeout(() => {
        cntl.prime();
        if (ind === this.splashLines1FadeCntl.length - 1) {
          setTimeout(() => {
            this.phase = Phases.splash;
            setTimeout(() => {
              this.oscillateLure();
              this.oscillating = true;
            }, AnimationPeriods.medium * 1000);
          }, AnimationPeriods.medium * 1000);
        }
      }, AnimationPeriods.medium * 1000 * ind);
    });
  }

  public mobileMode(): boolean {
    return (
      this.screenSize == 'xs' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'md'
    );
  }

  public isChipDisabled(chipIcon: string): boolean {
    switch (this.phase) {
      case Phases.design:
        return !this.phaseIcons[0].includes(chipIcon);
      case Phases.develop:
        return !this.phaseIcons[1].includes(chipIcon);
      case Phases.deploy:
        return !this.phaseIcons[2].includes(chipIcon);
      case Phases.deliver:
        return false;
      case Phases.done:
        return false;
      default:
        return true;
    }
  }

  public lureOscillated() {
    return this.lureScaleCntl.fired();
  }

  public oscillateLure() {
    if (!this.lureScaleCntl.fired()) {
      this.oscillations++;
      this.lureScaleCntl.animate();
    } else {
      this.lureScaleCntl.prime();
    }
    if (this.oscillations > 3) {
      this.lure();
    } else if (!this.lured) {
      setTimeout(() => {
        this.oscillateLure();
      }, AnimationPeriods.medium * 1000);
    }
  }

  public phasedIn(phase: Phases, strict: boolean = false): boolean {
    switch (this.phase) {
      case Phases.none:
        return phase === Phases.none;
      case Phases.splash:
        if (strict) return phase === Phases.splash;
        return [Phases.splash, Phases.none].includes(phase);
      case Phases.design:
        return phase === Phases.design;
      case Phases.develop:
        if (strict) return phase === Phases.develop;
        return [Phases.design, Phases.develop].includes(phase);
      case Phases.deploy:
        return phase === Phases.deploy;
      case Phases.deliver:
        if (strict) return phase === Phases.deliver;
        return [Phases.deploy, Phases.deliver].includes(phase);
      case Phases.done:
        return phase === Phases.done;
      default:
        return false;
    }
  }

  public incrementPhase(): void {
    switch (this.phase) {
      case Phases.none:
        this.phase = Phases.splash;
        this._ga.event('design_phase_next_splash');
        break;
      case Phases.splash:
        this.phase = Phases.design;
        this._ga.event('design_phase_next_design');
        setTimeout(() => {
          this.designLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
          setTimeout(() => {
            this.flashRipple(true);
          }, this.designLinesFadeCntl.length * 1500);
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.design:
        this.designLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.develop;
        this._ga.event('design_phase_next_develop');
        setTimeout(() => {
          this.developLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
          setTimeout(() => {
            this.flashRipple(true);
          }, this.developLinesFadeCntl.length * 1500);
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.develop:
        this.developLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this._ga.event('design_phase_next_deploy');
        this.phase = Phases.deploy;
        setTimeout(() => {
          this.deployLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
          setTimeout(() => {
            this.flashRipple(true);
          }, this.deployLinesFadeCntl.length * 1500);
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.deploy:
        this.deployLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.deliver;
        this._ga.event('design_phase_next_deliver');
        setTimeout(() => {
          this.deliverLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
          setTimeout(() => {
            this.flashRipple(true);
          }, this.deliverLinesFadeCntl.length * 1500);
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.deliver:
        this.deliverLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.done;
        this._ga.event('design_phase_next_done');
        break;
    }
  }

  public decrementPhase(): void {
    switch (this.phase) {
      case Phases.splash:
        this.phase = Phases.none;
        this._ga.event('design_phase_previous_none');
        break;
      case Phases.design:
        this.phase = Phases.splash;
        this._ga.event('design_phase_previous_splash');
        break;
      case Phases.develop:
        this.developLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.design;
        this._ga.event('design_phase_previous_design');
        setTimeout(() => {
          this.designLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.deploy:
        this.deployLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.develop;
        this._ga.event('design_phase_previous_develop');
        setTimeout(() => {
          this.developLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.deliver:
        this.deliverLinesFadeCntl.forEach((cntl: AnimationControl) => {
          cntl.animate();
        });
        this.phase = Phases.deploy;
        this._ga.event('design_phase_previous_deploy');
        setTimeout(() => {
          this.deployLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
        }, AnimationPeriods.medium * 1000);
        break;
      case Phases.done:
        this.phase = Phases.deliver;
        this._ga.event('design_phase_previous_deliver');
        setTimeout(() => {
          this.deliverLinesFadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * 1500 * ind);
            }
          );
        }, AnimationPeriods.medium * 1000);
        break;
    }
  }

  public touchSplash(): void {
    if (this.splash === Splash.untouched && this.lured) {
      this.splashSrcFadeCntl.animate();
      this._ga.event('design_splash_touch');
      setTimeout(() => {
        this.splash = Splash.touched;
        setTimeout(() => {
          this.splashSrcFadeCntl.prime();
        }, AnimationPeriods.medium * 500);
        setTimeout(() => {
          this.splashLines2FadeCntl.forEach(
            (cntl: AnimationControl, ind: number) => {
              let inc: number;
              if (ind === 0) {
                inc = 750;
              } else {
                inc = 1250;
              }
              setTimeout(() => {
                cntl.prime();
              }, AnimationPeriods.medium * inc * ind);
            }
          );
          setTimeout(() => {
            this.flashRipple(true);
          }, (this.splashLines2FadeCntl.length - 1) * 1250 + 500);
        }, AnimationPeriods.medium * 1000);
      }, AnimationPeriods.medium * 1000);
    }
  }

  public flashRipple(forward: boolean): void {
    if (this._meta.isBrowser() && this.ripples) {
      if (forward && this.ripples.first) {
        const rippleRef = this.ripples.last.launch({
          persistent: true,
          centered: true,
        });
        setTimeout(() => {
          rippleRef.fadeOut();
        }, AnimationPeriods.short * 1000);
      } else if (this.ripples.first) {
        const rippleRef = this.ripples.first.launch({
          persistent: true,
          centered: true,
        });
        setTimeout(() => {
          rippleRef.fadeOut();
        }, AnimationPeriods.short * 1000);
      }
    }
  }

  public splashImgConfig(): ImgConfig {
    let conf = this.splashConfig
      .filter((conf) => conf.state === this.splash.toString())
      .pop();
    if (conf) return conf.img;
    else return this.splashConfig[0].img;
  }

  public lure(): void {
    this.oscillating = false;
    this.lured = true;
    this.touchSplash();
  }

  public incrementGallery(): void {
    this.galleryIndex++;
    if (this.galleryIndex === this.galleryConfig.length) {
      this.galleryIndex = 0;
    }
    this.gallerySwipeCntl.swipe(this.swipeStates.swipe_left);
    setTimeout(() => {
      this.selectedGalleryConfig = this.galleryConfig[this.galleryIndex];
    }, AnimationPeriods.medium * 500);
    setTimeout(() => {
      this.gallerySwipeCntl.prime();
    }, AnimationPeriods.medium * 1000);
  }

  public decrementGallery(): void {
    this.galleryIndex--;
    if (this.galleryIndex === -1) {
      this.galleryIndex = this.galleryConfig.length - 1;
    }
    this.gallerySwipeCntl.swipe(this.swipeStates.swipe_right);
    setTimeout(() => {
      this.selectedGalleryConfig = this.galleryConfig[this.galleryIndex];
    }, AnimationPeriods.medium * 500);
    setTimeout(() => {
      this.gallerySwipeCntl.prime();
    }, AnimationPeriods.medium * 1000);
  }

  public currentGalleryConfig(): GalleryConfig {
    return this.galleryConfig[this.galleryIndex];
  }
}
