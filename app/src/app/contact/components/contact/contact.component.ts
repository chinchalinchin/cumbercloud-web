import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MetaService } from 'src/services/meta.service';
import { ContactConfig, REASON_CONFIG } from '../../../app.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public screenSize: string = '';
  public contactGroup: FormGroup;
  public reasonConfig: ContactConfig[] = REASON_CONFIG;

  constructor(
    private _forms: FormBuilder, 
    private _meta: MetaService,
    private _ga: GoogleAnalyticsService) {
    this.contactGroup = this._forms.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      subreason: new FormControl(''),
      message: new FormControl(''),
    });
    this._meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
  }

  public findReason(reasonKey: string): ContactConfig | undefined {
    return this.reasonConfig
      .filter((element) => element.key == reasonKey)
      .pop();
  }

  public mobileMode(): boolean {
    return (
      this.screenSize == 'md' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'xs'
    );
  }

  public submit(): void{
    this._ga.event('contact', 'email', this.contactGroup.controls['email'].value)
  }
}
