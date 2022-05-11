import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface Position {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface KeyObject {
  [key: string]: any;
}

export enum BinaryState {
  on = 'on',
  off = 'off',
}

export enum PositionStates {
  moved = 'moved',
  unmoved = 'unmoved',
}

export enum SwipeStates {
  unmoved = 'unmoved',
  swipe_left = 'swipe_left',
  swipe_right = 'swipe_right',
  unswipe_left = 'unswipe_left',
  unswipe_right = 'unswipe_right',
}

export enum AnimationTriggers {
  expand = 'expand',
  enlarge = 'enlarge',
  scale = 'scale',
  highlight = 'highlight',
  fade = 'fade',
  slide = 'slide',
  float = 'float',
  cntl_swipe = 'cntl_swipe',
  cntl_fade = 'cntl_fade',
  cntl_expand = 'cntl_expand',
  cntl_enlarge = 'cntl_enlarge',
  cntl_dilate = 'cntl_dilate',
  cntl_highlight = 'cntl_highlight',
  cntl_scale = 'cntl_scale',
  cntl_position = 'cntl_position',
  cntl_skew = 'cntl_skew',
  cntl_flip = 'cntl_flip',
}

export enum AnimationPeriods {
  short = 0.5,
  medium = 1,
  long = 2,
}


function validatePosition(position: Position): KeyObject {
  let parsed_position: KeyObject = {};
  if (position.top) {
    parsed_position.top = position.top;
  }
  if (position.bottom) {
    parsed_position.bottom = position.bottom;
  }
  if (position.left) {
    parsed_position.left = position.left;
  }
  if (position.right) {
    parsed_position.right = position.right;
  }
  return parsed_position;
}

function formatTriggerTag(trigger: string, tag: string | null | undefined) {
  return tag ? `${trigger}_${tag}` : trigger;
}

export class Animations {
  
  public static getManualScaleTrigger(
    scaleFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag: string = formatTriggerTag(
      AnimationTriggers.cntl_scale,
      tag
    );

    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          transform: `scale(${scaleFactor}, ${scaleFactor})`,
        })
      ),
      transition(`void <=> ${BinaryState.on}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualSkewTrigger(
    skewFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_scale, tag);

    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          transform: `skew(${skewFactor}deg, ${skewFactor}deg)`,
        })
      ),
      transition(`void <=> ${BinaryState.on}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualHighlightTrigger(
    highlightFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_highlight, tag);

    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          filter: `brightness(${highlightFactor})`,
        })
      ),
      transition(`void <=> ${BinaryState.on}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualFadeTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_fade, tag);
    return trigger(triggerTag, [
      state(
        BinaryState.off,
        style({
          opacity: 1,
        })
      ),
      state(
        BinaryState.on,
        style({
          opacity: 0,
        })
      ),
      transition(`${BinaryState.on} <=> ${BinaryState.off}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualExpandTrigger(
    toHeight: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_expand, tag);
    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          height: `${toHeight}`,
          opacity: 1,
        })
      ),
      state(
        BinaryState.off,
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition(`${BinaryState.on} <=> ${BinaryState.off}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualEnlargeTrigger(
    fromWidth: string,
    toWidth: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_enlarge, tag);

    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          width: `${toWidth}`,
        })
      ),
      state(
        BinaryState.off,
        style({
          width: `${fromWidth}`,
        })
      ),
      transition(`${BinaryState.on} <=> ${BinaryState.off}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualDilateTrigger(
    toHeight: string,
    toWidth: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_dilate, tag);

    return trigger(triggerTag, [
      state(
        BinaryState.on,
        style({
          height: `${toHeight}`,
          width: `${toWidth}`,
          opacity: 1,
        })
      ),
      state(
        BinaryState.off,
        style({
          height: '0',
          width: '0',
          opacity: 0,
        })
      ),
      transition(`* <=> ${BinaryState.off}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualPositionTrigger(
    start: Position,
    positions: Position[],
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_position, tag);
    let triggerConfig: any[] = [];
    let validatedStart = validatePosition(start);

    triggerConfig.push(
      state(`${PositionStates.unmoved}`, style(validatedStart))
    );

    positions.forEach((pos, ind) => {
      let validatedPosition = validatePosition(pos);
      triggerConfig.push(
        state(`${PositionStates.moved}_${ind}`, style(validatedPosition))
      );
    });
    positions.forEach((pos, ind) => {
      triggerConfig.push(
        transition(`${PositionStates.moved}_${ind} => *`, [
          animate(`${animateLength}s`),
          query('@*', animateChild(), { optional: true }),
        ])
      );
    });
    triggerConfig.push(
      transition(`${PositionStates.unmoved} => *`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ])
    );
    triggerConfig.push(transition(':leave', []));
    return trigger(triggerTag, triggerConfig);
  }

  public static getManualFullSwipeTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_swipe, tag);
    return trigger(triggerTag, [
      transition(`* => ${SwipeStates.swipe_left}`, [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
            style({ transform: 'translateX(-200%)', opacity: 0, offset: 0.5 }),
            style({ transform: 'translateX(200%)', opacity: 0, offset: 0.51 }),
            style({ transform: 'translateX(0)', opacity: 1, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
      transition(`* => ${SwipeStates.swipe_right}`, [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ transform: 'translateX(0)', opacity: 1, offset: 0 }),
            style({ transform: 'translateX(200%)', opacity: 0, offset: 0.5 }),
            style({ transform: 'translateX(-200%)', opacity: 0, offset: 0.51 }),
            style({ transform: 'translateX(0)', opacity: 1, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getManualFlipTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_flip, tag);
    return trigger(triggerTag, [
      state(
        BinaryState.off,
        style({
          transform: 'none',
        })
      ),
      state(
        BinaryState.on,
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition(`${BinaryState.on} <=> ${BinaryState.off}`, [
        animate(`${animateLength}s`),
      ])
    ]);
  }

  public static getSlideTrigger(
    reversed: boolean = false,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.slide, tag);

    let first_reversal: string = reversed ? '' : '-';
    let second_reversal: string = reversed ? '-' : '';

    return trigger(triggerTag, [
      transition(
        ':enter',
        animate(
          `${animateLength}s`,
          keyframes([
            style({
              transform: `translateX(${first_reversal}150%)`,
              offset: 0,
            }),
            style({
              transform: `translateX(${first_reversal}110%)`,
              offset: 0.25,
            }),
            style({
              transform: `translateX(${first_reversal}70%)`,
              offset: 0.5,
            }),
            style({
              transform: `translateX(${first_reversal}30%)`,
              offset: 0.75,
            }),
            style({ transform: 'translateX(0%)', offset: 1 }),
          ])
        )
      ),
      transition(
        ':leave',
        animate(
          `${animateLength}s`,
          keyframes([
            style({
              transform: `translateX(${second_reversal}150%)`,
              offset: 0,
            }),
            style({
              transform: `translateX(${second_reversal}110%)`,
              offset: 0.25,
            }),
            style({
              transform: `translateX(${second_reversal}70%)`,
              offset: 0.5,
            }),
            style({
              transform: `translateX(${second_reversal}30%)`,
              offset: 0.75,
            }),
            style({ transform: `translateX(${second_reversal}0%)`, offset: 1 }),
          ])
        )
      ),
    ]);
  }

  public static getFloatTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.float, tag);

    return trigger(triggerTag, [
      transition(
        ':leave',
        animate(
          `${animateLength}s`,
          keyframes([
            style({ transform: 'translateY(-100%)', offset: 0 }),
            style({ transform: 'translateY(-75%)', offset: 0.25 }),
            style({ transform: 'translateY(-50%)', offset: 0.5 }),
            style({ transform: 'translateY(-25%)', offset: 0.75 }),
            style({ transform: 'translateY(0%)', offset: 1 }),
          ])
        )
      ),
      transition(
        ':enter',
        animate(
          `${animateLength}s`,
          keyframes([
            style({ transform: 'translateY(100%)', offset: 0 }),
            style({ transform: 'translateY(75%)', offset: 0.25 }),
            style({ transform: 'translateY(50%)', offset: 0.5 }),
            style({ transform: 'translateY(25%)', offset: 0.75 }),
            style({ transform: 'translateY(0%)', offset: 1 }),
          ])
        )
      ),
    ]);
  }

  public static getExpandTrigger(
    toHeight: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag: string = formatTriggerTag(AnimationTriggers.expand, tag);

    return trigger(triggerTag, [
      transition(':enter', [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ height: '0%', offset: 0 }),
            style({ height: `${toHeight}`, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
      transition(':leave', [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ height: `${toHeight}`, offset: 0 }),
            style({ height: 0, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getEnlargeTrigger(
    toWidth: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.enlarge, tag);

    return trigger(triggerTag, [
      transition(':enter', [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ width: '0%', offset: 0 }),
            style({ width: `${toWidth}`, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
      transition(':leave', [
        animate(`${animateLength}s`, style({ width: 0 })),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getFadeTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.fade, tag);

    return trigger(triggerTag, [
      transition(':enter', [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 1, offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
      transition(':leave', [
        animate(`${animateLength}s`, style({ opacity: 0 })),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  public static getScaleTrigger(
    scaleFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.scale, tag);

    return trigger(triggerTag, [
      transition(`:enter`, [
        animate(
          `${animateLength}s`,
          keyframes([
            style({ transform: 'scale(0, 0)', offset: 0 }),
            style({
              transform: `scale(${scaleFactor}, ${scaleFactor})`,
              offset: 1,
            }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
      transition(`:leave`, [
        animate(
          `${animateLength}s`,
          keyframes([
            style({
              transform: `scale(${scaleFactor}, ${scaleFactor})`,
              offset: 0,
            }),
            style({ transform: 'scale(0, 0)', offset: 1 }),
          ])
        ),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }
}

export class AnimationControl {
  public binaryTriggers: any[]= [
    AnimationTriggers.cntl_expand,
    AnimationTriggers.cntl_enlarge,
    AnimationTriggers.cntl_dilate,
    AnimationTriggers.cntl_highlight,
    AnimationTriggers.cntl_scale,
    AnimationTriggers.cntl_fade,
    AnimationTriggers.cntl_skew,
    AnimationTriggers.cntl_flip
  ]
  public stateTriggers: any[] = [
    AnimationTriggers.cntl_swipe,
    AnimationTriggers.cntl_position,
  ]
  public animationType: AnimationTriggers;
  public state!: string;

  constructor(type: AnimationTriggers) {
    this.animationType = type;
    this.prime();
  }

  public animate() {
    if(this.binaryTriggers.includes(this.animationType)){
      this.state = BinaryState.on;
    }
    else{
      switch (this.animationType) {
        case AnimationTriggers.cntl_position:
          this.state = PositionStates.moved;
          break;
      } 
    }
  }

  public prime(): void {
    if(this.binaryTriggers.includes(this.animationType)){
      this.state = BinaryState.off;
    }
    else{
      switch (this.animationType) {
        case AnimationTriggers.cntl_position:
          this.state = PositionStates.unmoved;
          break;
        case AnimationTriggers.cntl_swipe:
          this.state = SwipeStates.unmoved;
          break;
      }
    }
  }

  public fired(): boolean {
    if(this.binaryTriggers.includes(this.animationType)){
      return this.state !== BinaryState.off;
    }
    else{
      switch (this.animationType){
        case AnimationTriggers.cntl_position:
          return this.state !== PositionStates.unmoved;
        case AnimationTriggers.cntl_swipe:
          return this.state !== SwipeStates.unmoved;
      }
    }
    return false;
  }

  public animatePosition(positionIndex: number) {
    this.state = `${PositionStates.moved}_${positionIndex}`;
  }

  public swipe(direction: SwipeStates) {
    this.state = direction;
  }

  public setState(newState: string): void {
    this.state = newState;
  }
}
