import { Component } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers, ExpandStates, HighlightStates } from 'src/animations';

enum popupStates{
  one, two, three, four, null
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%'),
    Animations.getManualHighlightTrigger(1.25)
  ]
})
export class AboutComponent {
  public popupExpandCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  public states = popupStates;
  public popUpState: popupStates = popupStates.null;
  public factHighlightCntls : AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
    new AnimationControl(AnimationTriggers.cntl_highlight),
  ]

  constructor() { 
    this.popupExpandCntl.setState(ExpandStates.closed);
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
          return "Diverse technical skillset";
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
