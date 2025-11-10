import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BuildingService } from 'src/app/admin/building/services/building.service';
import { ManufacturersService } from '../../sevices/manufacturers.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {

  currentLang = localStorage.getItem('lang')
  manufacturerFormData: any

  constructor(
    public dialogRef: MatDialogRef<EditCompanyComponent>, private manufacturersService: ManufacturersService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getManufacturerById(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ManufacturerForm = new FormGroup({
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
  })

  getManufacturerById(id: string) {
    this.manufacturersService.getManufacturersById(id).subscribe({
      next: (res) => {
        this.manufacturerFormData = res.data;
      }, error: (err) => {
        this.toastrService.error(err.message, 'Company id Failed');
      }, complete: () => {
        this.ManufacturerForm.patchValue({
          name_en: this.manufacturerFormData?.name_en,
          name_ar: this.manufacturerFormData?.name_ar,
        })
      }
    })
  }

}
