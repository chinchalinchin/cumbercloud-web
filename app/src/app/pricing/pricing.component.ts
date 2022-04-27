import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Animations } from 'src/animations';
import { ADDON_PRICING_CONFIG, ANALYTICS_PRICING_CONFIG, CORE_PRICING_CONFIG, Pricing } from '../app.config';
import { RateEvent } from './rate/rate.component';

enum ButtonStyle{
  primary="primary", accent="accent", none=""
}

enum PricingGroups{
  core="core",addon="addon",analytics="analytics"
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  animations: [
    Animations.getExpandTrigger('100%', 'full'),
    Animations.getExpandTrigger('67.5%', 'popup')
  ]
})
export class PricingComponent{
  public focusing: boolean = false;
  public focus?: PricingGroups;
  public calculated: boolean = false;
  public coreConfig : Pricing[] = CORE_PRICING_CONFIG;
  public addOnConfig: Pricing[] = ADDON_PRICING_CONFIG;
  public analyticsConfig: Pricing[] = ANALYTICS_PRICING_CONFIG;
  public enabledConfig: Pricing[] = [];
  public enabledCalc: RateEvent[] = [];
  public buttonStyle: ButtonStyle = ButtonStyle.none;
  public pricingGroups: any = PricingGroups; 
  public coreFormGroup : FormGroup;
  public coreChecked: number = 0
  public addOnFormGroup: FormGroup;
  public addOnChecked : number = 0;
  public analyticsFormGroup: FormGroup;
  public analyticsChecked: number = 0;
  public total: number = 0;

  constructor(private forms: FormBuilder) { 
    this.coreFormGroup = this.forms.group({});
    this.addOnFormGroup = this.forms.group({});
    this.analyticsFormGroup = this.forms.group({});
    this.coreConfig.forEach((conf:Pricing)=>{
      this.coreFormGroup.addControl(conf.key, this.forms.control(false));
    });
    this.addOnConfig.forEach((conf:Pricing)=>{
      this.addOnFormGroup.addControl(conf.key, this.forms.control(false));
    });
    this.analyticsConfig.forEach((conf:Pricing)=>{
      this.analyticsFormGroup.addControl(conf.key, this.forms.control(false));
    });
  }

  private parseEnabledCalculations(): void{
    this.coreConfig.forEach((conf:Pricing)=>{
      if(this.coreFormGroup.controls[conf.key]?.value){
        this.enabledConfig.push(conf);
      }
    });
    this.addOnConfig.forEach((conf:Pricing)=>{
      if(this.addOnFormGroup.controls[conf.key]?.value){
        this.enabledConfig.push(conf);
      }
    });
    this.analyticsConfig.forEach((conf:Pricing)=>{
      if(this.analyticsFormGroup.controls[conf.key]?.value){
        this.enabledConfig.push(conf);
      }
    })
  }

  private calculateOverallTotal(): void{
    this.total = 0;
    this.enabledCalc.forEach((info: RateEvent)=>{
      this.total = this.total + info.total;
    })
  }

  public appendToCalculation(event: RateEvent): void{
    let search_index : number = this.enabledCalc.findIndex(enabled_event => enabled_event.key === event.key);
    if(search_index>-1){ this.enabledCalc[search_index] = event; }
    else{ this.enabledCalc.push(event); }
    this.calculateOverallTotal();
  }

  public groupField(group: PricingGroups, field: string): boolean{
    switch(group){
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

  public renderBadges(group: PricingGroups){
    switch(group){
      case this.pricingGroups.core:
        this.coreChecked = 0;
        Object.keys(this.coreFormGroup.controls).forEach((key: string)=>{
          if(this.coreFormGroup.controls[key].value){
            this.coreChecked++;
          }
        })
        break;
      case this.pricingGroups.addon:
        this.addOnChecked = 0;
        Object.keys(this.addOnFormGroup.controls).forEach((key: string)=>{
          if(this.addOnFormGroup.controls[key].value){
            this.addOnChecked++;
          }
        })
        break;
      case this.pricingGroups.analytics:
        this.analyticsChecked = 0;
        Object.keys(this.analyticsFormGroup.controls).forEach((key: string)=>{
          if(this.analyticsFormGroup.controls[key].value){
            this.analyticsChecked++;
          }
        })
        break;
    }
  }

  public toggleButtonStyle(): void{
    if(this.buttonStyle === ButtonStyle.none) { this.buttonStyle = ButtonStyle.accent; }
    else if(this.buttonStyle === ButtonStyle.accent) { this.buttonStyle = ButtonStyle.none; }
  }

  public focused(group: PricingGroups): boolean{ 
    return group === this.focus; 
  }

  public setFocus(group: PricingGroups): void{ 
    this.focusing = true;
    this.focus = group; 
  }

  public removeFocus(): void{ 
    this.focusing = false;  
    this.focus = undefined; 
  }

  public calculate(): void{
    this.parseEnabledCalculations();
    this.calculated = true;
  }

  public uncalculate(): void{
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
  }

}
