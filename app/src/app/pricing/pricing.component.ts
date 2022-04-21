import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum ButtonStyle{
  primary="primary", accent="accent", none=""
}
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent{
  public buttonStyle: ButtonStyle = ButtonStyle.none;
  public featureFormGroup : FormGroup;
  public specFormGroup: FormGroup;
  public analyticsFormGroup: FormGroup;

  constructor(forms: FormBuilder) { 
    this.featureFormGroup = forms.group({
      design: false,
      store: false,
      blog: false,
      account: false,
      forum: false,
    })
    this.specFormGroup = forms.group({
      downtime: false,
      data: false,
      media: false,
    })
    this.analyticsFormGroup = forms.group({
      demographics: false,
      traffic: false,
      seo: false,

    })
  }

  public toggleButtonStyle(){
    if(this.buttonStyle === ButtonStyle.none) { this.buttonStyle = ButtonStyle.accent; }
    else if(this.buttonStyle === ButtonStyle.accent) { this.buttonStyle = ButtonStyle.none; }
  }

}
