import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates } from 'src/animations';

enum sliderStates{
  one="one", two="two", three="three"
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

  ngOnInit(): void { 
    this.recurse();
  }

  public setState(state: sliderStates): void{
    this.sliderFadeCntl.animate();
    setTimeout(()=>{
        this.sliderState = state;
        this.sliderFadeCntl.prime();
    }, AnimationPeriods.medium*1000);
  }

  public recurse(){
    setTimeout(()=>{
      this.iterate();
      this.recurse();
    }, AnimationPeriods.medium*5000);
  }

  private iterate(){
    switch(this.sliderState){
      case this.states.one:
        this.setState(this.states.two);
        break;
      case this.states.two:
        this.setState(this.states.three);
        break;
      case this.states.three:
        this.setState(this.states.one);
        break;
    }
  }

  public getSrc(): string{
    switch(this.sliderState){
      case this.states.one:
          return "/assets/banners/clouds-banner.jpg";
      case this.states.two:
          return "/assets/banners/fee-banner.png"
      case this.states.three:
          return "/assets/banners/expertise-banner.jpg"
      default:
          return "/assets/banners/clouds-banner.jpg";
    }
  }

  public getTitle(): string{
    switch(this.sliderState){
      case this.states.one:
          return "Web Design and Hosting";
      case this.states.two:
          return "Cost Savings Comparison"
      case this.states.three:
          return "Professional Tier Solutions"
      default:
          return "";
    }
  }

  public getSubtitle(): string{
    switch(this.sliderState){
      case this.states.one:
          return "Creating responsive sites built on modern infrastructure";
      case this.states.two:
          return "Bringing the cost savings of cloud computing to small businesses"
      case this.states.three:
          return "Drawing on years of production-scale web and software development";
      default:
          return "Creating responsive sites built on modern architecture";
    }
  }

  public getTooltip(state: sliderStates): string {
    switch(state){
      case this.states.one:
          return "Quality";
      case this.states.two:
          return "Cost"
      case this.states.three:
          return "Experience"
      default:
          return "Quality";
    }
  }
}
