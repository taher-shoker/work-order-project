import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-device-model',
  templateUrl: './add-device-model.component.html',
  styleUrls: ['./add-device-model.component.scss']
})
export class AddDeviceModelComponent {

  currentLang = localStorage.getItem('lang')

  constructor(
    public dialogRef: MatDialogRef<AddDeviceModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  manufacturersForm = new FormGroup({
    name_en: new FormControl(null),
    name_ar: new FormControl(null),
    status: new FormControl(null),
  })

}
