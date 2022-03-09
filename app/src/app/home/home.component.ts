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
                                        [{ top: '0%', left: '48%' }], 
                                        'center', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '100%', left: '0%', right: '0%', bottom: '0%'},
                                        [{ top: '10%', left: '0%', right: '0%', bottom: '0%'}], 
                                        'selector', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' },
                                        [{ top: '20%', left: '72.5%' },
                                         { top: '20%', left: '87.5%' }],
                                        'cloud_btn_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                         [{ top: '40%', left: '72.5%'},
                                          { top: '40%', left: '87.5%'}],
                                        'cloud_btn_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                         [{ top: '60%', left: '72.5%' },
                                          { top: '60%', left: '87.5%' }],
                                        'cloud_btn_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '0%', left: '48%' }, 
                                         [{ top: '80%', left: '72.5%' },
                                          { top: '80%', left: '87.5%' }],
                                        'cloud_btn_4', AnimationPeriods.short),              
    Animations.getManualPositionTrigger({ top: '35%', left: '7.5%' }, 
                                        [{ top: '81%', left: '77.5%', right: '0%' }],
                                        'cloud_line_desktop_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '55%', left: '12.5%' }, 
                                        [{ top: '61%', left: '77.5%', right: '0%' }],
                                        'cloud_line_desktop_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '35%', right: '7.5%' }, 
                                        [{ top: '41%', left: '77.5%', right: '0%' }],
                                        'cloud_line_desktop_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '55%', right: '15%' },  
                                        [{ top: '21%', left: '77.5%', right: '0%'}],
                                        'cloud_line_desktop_4', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '32%', left: '30%' }, 
                                        [{ top: '32%', left: '200%' }],
                                        'cloud_line_mobile_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '60%', left: '28%' },  
                                        [{ top: '60%', left: '-100%', right: '0%'}],
                                        'cloud_line_mobile_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger({ top: '68%', right: '5%' },  
                                        [{ top: '68%', left: '-100%', right: '0%'}],
                                        'cloud_line_mobile_3', AnimationPeriods.short),

    Animations.getManualFadeTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent implements OnInit {
  public animating: boolean = false;
  public selecting: boolean = false;
  public moved: boolean = false;
  public animated: boolean = false;
  public screenSize: string = '';
  public states = States;
  public state = States.one;
  public centerFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public selectionFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public cloudFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public centerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public selectionPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public cloudBtnPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public cloudLineDesktopPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];
  public cloudLineMobilePositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position)
  ]

  public constructor(private meta: MetaService){
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    });

  }

  ngOnInit(): void { 
    this.cloudFadeCntl.setState(FadeStates.out);
  }

  public mobileMode(){
    return (this.screenSize == 'md' || this.screenSize == 'sm' || this.screenSize == 'xs');
  }

  public display(){
    this.animating = true;
    this.centerPositionCntl.animatePosition(0);
    this.selectionPositionCntl.animatePosition(0);
    if(this.mobileMode()){
      this.cloudLineMobilePositionCntls.forEach((cntl: AnimationControl)=>{ 
        cntl.animatePosition(0); 
      }); 
    }
    else{
      this.cloudLineDesktopPositionCntls.forEach((cntl: AnimationControl)=>{ 
        cntl.animatePosition(0); 
      }); 
    }
    setTimeout(()=>{
      this.moved = true;
    }, AnimationPeriods.short*500);
    setTimeout(()=>{
      this.centerFadeCntl.animate();
      this.cloudFadeCntl.prime();
      setTimeout(()=>{
        this.cloudBtnPositionCntls.forEach((cntl: AnimationControl)=>{ 
          if(!this.mobileMode()){
            cntl.animatePosition(0)
          } else{
            cntl.animatePosition(1)
          }        
        });
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
          return "Professional Solutions";
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
          return "Drawing on years of industrial web development experience";
      case this.states.four:
          return "Letting user behavior drive the development process"
      default:
          return "";
    }
  }

  public getBlurb(): string{
    switch(this.state){
      case this.states.one:
          return "The <strong>Cumberland Cloud</strong> offers custom web page design and cloud-based hosting for small business owners looking to expand their online footprint without breaking the bank.";
      case this.states.two:
          return "We specialize in using the latest in serverless, low-maintenance cloud technology to architect cost-optimized web solutions. ";
      case this.states.three:
          return "Our team has a rich professional background in web development, with experience on production-scale projects from the leading names in the industry.";
      case this.states.four:
          return "Every website we produce is built with your users in mind. Each detail is crafted to streamline the user experience and improve conversion."
      default:
          return "";
    }
  }

  public getLine(state: States): string{
    switch(state){
      case this.states.four:
        if(this.moved) return "User-Friendly";
        return "Give me a page to land";
      case this.states.three:
        if(this.moved) return "Technical Expertise";
        return "And a button big enough";
      case this.states.two:
        if(this.moved) return "Affordable";
        return "And I will move the world.";
      case this.states.one:
        if(this.moved) return "Technical";
        return "<a href=\"https://www.cs.drexel.edu/~crorres/Archimedes/Lever/LeverQuotes_OLD.html\" target=\"_blank\" rel=\"noopener noreferrer\">- Archimedes, probably</a>";
      default:
        return ""
    }
  }

}
