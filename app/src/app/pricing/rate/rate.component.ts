import { Component, Input, OnInit } from '@angular/core';
import { Pricing } from 'src/app/app.config';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  public numberValue: number = 1;
  public sliderValue: number = 1;

  @Input()
  public config!: Pricing;

  constructor() { }

  ngOnInit(): void {
  }

}
