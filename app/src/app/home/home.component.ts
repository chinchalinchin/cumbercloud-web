import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';

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
                                        
    Animations.getManualPositionTrigger({ top: '35%', left: '7.5%' }, 
                                        { top: '86%', left: '77.5%', right: '0%' },
                                        'cloud_line_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '55%', left: '12.5%' }, 
                                        { top: '66%', left: '77.5%', right: '0%' },
                                        'cloud_line_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '35%', right: '7.5%' }, 
                                        { top: '46%', left: '77.5%', right: '0%' },
                                        'cloud_line_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '55%', right: '12.5%' },  
                                        { top: '26%', left: '77.5%', right: '0%'},
                                        'cloud_line_4', AnimationPeriods.short),

    Animations.getManualFadeTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent implements OnInit {

  public displayLines: boolean = true;
  public selecting: boolean = false;
  public moved: boolean = false;
  public animated: boolean = false;
  public states = States;
  public state = States.one;
  public centerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public centerFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public selectionPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public selectorFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public selectionFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
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

  public constructor(private meta: MetaService){
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      console.log(size)
      if(size == 'md' || size == 'sm' || size == 'xs'){
        this.displayLines = false;
      } else{
        this.displayLines = true;
      }
    });

  }
  ngOnInit(): void { 
    this.cloudFadeCntl.setState(FadeStates.out);
  }

  public display(){
    this.centerPositionCntl.animate();
    this.selectionPositionCntl.animate();
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
    this.selectionFadeCntl.animate();
    this.selecting = true;
    setTimeout(()=>{
      this.state = state; 
      this.selecting = false;
      this.selectionFadeCntl.prime();
    }, AnimationPeriods.short*1000)
  }

  public selected(state: States){
    return this.state == state;
  }

  public getSrc(): string{
    switch(this.state){
      case this.states.one:
          return "/assets/banners/circuitry-banner.jpg";
      case this.states.two:
          return "/assets/banners/money-banner.jpg"
      case this.states.three:
          return "/assets/banners/expertise-banner.jpg"
      case this.states.four:
          return "/assets/banners/human_centric_design-banner.jpg"
      default:
          return "/assets/banners/clouds-banner.jpg";
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
          return "Human Centric Design";
      default:
          return "";
    }
  }

  public getSubtitle(): string{
    switch(this.state){
      case this.states.one:
          return "Creating responsive sites built on modern infrastructure";
      case this.states.two:
          return "Bringing the cloud's economy of scale to small businesses";
      case this.states.three:
          return "Drawing on years of production web development";
      case this.states.four:
          return "Behavior Driven Development"
      default:
          return "";
    }
  }

  public getBlurb(): string{
    switch(this.state){
      case this.states.one:
          return "The <strong>Cumberland Cloud</strong> offers custom web page design and application development for small business owners looking to expand their digital reach without breaking the bank. No matter what your vision for your new website looks like, whether it includes an online store, a reservation system, a forum for users or anything else, we can help you bring to it life while staying within budget.";
      case this.states.two:
          return "The cloud provides a serverless, low-maintenance environment for the modern web application. The <strong>Cumberland Cloud</strong> specializes in using this pioneering technology to architect cost-optimized solutions. As a result, our sites are not only more secure, more scalable and more easily deployed than what the competition offers, but they are cheaper too!";
      case this.states.three:
          return "Our team has worked on production-scale projects with leading names in the industry. They bring to each project a professional approach, honed with years of experience. Every website we produce is hand-crafted and built from scratch. You won't find a site anywhere else on the internet that look like ours. ";
      case this.states.four:
          return ""
      default:
          return "Creating responsive sites built on modern architecture";
    }
  }

  public getLine(state: States): string{
    switch(state){
      case this.states.four:
        if(this.moved) return "Innovative";
        return "Give me a page to land";
      case this.states.three:
        if(this.moved) return "Proven";
        return "And a button big enough";
      case this.states.two:
        if(this.moved) return "Affordable";
        return "And I will move the world.";
      case this.states.one:
        if(this.moved) return "Guaranteed";
        return "<a href=\"https://www.cs.drexel.edu/~crorres/Archimedes/Lever/LeverQuotes_OLD.html\" target=\"_blank\" rel=\"noopener noreferrer\">- Archimedes, probably</a>";
      default:
        return ""
    }
  }

}
