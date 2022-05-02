import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private forms: FormBuilder, 
    private meta: MetaService
  ) {
    this.contactGroup = this.forms.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      subreason: new FormControl(''),
      message: new FormControl(''),
    });
    this.meta.mediaBreakpoint.subscribe((size: string) => {
      this.screenSize = size;
    });
  }

  public findReason(reasonKey: string) {
    return this.reasonConfig
      .filter((element) => element.key == reasonKey)
      .pop();
  }

  public mobileMode() {
    return (
      this.screenSize == 'md' ||
      this.screenSize == 'sm' ||
      this.screenSize == 'xs'
    );
  }
}
