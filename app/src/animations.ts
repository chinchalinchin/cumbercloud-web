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

export interface Position {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface KeyObject {
  [key: string]: any;
}

/////////////////////////////////////////////////////////////////////////////////////
// TODO : It would be easier to just use a catchall binary variable for all of these...
export enum BinaryState {
  on = 'on',
  off = 'off',
}
// TODO: ^^^
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Enumeration of {@link Animations} expand animation states.
 */
export enum ExpandStates {
  open = 'open',
  closed = 'closed',
}
/**
 *
 */
export enum PositionStates {
  moved = 'moved',
  unmoved = 'unmoved',
}
/**
 * Enumeration of {@link Animations} scale animation states
 */
export enum ScaleStates {
  scale = 'scale',
  normal = 'normal',
}
/**
 * Enumeration of {@link Animations} highlight states
 */
export enum HighlightStates {
  highlight = 'highlight',
  normal = 'normal',
}
/**
 * Enumeration of {@link Animations} fade states
 */
export enum FadeStates {
  in = 'in',
  out = 'out',
}
/**
 * Enumeration of {@link Animations} fade states
 */
export enum SkewStates {
  skewed = 'skewed',
  normal = 'normal',
}

/**
 * Enumeration of {@link Animations} swip states
 */
export enum SwipeStates {
  unmoved = 'unmoved',
  swipe_left = 'swipe_left',
  swipe_right = 'swipe_right',
  unswipe_left = 'unswipe_left',
  unswipe_right = 'unswipe_right',
}

/**
 * Enumeration of {@link Animation} flip states
 */
export enum FlipStates{
  flip="flip",
  unflip="unflip"
}
/**
 * Enumeration of triggers for {@link Animations}.
 */
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
  cntl_highlight = 'cntl_highlight',
  cntl_scale = 'cntl_scale',
  cntl_fold = 'cntl_fold',
  cntl_position = 'cntl_position',
  cntl_skew = 'cntl_skew',
  cntl_flip = 'cntl_flip'
}
/**
 * Enumeration of animation lengths for {@link Animations}
 */
export enum AnimationPeriods {
  short = 0.5,
  medium = 1,
  long = 2,
}

/**
 * # Animations
 * ## Description
 * Static factory for `AnimationTriggerMetaData`
 * ## Example Usage
 * Use static functions within this class in the `animations` attribute of the `@Component` annotation of an **Angular** Component to register animations with the template, i.e.,
 * ```typescript
 * @Component({
 *  selector: 'app-component',
 *  templateUrl: './component.component.html',
 *  styleUrls: ['./component.component.css'],
 *  animations: [
 *      Animations.getExpandTrigger('5%')
 *  ]
 * })
 * ```
 * This will expose the animation directive in the Component template HTML. Before using the directive, define a control variable using {@link AnimationControl} within the Component typescript class to bind to the directive,
 * ```javascript
 * export class Component{
 *  public animation: AnimationControl = new AnimationControl(AnimationTriggers.expand)
 *  # ...
 * }
 * ```
 * Then, to invoke the animation, add the directive to an HTML element and bind it to the `state` of the {@link AnimationControl},
 * ```html
 * <app-component [@expand]="animation.state"></app-component>
 * ```
 * Changing the state of the {@link AnimationControl} will cause the animation to fire. States are enumerated through exported `enum`s within the *animations.ts* module.
 */
