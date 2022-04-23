import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers } from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { ChipConfig, INFRASTRUCTURE_CHIPS, TOOL_CHIPS } from '../app.config';

enum Phases{
  none="none", design="design", develop="develop", deploy="deploy", deliver="deliver"
}

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [ './design.component.css' ],
  animations: [
    Animations.getScaleTrigger(1)
  ]
})
export class DesignComponent{
  public phases = Phases;
  public phase: Phases = Phases.none;
  public screenSize: string = '';
  public infrastructure: ChipConfig[] = INFRASTRUCTURE_CHIPS;
  public tools: ChipConfig[] = TOOL_CHIPS;
  public phaseIcons : any[] = [
    ['xd', 'gimp', 'drawio'],
    ['typescript', 'python', 'angular', 'django'],
    ['docker', 'cloudfront', 's3', 'lambda', 'apigateway']
  ]

  constructor(private meta: MetaService,
              public dialog: MatDialog) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    })
   }

  public mobileMode(): boolean{
    return this.screenSize == 'xs' || this.screenSize == 'sm' || this.screenSize == 'md';
  }

  public isChipDisabled(chipIcon: string): boolean{
    switch(this.phase){
      case Phases.design:
        return !this.phaseIcons[0].includes(chipIcon);
      case Phases.develop:
        return !this.phaseIcons[1].includes(chipIcon);
      case Phases.deploy:
        return !this.phaseIcons[2].includes(chipIcon);
      case Phases.deliver:
        return false;
      default:
        return true;
    }
  }

  public phasedIn(phase: Phases){
    switch(this.phase){
      case Phases.design:
        return phase === Phases.design;
      case Phases.develop:
        return [Phases.design, Phases.develop].includes(phase);
      case Phases.deploy:
        return [Phases.design, Phases.develop, Phases.deploy].includes(phase);
      case Phases.deliver:
        return [Phases.design, Phases.develop, Phases.deploy, Phases.deliver].includes(phase);
      default:
        return false
    }
  }

  public increment(){
    switch(this.phase){
      case Phases.none:
        this.phase = Phases.design;
        break;
      case Phases.design:
        this.phase = Phases.develop;
        break;
      case Phases.develop:
        this.phase = Phases.deploy;
        break;
      case Phases.deploy:
        this.phase = Phases.deliver
        break;
    }
  }

  public decrement(){
    switch(this.phase){
      case Phases.design:
        this.phase = Phases.none;
        break;
      case Phases.develop:
        this.phase = Phases.design;
        break;
      case Phases.deploy:
        this.phase = Phases.develop;
        break;
      case Phases.deliver:
        this.phase = Phases.deploy;
        break;
    }
  }
}
