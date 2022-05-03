import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { PricingConfig } from 'src/app/app.config';
import { MetaService } from 'src/services/meta.service';

export interface RateEvent {
  key: string;
  total: number;
}
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
})
export class RateComponent implements OnInit {
  @Input()
  public config!: PricingConfig;
  @Output()
  public totalChanged: EventEmitter<RateEvent> = new EventEmitter<RateEvent>();

  public screenSize: string = '';
  public numberValue: number = 1;
  public sliderValue: number = 1;
  public total!: number;

  public constructor(
    private _meta: MetaService,
    private _ga: GoogleAnalyticsService
  ) {
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
  }

  ngOnInit() {
    this.calculate();
  }

  private isSlider(): boolean {
    return this.config.parameter.type === 'slider';
  }

  private isNumber(): boolean {
    return this.config.parameter.type === 'number';
  }

  private isNull(): boolean {
    return this.config.parameter.type === 'null';
  }

  public mobileMode() {
    return (
      this.screenSize == 'md' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'xs'
    );
  }

  public calculate(): void {
    if (this.isSlider()) {
      this.total = this.sliderValue * this.config.rate;
    } else if (this.isNumber()) {
      this.total = this.numberValue * this.config.rate;
    } else if (this.isNull()) {
      this.total = this.config.rate;
    }
    this.totalChanged.emit({
      key: this.config.key,
      total: this.total,
    });
    this._ga.event('rate', 'calculate', this.config.key);
  }

  public recalculate(num: number) {
    this.total = num * this.config.rate;
    this.totalChanged.emit({
      key: this.config.key,
      total: this.total,
    });
    this._ga.event('rate', 'calculate', this.config.key);
  }
}
