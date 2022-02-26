import { Component } from '@angular/core';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';

interface NavConfig{
  path: string, title: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    Animations.getExpandTrigger('4%'),
    Animations.getFadeTrigger()
  ]
})
export class AppComponent {
  public title: String = 'cumberland cloud';

  public displayed: boolean = false;

  public menuExpandCntl = new AnimationControl(AnimationTriggers.expand);
  public menuFadeCntl = new AnimationControl(AnimationTriggers.fade);
  
  public navItems: NavConfig[] = [
    { path: '', title: 'Home' },
    { path: '', title: 'About' },
    { path: '', title: 'Design' },
    { path: '', title: 'Pricing' },
    { path: '', title: 'Contact' }
  ];

  public selectedNav: NavConfig = this.navItems[0];

  public navigate(nav: NavConfig){
    this.selectedNav = nav;
  }

  public display(){
    if(this.displayed){
      this.menuExpandCntl.prime();
      this.menuFadeCntl.prime();
    }
    else{
      this.menuExpandCntl.animate();
      this.menuFadeCntl.animate();
    }
    this.displayed = !this.displayed;
  }

}
