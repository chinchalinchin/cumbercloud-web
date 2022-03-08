import { Component } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers, ExpandStates, HighlightStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';

enum popupStates{
  one, two, three, four, null
}
@Component({
  selector: 'app-grant',
  templateUrl: './grant.component.html',
  styleUrls: ['./grant.component.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%'),
    Animations.getManualHighlightTrigger(1.25)
  ]
})
export class GrantComponent {
  public screenSize: string = '';
  public popupExpandCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  public states = popupStates;
  public popUpState: popupStates = popupStates.null;
  public factHighlightCntls : AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
  ]

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      console.log(size);
      this.screenSize = size;
    }) 
    this.popupExpandCntl.setState(ExpandStates.closed);
  }

  public mobileMode(){
    return this.screenSize == 'xs';
  }

  public expand(state: popupStates): void{
    this.popUpState = state;
    this.popupExpandCntl.animate();
  }

  public close(): void{
    this.popUpState = popupStates.null;
    this.popupExpandCntl.prime();
  }

  public closed(): boolean{
    return this.popupExpandCntl.state == ExpandStates.closed
  }

  public highlighted(factIndex: number){
    return this.factHighlightCntls[factIndex].state == HighlightStates.highlight;
  }

  public highlight(factIndex: number): void{
    this.factHighlightCntls[factIndex].animate()
  }

  public delight(factIndex: number): void{
    this.factHighlightCntls[factIndex].prime()
  }

  public getMessage(factIndex: number): string{
    if(this.factHighlightCntls[factIndex].state == HighlightStates.normal){
      switch(factIndex){
        case 0:
          return "Experience";
        case 1:
          return "Certifications";
        case 2:
          return "Education";
        case 3:
          return "Portfolio";
        default:
          return "";
      }
    }
    else{
      switch(factIndex){
        case 0:
          return "Professional background";
        case 1:
          return "Industry recognized expertise";
        case 2:
          return "Diverse technical skill set";
        case 3:
          return "Websites, applications & projects";
        default:
          return "";
      }
    }
  }

  public getPopupTitle(): string{
    switch(this.popUpState){
      case this.states.one:
        return "Professional Experience"
      case this.states.two:
        return "Technical Certifications"
      case this.states.three:
        return "Academic Career"
      case this.states.four:
        return "Project Gallery"
      default:
        return ""
    }
  }
}
