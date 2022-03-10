import { Component } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, ExpandStates, SwipeStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { ChipConfig, DESIGN_CHIPS, INFRASTRUCTURE_CHIPS, SOFTWARE_CHIPS, TECHNOLOGY_CHIPS } from '../app.config';

enum PopupStates{
  one, two, three, four, null
};

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./css/design.component.id.css', 
              './css/design.component.class.css',
              './css/design.component.native.css'],
  animations: [
    Animations.getManualExpandTrigger('60%', '80%', AnimationPeriods.short, 'desktop'),
    Animations.getManualExpandTrigger('70%', '100%', AnimationPeriods.short, 'mobile'),
    Animations.getManualSwipeTrigger(),
  ]
})
export class DesignComponent{
  public inited: boolean = false;
  public screenSize: string = '';
  public popupDesktopExpandCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_expand);
  public popupMobileExpandCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_expand);
  public designSwipeCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.swipe),
    new AnimationControl(AnimationTriggers.swipe),
    new AnimationControl(AnimationTriggers.swipe),
    new AnimationControl(AnimationTriggers.swipe),
    new AnimationControl(AnimationTriggers.swipe),
    new AnimationControl(AnimationTriggers.swipe),
  ];
  public imgSlideCntl = new AnimationControl(AnimationTriggers.slide);
  public states = PopupStates;
  public popUpState: PopupStates = PopupStates.null;
  public designStepOne: "who" | "what" | "why" | "" = "who";
  public designStepTwo: "session" | "specs" | "hire" | "" = "session";
  public deployStepOne: "cloud" | "cumberland" | "" = "cloud";
  public deployStepTwo: "pool" | "share" | "save" | "" = "pool";
  public deployStepThree: "template" | "deploy" | "" = "template";
  public infraChips: ChipConfig[] = INFRASTRUCTURE_CHIPS;
  public designChips: ChipConfig[] = DESIGN_CHIPS;
  public softChips: ChipConfig[] = SOFTWARE_CHIPS;
  public techChips: ChipConfig[] = TECHNOLOGY_CHIPS;

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    })
   }

  ngAfterViewInit() {
    this.inited = true;
  }

  public expand(state: PopupStates): void{
    this.popUpState = state;
    if(this.mobileMode()){
      this.popupMobileExpandCntl.animate();
    }
    else{
      this.popupDesktopExpandCntl.animate();

    }
  }

  public mobileMode(){
    return this.screenSize == 'xs' || this.screenSize == 'sm' || this.screenSize == 'md';
  }

  public swipeRight(step: string){
    let next: any = '';
    let nextIndex: number = -1;
    let currentIndex: number = -1;
    switch(step){
      case "designStepOne":
          switch(this.designStepOne){
            case "who":
                this.designSwipeCntls[0].swipe(SwipeStates.right);
                this.designSwipeCntls[1].swipe(SwipeStates.left);
                next = "why"; currentIndex = 0; nextIndex = 1; 
                break;
            case "why":
                this.designSwipeCntls[1].swipe(SwipeStates.right);
                this.designSwipeCntls[2].swipe(SwipeStates.left);
                next = "what"; currentIndex = 1; nextIndex = 2;
                break;
            case "what":
                this.designSwipeCntls[2].swipe(SwipeStates.right);
                this.designSwipeCntls[0].swipe(SwipeStates.left);
                next = "who"; currentIndex = 2; nextIndex = 0;
                break;
          }
          setTimeout(()=>{
            this.designStepOne = next;
            this.designSwipeCntls[nextIndex].swipe(SwipeStates.unswiped_left);
          }, AnimationPeriods.short*1000);
          break;
      case "deployStepOne": 
          switch(this.deployStepOne){
            case "cloud":
              next = "cumberland"
              break;
            case "cumberland":
              next = "cloud"
              break;
            default: 
              next = "cloud"
              break;
          }
          setTimeout(()=>{
            this.deployStepOne = next;
          }, AnimationPeriods.short*1000);
          break;
      case "deployStepTwo":
          switch(this.deployStepTwo){
            case "pool":
                next = "share";
                break;
            case "share":
                next = "save"
                break;
            case "save":
              next = "pool";
              break;
          }
          setTimeout(()=>{
            this.deployStepTwo = next;
          }, AnimationPeriods.short*1000);
          break;
      case "deployStepThree":
          switch(this.deployStepThree){
            case "template":
              next = "deploy"
              break;
            case "deploy":
              next = "template"
              break;
          }
          setTimeout(()=>{
            this.deployStepThree = next;
          }, AnimationPeriods.short*1000);
          break;
    }
  }

  public swipeLeft(step: string){
    console.log('step')
  }

  public close(): void{
    this.popUpState = this.states.null;
    if(this.popupDesktopExpandCntl.state == ExpandStates.open){
      this.popupDesktopExpandCntl.prime();
    }
    if(this.popupMobileExpandCntl.state == ExpandStates.open){
      this.popupMobileExpandCntl.prime();
    }
  }

  public closed(): boolean{
    if(this.mobileMode()){
      return this.popupMobileExpandCntl.state == ExpandStates.closed
    }
    return this.popupDesktopExpandCntl.state == ExpandStates.closed
  }
  
  public getPopupTitle(): string{
    switch(this.popUpState){
      case this.states.one:
        return "Design Process"
      case this.states.two:
        return "Development Process"
      case this.states.three:
        return "Deployment Process"
      case this.states.four:
        return "Delivery Process"
      default:
        return ""
    }
  }

}
