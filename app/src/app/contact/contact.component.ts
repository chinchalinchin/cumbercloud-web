import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactReason, REASON_CONFIG } from '../app.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public contactGroup: FormGroup;
  public reasonConfig: ContactReason[] = REASON_CONFIG;
 
  constructor(private forms: FormBuilder) {
    this.contactGroup = this.forms.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      subreason: new FormControl('')
    })
  }

  public findReason(reasonKey: string){
    return this.reasonConfig.filter(element => element.key == reasonKey).pop();
  }

}
