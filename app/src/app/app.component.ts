import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';
import { SheetComponent } from './sheet/sheet.component';

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

  public menuDisplayed: boolean = false;
  public sheetDisplayed: boolean = false;

  public menuFoldCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  
  public navItems: NavConfig[] = [
    { path: '', title: 'Home' },
    { path: 'team', title: 'Team' },
    { path: 'design', title: 'Design' },
    { path: 'pricing', title: 'Pricing' },
    { path: 'contact', title: 'Contact' }
  ];

  public constructor(private _bottomSheet: MatBottomSheet){ }

  public selectedNav: NavConfig = this.navItems[0];

  public navigate(nav: NavConfig){
    this.selectedNav = nav;
    if(this.menuDisplayed){ this.menuFoldCntl.prime(); }
  }

  public toggleMenu(){
    if(this.menuDisplayed){ this.menuFoldCntl.prime(); }
    else{ this.menuFoldCntl.animate(); }
    this.menuDisplayed = !this.menuDisplayed;
  }

  public openSheet(){
    this._bottomSheet.open(SheetComponent, { 
      ariaLabel: 'Contact Information',
      panelClass: 'sheet'
    });
  }

}
