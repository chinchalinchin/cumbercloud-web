import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from "@angular/animations";

interface KeyObject{
    [key: string]: any
}

function validatePosition(position: Position): KeyObject{
    let parsed_position: KeyObject = {};
    if(position.top){ parsed_position.top = position.top; };
    if(position.bottom){ parsed_position.bottom = position.bottom; };
    if(position.left){ parsed_position.left = position.left; };
    if(position.right){ parsed_position.right = position.right; };
    return parsed_position;
}

export interface Position{
    top?: string, bottom?: string,
    left?: string, right?: string,
}
/**
 * Enumeration of {@link Animations} expand animation states.
 */
export enum ExpandStates{  open="open", closed="closed" }
/**
 * 
 */
export enum PositionStates { moved="moved", unmoved="unmoved"}
/**
 * Enumeration of {@link Animations} scale animation states
 */
export enum ScaleStates{  scale="scale", normal="normal" }
/**
 * Enumeration of {@link Animations} highlight states
 */
export enum HighlightStates{  highlight="highlight", normal="normal"  }
/**
 * Enumeration of {@link Animations} fade states
 */
export enum FadeStates { in="in", out="out" }
/**
 * Enumeration of triggers for {@link Animations}.
 */
export enum AnimationTriggers{
    expand="expand", scale="scale", highlight="highlight", 
    fade="fade", slide="slide", float="float",
    cntl_fade="cntl_fade", cntl_expand="cntl_expand",
    cntl_highlight="cntl_highlight", cntl_scale="cntl_scale",
    cntl_fold="cntl_fold", cntl_position="cntl_position"
}
/**
 * Enumeration of animation lengths for {@link Animations}
 */
export enum AnimationPeriods{
    short=0.5, medium=1,long=2
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
export class Animations{
    /**
     * # Description
     * Get animation trigger for scaling an element by a given factor over a specified time period
     * @param scaleFactor scale factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation scale trigger
     */
    public static getManualScaleTrigger(scaleFactor: number, animateLength: number = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.cntl_scale, [
            state(ScaleStates.scale, style({
                transform: `scale(${scaleFactor}, ${scaleFactor})`
            })),
            transition(`void <=> ${ScaleStates.scale}`, [
                animate(`${animateLength}s`)
            ]),
            
        ])
    }

    /**
     * # Description
     * Get animation trigger for highlighting an element by a given factor over a specified time period.
     * @param scaleFactor highlight factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.).Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation scale trigger
     */
     public static getManualHighlightTrigger(highlightFactor: number, animateLength: number = AnimationPeriods.short)
     : AnimationTriggerMetadata {
         return trigger(AnimationTriggers.cntl_highlight, [
             state(HighlightStates.highlight, style({
                 filter: `brightness(${highlightFactor})`
             })),
             transition(`void <=> ${ScaleStates.scale}`, [
                 animate(`${animateLength}s`)
             ])
         ])
     }

