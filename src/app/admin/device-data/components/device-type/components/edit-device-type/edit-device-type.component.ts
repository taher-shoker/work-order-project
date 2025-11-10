import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeviceTypeService } from '../../service/device-type.service';

@Component({
  selector: 'app-edit-device-type',
  templateUrl: './edit-device-type.component.html',
  styleUrls: ['./edit-device-type.component.scss']
})
export class EditDeviceTypeComponent {

  currentLang = localStorage.getItem('lang')
  deviceTypeFormData: any

  constructor(
    public dialogRef: MatDialogRef<EditDeviceTypeComponent>, private deviceTypeService: DeviceTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceTypeById(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deviceModelForm = new FormGroup({
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getDeviceTypeById(id: string) {
    this.deviceTypeService.getDeviceTypeById(id).subscribe({
      next: (res) => {
        this.deviceTypeFormData = res.data;
      }, error: (err) => {
        this.toastrService.error(err.message, 'Device Type id Failed');
      }, complete: () => {
        this.deviceModelForm.patchValue({
          name_en: this.deviceTypeFormData?.name_en,
          name_ar: this.deviceTypeFormData?.name_ar,
        })
      }
    })
  }


}
