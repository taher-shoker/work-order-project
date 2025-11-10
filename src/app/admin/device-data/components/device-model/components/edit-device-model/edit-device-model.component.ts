import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManufacturersService } from '../../../manufacturers/sevices/manufacturers.service';
import { DeviceModelService } from '../../service/device-model.service';

@Component({
  selector: 'app-edit-device-model',
  templateUrl: './edit-device-model.component.html',
  styleUrls: ['./edit-device-model.component.scss']
})
export class EditDeviceModelComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  deviceModelFormData: any

  constructor(
    public dialogRef: MatDialogRef<EditDeviceModelComponent>, private deviceModelService: DeviceModelService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceModelById(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deviceModelForm = new FormGroup({
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getDeviceModelById(id: string) {
    this.deviceModelService.getDeviceModelById(id).subscribe({
      next: (res) => {
        this.deviceModelFormData = res.data;
      }, error: (err) => {
        this.toastrService.error(err.message, 'Company id Failed');
      }, complete: () => {
        this.deviceModelForm.patchValue({
          name_en: this.deviceModelFormData?.name_en,
          name_ar: this.deviceModelFormData?.name_ar,
        })
      }
    })
  }

}
