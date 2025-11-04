import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss']
})
export class AddSourceComponent {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true

  constructor(
    public dialogRef: MatDialogRef<AddSourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sourcesForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

}
