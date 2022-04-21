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
  styleUrls: [ './design.component.css' ],
  animations: [ ]
})
export class DesignComponent{
  public screenSize: string = '';

  constructor(private meta: MetaService) {
    this.meta.mediaBreakpoint.subscribe((size: string)=>{
      this.screenSize = size;
    })
   }

  public mobileMode(){
    return this.screenSize == 'xs' || this.screenSize == 'sm' || this.screenSize == 'md';
  }

}
