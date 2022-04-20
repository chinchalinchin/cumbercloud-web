import { Component } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers } from 'src/animations';
import { MetaService } from 'src/services/meta.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    Animations.getManualScaleTrigger(1.25, 'banner'),
    Animations.getManualScaleTrigger(0.5, 'text'),
    Animations.getManualPositionTrigger({ top: '40%', left: '7.5%'},
                                        [{ top: '57.5%', left: '7.5%' },
                                         { top: '40%', left: '7.5%'}], 
                                        'who_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', left: '7.5%'},
                                        [{ top: '68.75%', left: '7.5%' },
                                         { top: '40%', left: '7.5%'}], 
                                        'who_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', left: '7.5%'},
                                        [{ top: '80%', left: '7.5%' },
                                         { top: '40%', left: '7.5%'}], 
                                        'who_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '7.5%'},
                                        [{ top: '57.5%', right: '7.5%' },
                                         { top: '40%', right: '7.5%'}], 
                                        'what_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '7.5%'},
                                        [{ top: '68.75%', right: '7.5%' },
                                         { top: '40%', right: '7.5%'}], 
                                        'what_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '7.5%'},
                                        [{ top: '80%', right: '7.5%' },
                                         { top: '40%', right: '7.5%'}], 
                                        'what_3', AnimationPeriods.short),
  ]
})
export class AboutComponent {

  public screenSize: string = '';
  public whoBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whoTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whoLinePositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public whatBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatLinePositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public who: boolean = false;
  public what: boolean = false

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    });
  }

  private toggleBanner(which: string): void {
    if(which==='who') { this.who = !this.who; }
    else if (which === 'what') { this.what = !this.what; }
  }

  public mobileMode(): boolean{
    return (this.screenSize == 'md' || this.screenSize == 'sm' || this.screenSize == 'xs');
  }

  public animate(which : string){
    this.toggleBanner(which)
    if(which === 'who'){
      this.whoBtnScaleCntl.animate();
      this.whoTxtScaleCntl.animate();
      this.whoLinePositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(0)
      })
    }
    else if(which === 'what'){
      this.whatBtnScaleCntl.animate();
      this.whatTxtScaleCntl.animate();
      this.whatLinePositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(0)
      })
    }
  }

  public prime(which : string){
    this.toggleBanner(which)
    if(which === 'who'){
      this.whoBtnScaleCntl.prime();
      this.whoTxtScaleCntl.prime();
      this.whoLinePositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(1);
      })
    }
    else if(which === 'what'){
      this.whatBtnScaleCntl.prime();
      this.whatTxtScaleCntl.prime();
      this.whatLinePositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(1);
      })
    }
  }

}
