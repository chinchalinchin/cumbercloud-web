import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import {
  AnimationControl,
  AnimationPeriods,
  Animations,
  AnimationTriggers,
} from 'src/animations';
import { ArticleConfig } from 'src/app/app.config';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css'],
  animations: [
    Animations.getExpandTrigger('3%'),
    Animations.getExpandTrigger('100%', 'full'),
    Animations.getFadeTrigger(),
    Animations.getManualPositionTrigger(
      { top: '0%', bottom: '100%', right: '0%', left: '0%' },
      [
        { top: '0%', bottom: '97%', left: '0%', right: '0%' },
        { top: '0%', bottom: '70%', left: '0%', right: '0%' },
      ],
      'tray'
    ),
  ],
})
export class TrayComponent implements OnInit {
  @Output()
  public trayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public extended: boolean = false;
  public extending: boolean = false;
  public positionCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_position
  );
  public latest: ArticleConfig;
  public feed: ArticleConfig[];

  constructor(
    private _articles: ArticleService,
    private _ga: GoogleAnalyticsService,
  ) {
    this.latest = this._articles.getLatest();
    this.feed = this._articles.getSampleFeed();
  }

  ngOnInit(): void {
    this.positionCntl.animatePosition(0);
  }

  public extend() {
    if (!this.extended) {
      this.positionCntl.animatePosition(1);
      this._ga.event('app', 'tray', 'unextend')
    } else {
      this.positionCntl.animatePosition(0);
    }
    this.extending = true;
    this.extended = !this.extended;
    setTimeout(() => {
      this.extending = false;
    }, AnimationPeriods.short * 900);
    this.trayChanged.emit(this.extended);
  }
}