export class Animations {
  /**
   * # Description
   * Get animation trigger for scaling an element by a given factor over a specified time period
   * @param scaleFactor scale factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation scale trigger
   */
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
        ScaleStates.scale,
        style({
          transform: `scale(${scaleFactor}, ${scaleFactor})`,
        })
      ),
      transition(`void <=> ${ScaleStates.scale}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for skewing an element by a given factor over a specified time period
   * @param skewFactor skew factor expressed as an angle measured in degrees
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation skew trigger
   */
  public static getManualSkewTrigger(
    skewFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_scale, tag);

    return trigger(triggerTag, [
      state(
        ScaleStates.scale,
        style({
          transform: `skew(${skewFactor}deg, ${skewFactor}deg)`,
        })
      ),
      transition(`void <=> ${ScaleStates.scale}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for highlighting an element by a given factor over a specified time period.
   * @param scaleFactor highlight factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.).Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation scale trigger
   */
  public static getManualHighlightTrigger(
    highlightFactor: number,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_highlight, tag);

    return trigger(triggerTag, [
      state(
        HighlightStates.highlight,
        style({
          filter: `brightness(${highlightFactor})`,
        })
      ),
      transition(`void <=> ${ScaleStates.scale}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for fading an element's opacity in and out over a specified time period.
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation fade trigger
   */
  public static getManualFadeTrigger(
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.medium
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_fade, tag);
    return trigger(triggerTag, [
      state(
        FadeStates.in,
        style({
          opacity: 1,
        })
      ),
      state(
        FadeStates.out,
        style({
          opacity: 0,
        })
      ),
      transition(`${FadeStates.in} <=> ${FadeStates.out}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for expanding an element to a given height over a specific time period.
   * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation expand trigger
   */
  public static getManualFoldTrigger(
    toHeight: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_fold, tag);
    return trigger(AnimationTriggers.cntl_fold, [
      state(
        ExpandStates.open,
        style({
          height: `${toHeight}`,
          opacity: 1,
        })
      ),
      state(
        ExpandStates.closed,
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition(`${ExpandStates.open} <=> ${ExpandStates.closed}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for expanding an element to a given height over a specific time period.
   * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation expand trigger
   */
  public static getManualExpandTrigger(
    toHeight: string,
    toWidth: string,
    tag: string | null | undefined = null,
    animateLength: number = AnimationPeriods.short
  ): AnimationTriggerMetadata {
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_expand, tag);

    return trigger(triggerTag, [
      state(
        ExpandStates.open,
        style({
          height: `${toHeight}`,
          width: `${toWidth}`,
          opacity: 1,
        })
      ),
      state(
        ExpandStates.closed,
        style({
          height: '0',
          width: '0',
          opacity: 0,
        })
      ),
      transition(`* <=> ${ExpandStates.closed}`, [
        animate(`${animateLength}s`),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   */
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
  ): AnimationTriggerMetadata{
    let triggerTag = formatTriggerTag(AnimationTriggers.cntl_flip, tag)
    return trigger(triggerTag, [
      state(FlipStates.unflip, style({
        transform: 'none'
      })),
      state(FlipStates.flip, style({
        transform: 'rotateY(180deg)'
      })),
      transition(`${FlipStates.unflip} => ${FlipStates.flip}`, [
        animate(`${animateLength}s`)
      ]),
      transition(`${FlipStates.flip} => ${FlipStates.unflip}`, [
        animate(`${animateLength}s`)
      ])
    ])
  }

  /**
   * # Description
   * Get animation trigger for sliding an element horizontally on and off screen over a specified time period.
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation slide trigger
   */
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

  /**
   * # Description
   * Get animation trigger for floating an element vertically on and off screen over a specified time period.
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation float trigger
   */
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

  /**
   * # Description
   * Get animation trigger for expanding an element to a given height over a specific time period.
   * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation expand trigger
   */
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
        animate(`${animateLength}s`, style({ height: 0 })),
        query('@*', animateChild(), { optional: true }),
      ]),
    ]);
  }

  /**
   * # Description
   * Get animation trigger for expanding an element to a given width over a specific time period.
   * @param toWidth width expressed in CSS units (e.g. %, px, em, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation expand trigger
   */
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

  /**
   * # Description
   * Get animation trigger for fading an element's opacity in and out over a specified time period.
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation fade trigger
   */
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

  /**
   * # Description
   * Get animation trigger for scaling an element by a given factor over a specified time period
   * @param scaleFactor scale factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
   * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
   * @returns animation scale trigger
   */
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

/**
 * # Description
 * Class for handling the state of an animated HTML element. See {@link Animations} for example usage.
 */
export class AnimationControl {
  public animationType: AnimationTriggers;
  public state!: string;

  constructor(type: AnimationTriggers) {
    this.animationType = type;
    this.prime();
  }

  /**
   * Trigger {@link AnimationControl} by switching the appropriate {@link state} based on the {@link animationType}
   */
  public animate() {
    switch (this.animationType) {
      case AnimationTriggers.cntl_expand:
        this.state = ExpandStates.open;
        break;
      case AnimationTriggers.cntl_highlight:
        this.state = HighlightStates.highlight;
        break;
      case AnimationTriggers.cntl_scale:
        this.state = ScaleStates.scale;
        break;
      case AnimationTriggers.cntl_fade:
        this.state = FadeStates.out;
        break;
      case AnimationTriggers.cntl_position:
        this.state = PositionStates.moved;
        break;
      case AnimationTriggers.cntl_skew:
        this.state = SkewStates.skewed;
        break;
      case AnimationTriggers.cntl_flip:
        this.state = FlipStates.flip;
    }
  }

  public animatePosition(positionIndex: number) {
    this.state = `${PositionStates.moved}_${positionIndex}`;
  }

  public swipe(direction: SwipeStates) {
    this.state = direction;
  }

  /**
   * Return {@link AnimationControl} to its initial {@link state} and prime for another animation based on the {@link animationType}
   */
  public prime() {
    switch (this.animationType) {
      case AnimationTriggers.cntl_expand:
        this.state = ExpandStates.closed;
        break;
      case AnimationTriggers.cntl_highlight:
        this.state = HighlightStates.normal;
        break;
      case AnimationTriggers.cntl_scale:
        this.state = ScaleStates.normal;
        break;
      case AnimationTriggers.cntl_fade:
        this.state = FadeStates.in;
        break;
      case AnimationTriggers.cntl_position:
        this.state = PositionStates.unmoved;
        break;
      case AnimationTriggers.cntl_skew:
        this.state = SkewStates.normal;
        break;
      case AnimationTriggers.cntl_swipe:
        this.state = SwipeStates.unmoved;
        break;
      case AnimationTriggers.cntl_flip:
        this.state = FlipStates.unflip;
        break;
    }
  }

  /**
   * # Description
   * Sets {@link AnimationControl} to new {@link state}. The {@link state} must match the {@link animationType}, i.e. if `animationType=='highlight'`, then the allowable values of {@link state} are `highlight` and `normal`. Animation states are enumeration through exported `enum`s of the *animations.ts* module.
   * @param newState animation state
   */
  public setState(newState: string): void {
    this.state = newState;
  }
}
