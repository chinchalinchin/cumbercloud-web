import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Animations } from 'src/animations';
import {
  ADDON_PRICING_CONFIG,
  ANALYTICS_PRICING_CONFIG,
  CORE_PRICING_CONFIG,
  PricingConfig,
} from '../../../app.config';
import { RateEvent } from '../rate/rate.component';

enum ButtonStyle {
  primary = 'primary',
  accent = 'accent',
  none = '',
}

enum PricingGroups {
  core = 'core',
  addon = 'addon',
  analytics = 'analytics',
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  animations: [
    Animations.getExpandTrigger('100%', 'full'),
    Animations.getExpandTrigger('67.5%', 'popup'),
  ],
})
export class PricingComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  public focusing: boolean = false;
  public focus?: PricingGroups;
  public calculated: boolean = false;
  public coreConfig: PricingConfig[] = CORE_PRICING_CONFIG;
  public addOnConfig: PricingConfig[] = ADDON_PRICING_CONFIG;
  public analyticsConfig: PricingConfig[] = ANALYTICS_PRICING_CONFIG;
  public enabledConfig: PricingConfig[] = [];
  public enabledCalc: RateEvent[] = [];
  public buttonStyle: ButtonStyle = ButtonStyle.none;
  public pricingGroups: any = PricingGroups;
  public coreFormGroup: FormGroup;
  public coreChecked: number = 0;
  public addOnFormGroup: FormGroup;
  public addOnChecked: number = 0;
  public analyticsFormGroup: FormGroup;
  public analyticsChecked: number = 0;
  public total: number = 0;

  constructor(
    private _forms: FormBuilder,
    private _ga: GoogleAnalyticsService
  ) {
    this.coreFormGroup = this._forms.group({});
    this.addOnFormGroup = this._forms.group({});
    this.analyticsFormGroup = this._forms.group({});
    this.coreConfig.forEach((conf: PricingConfig) => {
      this.coreFormGroup.addControl(conf.key, this._forms.control(false));
    });
    this.addOnConfig.forEach((conf: PricingConfig) => {
      this.addOnFormGroup.addControl(conf.key, this._forms.control(false));
    });
    this.analyticsConfig.forEach((conf: PricingConfig) => {
      this.analyticsFormGroup.addControl(conf.key, this._forms.control(false));
    });
  }

  private parseEnabledCalculations(): void {
    this.coreConfig.forEach((conf: PricingConfig) => {
      if (this.coreFormGroup.controls[conf.key]?.value) {
        this.enabledConfig.push(conf);
      }
    });
    this.addOnConfig.forEach((conf: PricingConfig) => {
      if (this.addOnFormGroup.controls[conf.key]?.value) {
        this.enabledConfig.push(conf);
      }
    });
    this.analyticsConfig.forEach((conf: PricingConfig) => {
      if (this.analyticsFormGroup.controls[conf.key]?.value) {
        this.enabledConfig.push(conf);
      }
    });
  }

  private calculateOverallTotal(): void {
    this.total = 0;
    this.enabledCalc.forEach((info: RateEvent) => {
      this.total = this.total + info.total;
    });
  }

  public appendToCalculation(event: RateEvent): void {
    let search_index: number = this.enabledCalc.findIndex(
      (enabled_event) => enabled_event.key === event.key
    );
    if (search_index > -1) {
      this.enabledCalc[search_index] = event;
    } else {
      this.enabledCalc.push(event);
    }
    this.calculateOverallTotal();
  }

  public groupField(group: PricingGroups, field: string): boolean {
    switch (group) {
      case this.pricingGroups.core:
        return this.coreFormGroup.controls[field]?.value;
      case this.pricingGroups.addon:
        return this.addOnFormGroup.controls[field]?.value;
      case this.pricingGroups.analytics:
        return this.analyticsFormGroup.controls[field]?.value;
      default:
        return false;
    }
  }

  public renderBadges(group: PricingGroups) {
    switch (group) {
      case this.pricingGroups.core:
        this.coreChecked = 0;
        Object.keys(this.coreFormGroup.controls).forEach((key: string) => {
          if (this.coreFormGroup.controls[key].value) {
            this.coreChecked++;
          }
        });
        break;
      case this.pricingGroups.addon:
        this.addOnChecked = 0;
        Object.keys(this.addOnFormGroup.controls).forEach((key: string) => {
          if (this.addOnFormGroup.controls[key].value) {
            this.addOnChecked++;
          }
        });
        break;
      case this.pricingGroups.analytics:
        this.analyticsChecked = 0;
        Object.keys(this.analyticsFormGroup.controls).forEach((key: string) => {
          if (this.analyticsFormGroup.controls[key].value) {
            this.analyticsChecked++;
          }
        });
        break;
    }
  }

  public toggleButtonStyle(): void {
    if (this.buttonStyle === ButtonStyle.none) {
      this.buttonStyle = ButtonStyle.accent;
    } else if (this.buttonStyle === ButtonStyle.accent) {
      this.buttonStyle = ButtonStyle.none;
    }
  }

  public focused(group: PricingGroups): boolean {
    return group === this.focus;
  }

  public setFocus(group: PricingGroups): void {
    this.focusing = true;
    this.focus = group;
    this._ga.event('pricing', 'expansion', group.toString());
  }

  public removeFocus(): void {
    this.focusing = false;
    this.focus = undefined;
  }

  public calculate(): void {
    this.parseEnabledCalculations();
    this.calculated = true;
  }

  public uncalculate(): void {
    this.enabledConfig = [];
    this.enabledCalc = [];
    this.calculated = false;
    this.coreChecked = 0;
    this.addOnChecked = 0;
    this.analyticsChecked = 0;
    this.total = 0;
    this.coreFormGroup.reset();
    this.addOnFormGroup.reset();
    this.analyticsFormGroup.reset();
    this.accordion.closeAll();
  }
}
