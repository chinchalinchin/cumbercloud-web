import { Component, OnInit } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers, ExpandStates } from 'src/animations';

enum popupStates{
  one, two, three, four, null
}
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%'),
  ]
})
export class DesignComponent implements OnInit {
  public popupExpandCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  public states = popupStates;
  public popUpState: popupStates = popupStates.null;

  constructor() { }

  ngOnInit(): void {
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
  
  public getPopupTitle(): string{
    switch(this.popUpState){
      case this.states.one:
        return "Design Process"
      case this.states.two:
        return "Cloud Architecture"
      case this.states.three:
        return "Web App Development"
      case this.states.four:
        return "Product Deployment"
      default:
        return ""
    }
  }

}
