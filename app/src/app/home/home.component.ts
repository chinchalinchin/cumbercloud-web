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

  public sliderFadeCntl = new AnimationControl(AnimationTriggers.cntl_fade);
  public sliderState = sliderStates.one;
  public states = sliderStates;

  constructor() { }

  ngOnInit(): void { }

  public setState(state: sliderStates): void{
    this.sliderFadeCntl.animate();
    setTimeout(()=>{
        this.sliderState = state;
        this.sliderFadeCntl.prime();
    }, AnimationPeriods.medium*1000)
  }

  public getSrc(): string{
    switch(this.sliderState){
      case this.states.one:
          return "/assets/clouds-banner.jpg";
      case this.states.two:
          return "/assets/fee-banner.png"
      default:
          return "/assets/clouds-banner.jpg";
    }
  }

  public getTitle(): string{
    switch(this.sliderState){
      case this.states.one:
          return "Web Design and Hosting";
      case this.states.two:
          return "Cost Savings Comparison"
      default:
          return "";
    }
  }

  public getSubtitle(): string{
    switch(this.sliderState){
      case this.states.one:
          return "Responsive sites built on modern architecture";
      case this.states.two:
          return "Bringing the cost savings of cloud computing to small businesses"
      default:
          return "";
    }
  }

  public getTooltip(state: sliderStates): string {
    switch(state){
      case this.states.one:
          return "Quality";
      case this.states.two:
          return "Cost"
      default:
          return "";
    }
  }
}
