import { Component } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';
import { MetaService } from 'src/services/meta.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    Animations.getManualScaleTrigger(1.5, 'banner'),
    Animations.getManualScaleTrigger(0.5, 'text')
  ]
})
export class AboutComponent {

  public screenSize: string = '';
  public whoBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whoTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public whatTxtScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_scale);
  public who: boolean = false;
  public what: boolean = false

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    });
  }

  public mobileMode(){
    return (this.screenSize == 'md' || this.screenSize == 'sm' || this.screenSize == 'xs');
  }

  public animate(which : string){
    if(which === 'who'){
      this.whoBtnScaleCntl.animate();
      this.whoTxtScaleCntl.animate();
      if(!this.who){ this.who = !this.who; }
    }
    else if(which === 'what'){
      this.whatBtnScaleCntl.animate();
      this.whatTxtScaleCntl.animate();
      if(!this.what){ this.what = !this.what; }
    }
  }

  public prime(which : string){
    if(which === 'who'){
      this.whoBtnScaleCntl.prime();
      this.whoTxtScaleCntl.prime();
    }
    else if(which === 'what'){
      this.whatBtnScaleCntl.prime();
      this.whatTxtScaleCntl.prime();
    }
  }

}
