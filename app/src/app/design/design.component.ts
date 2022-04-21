import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, ExpandStates, SwipeStates } from 'src/animations';
import { MetaService } from 'src/services/meta.service';
import { ChipConfig, INFRASTRUCTURE_CHIPS, TOOL_CHIPS } from '../app.config';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [ './design.component.css' ],
  animations: [

  ]
})
export class DesignComponent{
  public screenSize: string = '';
  public infrastructure: ChipConfig[] = INFRASTRUCTURE_CHIPS;
  public tools: ChipConfig[] = TOOL_CHIPS;

  constructor(private meta: MetaService,
              public dialog: MatDialog) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    })
   }

  public mobileMode(){
    return this.screenSize == 'xs' || this.screenSize == 'sm' || this.screenSize == 'md';
  }

}
