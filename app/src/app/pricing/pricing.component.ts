import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent{
  @ViewChild(MatAccordion) accordion!: MatAccordion;

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

  ngAfterViewInit(): void {
    this.accordion.closeAll()
  }

}
