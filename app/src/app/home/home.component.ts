import { Component, OnInit } from '@angular/core';
import { AnimationControl, AnimationPeriods, Animations, AnimationTriggers, FadeStates, Position } from 'src/animations';

const CONTROL_BUTTON_POSITIONS : any[] = [
  { top: '40%', left: '49%'},
  { top: '10%', left: '49%' }
];

const CLOUD_BUTTON_POSITIONS: any[] = [
  { top: '10%', left: '49%' },
  { top: '90%', left: '20%' },
  { top: '90%', left: '40%' },
  { top: '90%', left: '60%' },
  { top: '90%', left: '80%' }
]

const SELECTOR_POSITIONS: any[] = [
  { top: '100%', left: '0%', right: '0%', bottom: '0%'},
  { top: '20%', left: '0%', right: '0%', bottom: '0%' }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getManualPositionTrigger(CONTROL_BUTTON_POSITIONS[0], CONTROL_BUTTON_POSITIONS[1], 
                                        'center', AnimationPeriods.short),
    Animations.getManualPositionTrigger(SELECTOR_POSITIONS[0], SELECTOR_POSITIONS[1], 
                                        'selector', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[1],
                                        'cloud_btn_1', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[2],
                                        'cloud_btn_2', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[3],
                                        'cloud_btn_3', AnimationPeriods.short),
    Animations.getManualPositionTrigger(CLOUD_BUTTON_POSITIONS[0], CLOUD_BUTTON_POSITIONS[4],
                                        'cloud_btn_4', AnimationPeriods.short),
    Animations.getManualFadeTrigger()
  ]
})
export class HomeComponent implements OnInit {

  public cloudFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);
  public cloudPositionCntls: AnimationControl[] = [
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
    new AnimationControl(AnimationTriggers.cntl_position),
  ];

  public centerPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);
  public centerFadeCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_fade);

  public selectorPositionCntl: AnimationControl = new AnimationControl(AnimationTriggers.cntl_position);

  ngOnInit(): void { 
    this.cloudFadeCntl.setState(FadeStates.out);
  }

  public display(){
    this.centerPositionCntl.animate();
    this.selectorPositionCntl.animate();
    setTimeout(()=>{
      this.centerFadeCntl.animate();
      this.cloudFadeCntl.prime();
      setTimeout(()=>{
        this.cloudPositionCntls.forEach((cntl: AnimationControl)=>{ cntl.animate(); });
      }, AnimationPeriods.medium*500)
    }, AnimationPeriods.short*1000);
  }

}
