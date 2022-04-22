import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, ExpandStates, SwipeStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { ChipConfig, INFRASTRUCTURE_CHIPS, TOOL_CHIPS } from '../app.config';

enum Phases{
  design="design", develop="develop", deploy="deploy", deliver="deliver"
}

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [ './design.component.css' ],
  animations: [

  ]
})
export class DesignComponent{
  public phase: Phases = Phases.design;
  public screenSize: string = '';
  public infrastructure: ChipConfig[] = INFRASTRUCTURE_CHIPS;
  public tools: ChipConfig[] = TOOL_CHIPS;

  public phases : any[] = [
    ['xd', 'gimp', 'drawio'],
    ['typescript', 'python', 'angular', 'django'],
    ['docker']
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
        return !this.phases[0].includes(chipIcon);
      case Phases.develop:
        return !this.phases[1].includes(chipIcon);
      case Phases.deploy:
        return !this.phases[2].includes(chipIcon);
      case Phases.deliver:
        return false;
      default:
        return false;
    }
  }

}
