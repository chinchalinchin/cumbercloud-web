import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  AnimationControl,
  Animations,
  AnimationTriggers,
} from 'src/animations';
import { SheetComponent } from './sheet/sheet.component';

interface NavConfig {
  path: string;
  title: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [Animations.getManualFoldTrigger('4%')],
})
export class AppComponent {
  public underConstruction: boolean = true;
  public title: String = 'cumberland cloud';
  public selectedNav!: NavConfig;
  public menuDisplayed: boolean = false;
  public sheetDisplayed: boolean = false;
  public menuFoldCntl = new AnimationControl(AnimationTriggers.cntl_expand);
  public navItems: NavConfig[] = [
    { path: '', title: 'Home' },
    { path: 'about', title: 'About' },
    { path: 'design', title: 'Design' },
    { path: 'pricing', title: 'Pricing' },
    { path: 'contact', title: 'Contact' },
  ];

  public constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (this.menuDisplayed) {
          this.toggleMenu();
        }
        this.selectedNav = this.navItems.filter((nav: NavConfig) => {
          return nav.path == event.url.replace('/', '');
        })[0];
      });
  }

  public toggleMenu() {
    if (this.menuDisplayed) {
      this.menuFoldCntl.prime();
    } else {
      this.menuFoldCntl.animate();
    }
    this.menuDisplayed = !this.menuDisplayed;
  }

  public openSheet() {
    this._bottomSheet.open(SheetComponent, {
      ariaLabel: 'Contact Information',
      panelClass: 'sheet',
    });
  }
}
