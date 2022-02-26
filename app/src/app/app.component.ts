import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';

interface NavConfig{
  path: string, title: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    Animations.getManualFoldTrigger('4%'),
  ]
})
export class AppComponent {
  public title: String = 'cumberland cloud';

  public displayed: boolean = false;

  public menuFoldCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  
  public navItems: NavConfig[] = [
    { path: '', title: 'Home' },
    { path: 'about', title: 'About' },
    { path: 'design', title: 'Design' },
    { path: 'pricing', title: 'Pricing' },
    { path: 'contact', title: 'Contact' }
  ];

  public constructor(private router: Router){

  }

  ngAfterViewInit(){
    console.log(this.router.url)
  }

  public selectedNav: NavConfig = this.navItems[0];

  public navigate(nav: NavConfig){
    this.selectedNav = nav;
  }

  public display(){
    if(this.displayed){ this.menuFoldCntl.prime(); }
    else{ this.menuFoldCntl.animate(); }
    this.displayed = !this.displayed;
  }

}
