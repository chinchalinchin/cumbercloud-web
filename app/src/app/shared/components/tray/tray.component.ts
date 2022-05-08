import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AnimationControl,
  AnimationPeriods,
  Animations,
  AnimationTriggers,
} from 'src/animations';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css'],
  animations: [
    Animations.getExpandTrigger('3%'),
    Animations.getManualPositionTrigger(
      { top: '0%', bottom: '100%', right: '0%', left: '0%' },
      [
        { top: '0%', bottom: '97%', left: '0%', right: '0%' },
        { top: '0%', bottom: '75%', left: '0%', right: '0%' },
      ],
      'tray'
    ),
  ],
})
export class TrayComponent implements OnInit {
  public extended: boolean = false;
<<<<<<< HEAD
  public extending: boolean = false;
  public positionCntl : AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
=======
  public positionCntl: AnimationControl = new AnimationControl(
    AnimationTriggers.cntl_position
  );
>>>>>>> df10602a16f5c35cd6ba9782b021b02700f5625e
  @Output()
  public trayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.positionCntl.animatePosition(0);
  }

  public extend() {
    if (!this.extended) {
      this.positionCntl.animatePosition(1);
    } else {
      this.positionCntl.animatePosition(0);
    }
    this.extended = !this.extended;
    this.extending = true;
    setTimeout(()=>{
      this.extending = false;
    }, AnimationPeriods.short*900);
    this.trayChanged.emit(this.extended);
  }
}