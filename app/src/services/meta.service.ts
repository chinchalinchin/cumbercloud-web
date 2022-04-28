import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetaService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(0);
  public mediaBreakpoint: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      console.log('browser');
    } else if (this.isServer()) {
      console.log('server');
    } else {
      console.log('?');
    }
    if (this.isBrowser()) {
      this.setScreenWidth(window.innerWidth);
      this.setMediaBreakpoint(window.innerWidth);
      fromEvent(window, 'resize')
        .pipe(debounceTime(100), takeUntil(this.unsubscriber))
        .subscribe((evt: any) => {
          this.setScreenWidth(evt.target.innerWidth);
          this.setMediaBreakpoint(evt.target.innerWidth);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  private setMediaBreakpoint(width: number): void {
    if (width < 576) {
      this.mediaBreakpoint.next('xs');
    } else if (width >= 576 && width < 768) {
      this.mediaBreakpoint.next('sm');
    } else if (width >= 768 && width < 992) {
      this.mediaBreakpoint.next('md');
    } else if (width >= 992 && width < 1200) {
      this.mediaBreakpoint.next('lg');
    } else if (width >= 1200 && width < 1600) {
      this.mediaBreakpoint.next('xl');
    } else {
      this.mediaBreakpoint.next('xxl');
    }
  }

  public isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  public isServer() {
    return isPlatformServer(this.platformId);
  }
}
