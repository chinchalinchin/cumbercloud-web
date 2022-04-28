import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pricing } from 'src/app/app.config';

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
  public numberValue: number = 1;
  public sliderValue: number = 1;
  public total!: number;

  @Input()
  public config!: Pricing;
  @Output()
  public totalChanged: EventEmitter<RateEvent> = new EventEmitter<RateEvent>();

  constructor() {}

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
  }

  public recalculate(num: number) {
    this.total = num * this.config.rate;
    this.totalChanged.emit({
      key: this.config.key,
      total: this.total,
    });
  }
}