     /**
      * # Description
      * Get animation trigger for fading an element's opacity in and out over a specified time period.
      * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
      * @returns animation fade trigger
      */
     public static getManualFadeTrigger(animateLength: number = AnimationPeriods.medium)
     : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.cntl_fade, [
            state(FadeStates.in, style({
                opacity: 1
            })),
            state(FadeStates.out, style({
                opacity: 0
            })),
            transition(`${FadeStates.in} <=> ${FadeStates.out}`, [
                animate(`${animateLength}s`)
            ])
        ])
     }

    /**
     * # Description
     * Get animation trigger for expanding an element to a given height over a specific time period.
     * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation expand trigger
     */
     public static getManualFoldTrigger(toHeight: string, animateLength: number = AnimationPeriods.short)
     : AnimationTriggerMetadata {
         return trigger(AnimationTriggers.cntl_fold,[
             state(ExpandStates.open, style({ 
                 height: `${toHeight}`, opacity: 1
             })),
             state(ExpandStates.closed, style({ 
                 height: '0', opacity: 0 
             })),
             transition(`${ExpandStates.open} <=> ${ExpandStates.closed}`,[
                 animate(`${animateLength}s`)
             ])
         ])
     }

     /**
     * # Description
     * Get animation trigger for expanding an element to a given height over a specific time period.
     * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation expand trigger
     */
    public static getManualExpandTrigger(toHeight: string, toWidth: string, animateLength: number = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.cntl_expand,[
            state(ExpandStates.open, style({ 
                height: `${toHeight}`, width: `${toWidth}`, opacity: 1
            })),
            state(ExpandStates.closed, style({ 
                height: '0', width: '0', opacity: 0 
            })),
            transition(`${ExpandStates.open} <=> ${ExpandStates.closed}`,[
                animate(`${animateLength}s`)
            ])
        ])
    }

    /**
     * # Description
     */
     public static getManualPositionTrigger(startPosition: Position, endPosition: Position, tag: string, animateLength: number = AnimationPeriods.short)
     : AnimationTriggerMetadata {
         let start_style: KeyObject = validatePosition(startPosition);
         let end_style: KeyObject = validatePosition(endPosition);
         return trigger(`${AnimationTriggers.cntl_position}_${tag}`,[
             state(PositionStates.moved, style(end_style)),
             state(PositionStates.unmoved, style(start_style)),
             transition(`${PositionStates.moved} <=> ${PositionStates.unmoved}`,[
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
    public static getSlideTrigger(animateLength: number = AnimationPeriods.medium)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.slide, [
          transition(':enter',
              animate(`${animateLength}s`, keyframes([
                  style({ transform: 'translateX(-100%)', offset: 0}),
                  style({ transform: 'translateX(-75%)', offset: 0.25}),
                  style({ transform: 'translateX(-50%)', offset: 0.50}),
                  style({ transform: 'translateX(-25%)', offset: 0.75}),
                  style({ transform: 'translateX(0%)', offset: 1})
              ]))
          ),
          transition(':leave', 
              animate(`${animateLength}s`, keyframes([
                  style({ transform: 'translateX(100%)', offset: 0}),
                  style({ transform: 'translateX(75%)', offset: 0.25}),
                  style({ transform: 'translateX(50%)', offset: 0.50}),
                  style({ transform: 'translateX(25%)', offset: 0.75}),
                  style({ transform: 'translateX(0%)', offset: 1}) 
              ]))
          )
    ])
    }

    /**
     * # Description
     * Get animation trigger for floating an element vertically on and off screen over a specified time period. 
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation float trigger
     */
    public static getFloatTrigger(animateLength: number = AnimationPeriods.medium)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.float, [
            transition(':leave',
                animate(`${animateLength}s`, keyframes([
                    style({ transform: 'translateY(-100%)', offset: 0}),
                    style({ transform: 'translateY(-75%)', offset: 0.25}),
                    style({ transform: 'translateY(-50%)', offset: 0.50}),
                    style({ transform: 'translateY(-25%)', offset: 0.75}),
                    style({ transform: 'translateY(0%)', offset: 1})
                ]))
            ),
            transition(':enter', 
                animate(`${animateLength}s`, keyframes([
                    style({ transform: 'translateY(100%)', offset: 0}),
                    style({ transform: 'translateY(75%)', offset: 0.25}),
                    style({ transform: 'translateY(50%)', offset: 0.50}),
                    style({ transform: 'translateY(25%)', offset: 0.75}),
                    style({ transform: 'translateY(0%)', offset: 1}) 
                ]))
            )
      ])
    }

    /**
     * # Description
     * Get animation trigger for expanding an element to a given height over a specific time period.
     * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
     * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
     * @returns animation expand trigger
     */
     public static getExpandTrigger(toHeight: string, animateLength: number = AnimationPeriods.short)
     : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.expand,[
          transition(':enter',[
              animate(`${animateLength}s`, style({  height: `${toHeight}`}))
          ]),
          transition(':leave',[
              animate(`${animateLength}s`, style({  height: 0 }))
          ])
        ])
      }

     /**
      * # Description
      * Get animation trigger for fading an element's opacity in and out over a specified time period.
      * @param animateLength animation length expressed in seconds (e.g. 0.5, 1, 2, etc.). Common constants are statically accessible through {@link AnimationPeriods}.
      * @returns animation fade trigger
      */
      public static getFadeTrigger(animateLength: number = AnimationPeriods.medium)
      : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.fade, [
          transition(':enter',[
              animate(`${animateLength}s`, style({  opacity: 1}))
          ]),
          transition(':leave',[
              animate(`${animateLength}s`, style({  opacity: 0 }))
          ])
        ])
      }
}

/**
 * # Description
 * Class for handling the state of an animated HTML element. See {@link Animations} for example usage.
 */
export class AnimationControl{
    public animationType : AnimationTriggers;
    public state !: string;

    constructor(type: AnimationTriggers){
        this.animationType = type;
        this.prime();
    }

    /**
     * Trigger {@link AnimationControl} by switching the appropriate {@link state} based on the {@link animationType}
     */
    public animate() { 
        switch(this.animationType){
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
        }
    }

    /**
     * Return {@link AnimationControl} to its initial {@link state} and prime for another animation based on the {@link animationType}
     */
    public prime(){
        switch(this.animationType){
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

        }
    }

    /**
     * # Description
     * Sets {@link AnimationControl} to new {@link state}. The {@link state} must match the {@link animationType}, i.e. if `animationType=='highlight'`, then the allowable values of {@link state} are `highlight` and `normal`. Animation states are enumeration through exported `enum`s of the *animations.ts* module.
     * @param newState animation state
     */
    public setState(newState: string): void { this.state = newState; }
}