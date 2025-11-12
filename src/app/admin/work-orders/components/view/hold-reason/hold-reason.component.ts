import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hold-reason',
  templateUrl: './hold-reason.component.html',
  styleUrls: ['./hold-reason.component.scss'],
})
export class HoldReasonComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HoldReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this.fb.group({
      holding_reason: ['', Validators.required],
      used_items_descriptions: ['', Validators.required],
      technician_report: [''],
    });
  }
  ngOnInit(): void {
    // ✅ send data to parent
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null); // cancel with no data
  }
}
