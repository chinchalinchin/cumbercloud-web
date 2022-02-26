import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates } from 'src/animations';

enum sliderStates{
  one, two, three, null
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getManualFadeTrigger(),
  ]
})
export class HomeComponent implements OnInit {

  public imgFadeCntl = new AnimationControl(AnimationTriggers.cntl_fade);
  public sliderState = sliderStates.one;
  public states = sliderStates;

  constructor() { }

  ngOnInit(): void { }

  public setState(state: sliderStates){
    this.imgFadeCntl.animate();
    setTimeout(()=>{
        this.sliderState = state;
        this.imgFadeCntl.prime();
    }, AnimationPeriods.medium*1000)
  }

  public getSrc(){
    switch(this.sliderState){
      case this.states.one:
          return "/assets/clouds-banner.jpg";
      case this.states.two:
          return "/assets/fee-banner.png"
      default:
          return "/assets/clouds-banner.jpg";
    }
  }
}
