import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  [key: string]: string
}

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
