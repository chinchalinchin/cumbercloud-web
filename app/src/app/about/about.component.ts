import { Component, OnInit } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers, ExpandStates } from 'src/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%')
  ]
})
export class AboutComponent implements OnInit {

  public popupExpandCntl = new AnimationControl(AnimationTriggers.cntl_expand);

  constructor() { 
    this.popupExpandCntl.setState(ExpandStates.closed);
  }

  ngOnInit(): void {
  }

  public expand(){
    this.popupExpandCntl.animate();
  }

  public close(){
    this.popupExpandCntl.prime();
  }

  public closed(){
    return this.popupExpandCntl.state == ExpandStates.closed
  }

}
