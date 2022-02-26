import { Component } from '@angular/core';

interface NavConfig{
  path: string, title: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = 'cumberland cloud';

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

}
