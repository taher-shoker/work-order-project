import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { NgOtpInputComponent } from 'ng-otp-input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef,
    public dialogRef: MatDialogRef<VerifyCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  codeValue: string = '';
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        const firstInput = this.el.nativeElement.querySelector(
          '.custom-inputs input'
        );
        if (firstInput) firstInput.focus();
      }, 50);
    });
  }
  onOtpChange(event: string) {
    console.log(event);
    this.codeValue = event;
  }
  submitOtp() {
    this.dialogRef.close({ otp: this.codeValue });
  }
}
