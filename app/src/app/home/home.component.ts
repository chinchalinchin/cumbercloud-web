import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates } from 'src/animations';

enum States{
  one="one", two="two", three="three", four="four"
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getManualPositionTrigger({ top: '40%', left: '48%'}, 
                                        { top: '0%', left: '48%' }, 
                                        'center', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '100%', left: '0%', right: '0%', bottom: '0%'}, 
                                        { top: '20%', left: '0%', right: '0%', bottom: '0%'}, 
                                        'selector', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' },
                                        { top: '25%', left: '72.5%' },
                                        'cloud_btn_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                        { top: '45%', left: '72.5%' },
                                        'cloud_btn_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                        { top: '65%', left: '72.5%' },
                                        'cloud_btn_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                        { top: '85%', left: '72.5%' },
                                        'cloud_btn_4', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '37.5%', left: '15%' }, 
                                        { top: '86%', left: '77.5%', right: '0%' },
                                        'cloud_line_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '50%', left: '20%' }, 
                                        { top: '66%', left: '77.5%', right: '0%' },
                                        'cloud_line_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '37.5%', right: '20%' }, 
                                        { top: '46%', left: '77.5%', right: '0%' },
                                        'cloud_line_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '50%', right: '15%' },  
                                        { top: '26%', left: '77.5%', right: '0%'},
                                        'cloud_line_4', AnimationPeriods.short),

    Animations.getManualFadeTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent implements OnInit {
  public moved: boolean = false;
  public animated: boolean = false;
  public states = States;
  public state = States.one;
  public centerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public centerFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public selectorPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public cloudFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public cloudBtnPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public cloudLinePositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];

  ngOnInit(): void { 
    this.cloudFadeCntl.setState(FadeStates.out);
  }

  public display(){
    this.centerPositionCntl.animate();
    this.selectorPositionCntl.animate();
    this.cloudLinePositionCntls.forEach((cntl: AnimationControl)=>{ cntl.animate(); }); 
    
    setTimeout(()=>{
      this.moved = true;
    }, AnimationPeriods.short*500);

    setTimeout(()=>{
      this.centerFadeCntl.animate();
      this.cloudFadeCntl.prime();
      setTimeout(()=>{
        this.cloudBtnPositionCntls.forEach((cntl: AnimationControl)=>{ cntl.animate(); });
        setTimeout(()=>{
          this.animated = true;
        }, AnimationPeriods.short*1000);
      }, AnimationPeriods.short*500);
    }, AnimationPeriods.short*500);
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
      case this.states.four:
          return ""
      default:
          return "Creating responsive sites built on modern architecture";
    }
  }

  public getLine(state: States): string{
    switch(state){
      case this.states.one:
        if(this.moved) return "state four";
        return "Give me a page to land";
      case this.states.two:
        if(this.moved) return "state three";
        return "And a button big enough";
      case this.states.three:
        if(this.moved) return "state two";
        return "And I will move the world.";
      case this.states.four:
        if(this.moved) return "state one";
        return "- <a href=\"https://www.goodreads.com/quotes/16830-give-me-a-place-to-stand-and-a-lever-long\" target=\"_blank\" rel=\"noopener noreferrer\">Archimedes, probably</a>";
      default:
        return ""
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
