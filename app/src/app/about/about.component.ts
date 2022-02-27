import { Component, OnInit } from '@angular/core';
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
export class AboutComponent implements OnInit {

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

  ngOnInit(): void {
  }

  public expand(state: popupStates){
    this.popUpState = state;
    this.popupExpandCntl.animate();
  }

  public close(){
    this.popUpState = popupStates.null;
    this.popupExpandCntl.prime();
  }

  public closed(){
    return this.popupExpandCntl.state == ExpandStates.closed
  }

  public highlight(factIndex: number){
    this.factHighlightCntls[factIndex].animate()
  }

  public delight(factIndex: number){
    this.factHighlightCntls[factIndex].prime()
  }

  public getMessage(factIndex: number){
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
          return "A wealth of technical expertise";
        case 1:
          return "Industry recognized quality";
        case 2:
          return "Diverse, multidisciplined background";
        case 3:
          return "Websites, applications & projects";
        default:
          return "";
      }
    }
  }
}
