import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates, Position } from 'src/animations';

enum States{
  one="one", two="two", three="three", four="four"
}
const CONTROL_BUTTON_POSITIONS : any[] = [
  { top: '40%', left: '49%'},
  { top: '10%', left: '49%' }
];
const CLOUD_BUTTON_POSITIONS: any[] = [
  { top: '10%', left: '49%' },
  { top: '25%', left: '72.5%' },
  { top: '45%', left: '72.5%' },
  { top: '65%', left: '72.5%' },
  { top: '85%', left: '72.5%' }
]
const SELECTOR_POSITIONS: any[] = [
  { top: '100%', left: '0%', right: '0%', bottom: '0%'},
  { top: '20%', left: '0%', right: '0%', bottom: '0%' }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getManualPositionTrigger(CONTROL_BUTTON_POSITIONS[0], CONTROL_BUTTON_POSITIONS[1], 
                                        'center', AnimationPeriods.short),
    Animations.getManualPositionTrigger(SELECTOR_POSITIONS[0], SELECTOR_POSITIONS[1], 
                                        'selector', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[1],
                                        'cloud_btn_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[2],
                                        'cloud_btn_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[3],
                                        'cloud_btn_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[4],
                                        'cloud_btn_4', AnimationPeriods.short),
    Animations.getManualFadeTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent implements OnInit {
  public states = States;
  public state = States.one;
  public cloudFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public cloudPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public centerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public centerFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public selectorPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);

  ngOnInit(): void { 
    this.cloudFadeCntl.setState(FadeStates.out);
  }

  public display(){
    this.centerPositionCntl.animate();
    this.selectorPositionCntl.animate();
    setTimeout(()=>{
      this.centerFadeCntl.animate();
      this.cloudFadeCntl.prime();
      setTimeout(()=>{
        this.cloudPositionCntls.forEach((cntl: AnimationControl)=>{ cntl.animate(); });
      }, AnimationPeriods.short*500)
    }, AnimationPeriods.short*1000);
  }

  public setState(state: States){
    this.state = state; 
  }

  public getSrc(): string{
    switch(this.state){
      case this.states.one:
          return "";
      case this.states.two:
          return ""
      case this.states.three:
          return ""
      default:
          return "";
    }
  }

  public getTitle(): string{
    switch(this.state){
      case this.states.one:
          return "Web Design and Hosting";
      case this.states.two:
          return "Cloud Cost Savings";
      case this.states.three:
          return "Professional Tier Solutions";
      case this.states.four:
          return "";
      default:
          return "";
    }
  }

  public getSubtitle(): string{
    switch(this.state){
      case this.states.one:
          return "Creating responsive sites built on modern infrastructure";
      case this.states.two:
          return "Bringing the cost savings of cloud computing to small businesses";
      case this.states.three:
          return "Drawing on years of production-scale web and software development";
      default:
          return "Creating responsive sites built on modern architecture";
    }
  }

  public getTooltip(state: States): string {
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
