import { Component } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers } from 'src/animations';
import { MetaService } from 'src/services/meta.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    Animations.getManualScaleTrigger(1.15, 'banner'),
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
    Animations.getManualPositionTrigger({ bottom: '-20%', left: '7.5%'},
                                        [{ bottom: '-10%', left: '7.5%' },
                                         { bottom: '-20%', left: '7.5%'}], 
                                        'who_grass', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ bottom: '-15%', left: '10%'},
                                        [{ bottom: '0%', left: '10%' },
                                         { bottom: '-15%', left: '10%'}], 
                                        'who_flower', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '5%'},
                                        [{ top: '57.5%', right: '5%' },
                                         { top: '40%', right: '5%'}], 
                                        'what_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '5%'},
                                        [{ top: '68.75%', right: '5%' },
                                         { top: '40%', right: '5%'}], 
                                        'what_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '40%', right: '5%'},
                                        [{ top: '80%', right: '5%' },
                                         { top: '40%', right: '5%'}], 
                                        'what_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ bottom: '-20%', right: '7.5%'},
                                        [{ bottom: '-10%', right: '7.5%' },
                                         { bottom: '-20%', right: '7.5%'}], 
                                        'what_grass', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ bottom: '-15%', right: '10%'},
                                        [{ bottom: '0%', right: '10%' },
                                         { bottom: '-15%', right: '10%'}], 
                                        'what_flower', AnimationPeriods.short),
    Animations.getFadeTrigger(),
    Animations.getExpandTrigger('100%')
  ]
})
export class AboutComponent {

  public whoAnimated: boolean = false;
  public whatAnimated: boolean = false;
  public screenSize: string = '';
  public whoBnrScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whoTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whoPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public whoGrassPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public whoFlowerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public whatBnrScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public whatGrassPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public whatFlowerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public who: boolean = false;
  public what: boolean = false;
  public unfolded: boolean = false;

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    });
  }

  private toggleBanner(which: string): void {
    if(which==='who' && !this.whoAnimated) { this.who = !this.who; }
    else if (which === 'what' && !this.whatAnimated) { this.what = !this.what; }
  }

  public mobileMode(): boolean{
    return (this.screenSize == 'md' || this.screenSize == 'sm' || this.screenSize == 'xs');
  }

  public animate(which : string): void{
    this.toggleBanner(which)
    if(which === 'who' && !this.whoAnimated){
      this.whoAnimated = true;
      this.whoBnrScaleCntl.animate();
      this.whoTxtScaleCntl.animate();
      this.whoPositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(0)
      })
      setTimeout(()=>{
        this.whoGrassPositionCntl.animatePosition(0)
        this.whoFlowerPositionCntl.animatePosition(0)
      }, AnimationPeriods.short*500)
    }
    else if(which === 'what' && !this.whatAnimated){
      this.whatAnimated = true;
      this.whatBnrScaleCntl.animate();
      this.whatTxtScaleCntl.animate();
      this.whatPositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(0)
      })
      setTimeout(()=>{
        this.whatGrassPositionCntl.animatePosition(0)
        this.whatFlowerPositionCntl.animatePosition(0)
      }, AnimationPeriods.short*500)
    }
    setTimeout(()=>{
      this.unfolded = true;
    }, AnimationPeriods.short*500)
  }

  public prime(which : string): void{
    this.unfolded = false;
    this.toggleBanner(which)
    if(which === 'who'){
      this.whoBnrScaleCntl.prime();
      this.whoTxtScaleCntl.prime();
      this.whoPositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(1);
      })
      this.whoGrassPositionCntl.animatePosition(1);
      this.whoFlowerPositionCntl.animatePosition(1);
    }
    else if(which === 'what'){
      this.whatBnrScaleCntl.prime();
      this.whatTxtScaleCntl.prime();
      this.whatPositionCntls.forEach((cntl: AnimationControl)=>{
        cntl.animatePosition(1);
      })
      this.whatGrassPositionCntl.animatePosition(1);
      this.whatFlowerPositionCntl.animatePosition(1)
    }
  }

}
