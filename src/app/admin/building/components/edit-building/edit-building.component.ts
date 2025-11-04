import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuildingService } from '../../services/building.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.scss']
})
export class EditBuildingComponent {

  currentLang = localStorage.getItem('lang')
  buildingData: any

  constructor(
    public dialogRef: MatDialogRef<EditBuildingComponent>, private _BuildingService: BuildingService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBuildingById(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildingForm = new FormGroup({
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
    no_of_floors: new FormControl(null, [Validators.required]),
  })

  getBuildingById(id: number) {
    this._BuildingService.getBuildingById(id).subscribe({
      next: (res) => {
        this.buildingData = res.data;
      }, error: (err) => {
        this._ToastrService.error(err.message, 'Building id Failed');
      }, complete: () => {
        this.buildingForm.patchValue({
          name_en: this.buildingData?.name_en,
          name_ar: this.buildingData?.name_ar,
          no_of_floors: this.buildingData?.no_of_floors
        })
      }
    })
  }


}
