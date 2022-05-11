import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MetaService } from 'src/services/meta.service';
import { ContactConfig, REASON_CONFIG } from '../../../app.config';
import { SentComponent } from '../sent/sent.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public screenSize: string = '';
  public contactGroup: FormGroup;
  public reasonConfig: ContactConfig[] = REASON_CONFIG;
  public loading: boolean = false;

  constructor(
    private _forms: FormBuilder,
    private _meta: MetaService,
    private _ga: GoogleAnalyticsService,
    private _http: HttpClient,
    private _dialog: MatDialog
  ) {
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

  private FormToBody(): any {
    return {
      email: this.contactGroup.controls['email'].value,
      first: this.contactGroup.controls['first'].value,
      last: this.contactGroup.controls['last'].value,
      reason: this.contactGroup.controls['reason'].value.reason,
      subreason: this.contactGroup.controls['subreason'].value
        ? this.contactGroup.controls['subreason'].value
        : 'None',
      message: this.contactGroup.controls['message'].value
        ? this.contactGroup.controls['message'].value
        : 'Hello!',
    };
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

  public submit(): void {
    this._ga.event(
      `contact_email_${this.contactGroup.controls['email'].value}`
    );
    this.loading = true;
    this._http
      .post('https://api.cumberland-cloud.com/v1/mail', this.FormToBody())
      .subscribe((response: any) => {
        console.log(response);
        this.loading = false;
        this._dialog.open(SentComponent, {
          width: '50%',
          height: '50%',
          hasBackdrop: true,
          backdropClass: 'popup-backdrop',
          ariaLabel: 'Message Sent Popup',
        });
        this.contactGroup.reset();
      });
  }
}
