import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { ChipConfig, TOOL_CHIPS } from '../app.config';

enum Phases{
  none="none", splash="splash", design="design", develop="develop", deploy="deploy", deliver="deliver"
}
enum Splash{
  untouched="untouched", touched="touched"
}

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [ './design.component.css' ],
  animations: [
    Animations.getScaleTrigger(1),
    Animations.getManualFadeTrigger(),
  ]
})
export class DesignComponent implements OnInit{
  public phases: any = Phases;
  public phase: Phases = Phases.none;
  public splashes: any = Splash;
  public splash: Splash = Splash.untouched;
  public screenSize: string = '';
  public tools: ChipConfig[] = TOOL_CHIPS;
  public phaseIcons : any[] = [
    ['xd', 'gimp', 'drawio'],
    ['typescript', 'python', 'angular', 'django'],
    ['docker', 'cloudfront', 's3', 'lambda', 'apigateway']
  ]
  public splashLines1FadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade)
  ];
  public splashLines2FadeCntl: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade),
    new AnimationControl(AnimationTriggers.cntl_fade)
  ];
  public splashSrcFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade)

  constructor(private meta: MetaService,
              public dialog: MatDialog) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    })
    this.splashLines1FadeCntl.forEach((cntl:AnimationControl)=>{
      cntl.setState(FadeStates.out);
    })
    this.splashLines2FadeCntl.forEach((cntl:AnimationControl)=>{
      cntl.setState(FadeStates.out);
    })
   }

  ngOnInit(){
    this.splashLines1FadeCntl.forEach((cntl: AnimationControl, ind: number)=>{
      setTimeout(()=>{
        cntl.prime();
        if(ind===this.splashLines1FadeCntl.length - 1){
          setTimeout(()=>{
            this.phase = Phases.splash;
          }, AnimationPeriods.medium*1000);
        }
      }, AnimationPeriods.medium*1000*ind);
    })
  }

  public mobileMode(): boolean{
    return this.screenSize == 'xs' || this.screenSize == 'sm' || this.screenSize == 'md';
  }

  public isChipDisabled(chipIcon: string): boolean{
    switch(this.phase){
      case Phases.design:
        return !this.phaseIcons[0].includes(chipIcon);
      case Phases.develop:
        return !this.phaseIcons[1].includes(chipIcon);
      case Phases.deploy:
        return !this.phaseIcons[2].includes(chipIcon);
      case Phases.deliver:
        return false;
      default:
        return true;
    }
  }

  public phasedIn(phase: Phases, strict: boolean = false): boolean{
    switch(this.phase){
      case Phases.none:
        return phase === Phases.none;
      case Phases.splash:
        if(strict) return phase === Phases.splash;
        return [Phases.splash, Phases.none].includes(phase);
      case Phases.design:
        return phase === Phases.design;
      case Phases.develop:
        if(strict) return phase === Phases.develop;
        return [Phases.design, Phases.develop].includes(phase);
      case Phases.deploy:
        if(strict) return phase === Phases.deploy;
        return [Phases.design, Phases.develop, Phases.deploy].includes(phase);
      case Phases.deliver:
        if(strict) return phase === Phases.deliver;
        return [Phases.design, Phases.develop, Phases.deploy, Phases.deliver].includes(phase);
      default:
        return false
    }
  }

  public increment(): void{
    switch(this.phase){
      case Phases.none:
        this.phase = Phases.splash;
        break;
      case Phases.splash:
        this.phase = Phases.design;
        break;
      case Phases.design:
        this.phase = Phases.develop;
        break;
      case Phases.develop:
        this.phase = Phases.deploy;
        break;
      case Phases.deploy:
        this.phase = Phases.deliver
        break;
    }
  }

  public decrement(): void{
    switch(this.phase){
      case Phases.splash:
        this.phase = Phases.none;
        break;
      case Phases.design:
        this.phase = Phases.splash;
        break;
      case Phases.develop:
        this.phase = Phases.design;
        break;
      case Phases.deploy:
        this.phase = Phases.develop;
        break;
      case Phases.deliver:
        this.phase = Phases.deploy;
        break;
    }
  }

  public touchSplash(): void{ 
    if(this.splash === Splash.untouched){
      this.splashSrcFadeCntl.animate();
      setTimeout(()=>{
        this.splash = Splash.touched; 
        setTimeout(()=>{
          this.splashSrcFadeCntl.prime();
        }, AnimationPeriods.medium*500)
        setTimeout(()=>{
          this.splashLines2FadeCntl.forEach((cntl: AnimationControl, ind: number)=>{
            setTimeout(()=>{
              cntl.prime();
            }, AnimationPeriods.medium*1500*ind);
          })
        }, AnimationPeriods.medium*1500)
      }, AnimationPeriods.medium*1000)
    }
  }

  public splashSrc(): string{
    switch(this.splash){
      case Splash.untouched:
        return "/assets/imgs/separated.jpg";
      case Splash.touched:
        return "/assets/graphics/cloud_design-01.png";
      default:
        return "/assets/imgs/separated.jpg";
    }
  }
}
