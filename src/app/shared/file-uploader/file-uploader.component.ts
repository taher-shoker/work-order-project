import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
  ],
})
export class FileUploaderComponent implements ControlValueAccessor {
  value: any;

  onTouched: any = () => {};
  onChange: any = () => {};

  writeValue(value: any): void {
    if (!value || !Array.isArray(value)) return;

    // Clear existing files
    this.files = [];

    value.forEach((item: any) => {
      if (item?.fileName) {
        // Create empty blob for preview only
        const blob = new Blob([''], { type: 'application/octet-stream' });

        const file = new File([blob], item.fileName, {
          type: blob.type,
          lastModified: Date.now(),
        });

        this.files.push(file);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @Input() attachmentFiles: any = [];
  @Input() mode: any;
  @Input() names: any;
  @Input() url: any;
  @Input() method: any;
  @Input() multiple!: boolean;
  @Input() disabled!: boolean;
  @Input() accept = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
    'text/csv',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];
  @Input() maxFileSize: any;
  @Input() isLoading!: boolean;
  @Input() required = false;
  @Input() withCredentials: any;
  @Input() invalidFileMessageDetail!: string;
  @Input() previewWidth: any;
  @Input() chooseLabel = 'Choose';
  @Input() uploadLabel = 'Upload';
  @Input() cancelLabel = 'Cancel';
  @Input() customUpload: any;
  @Input() showUploadButton: any;
  @Input() showCancelButton: any;
  @Input() dataUriPrefix: any;
  @Input() deleteButtonLabel: any;
  @Input() deleteButtonIcon = 'close';
  @Input() showUploadInfo: any;

  @Output() onformchange = new EventEmitter();
  @Output() ondelete = new EventEmitter();

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  @Input() files: File[] = [];
  @Input() size = 2e7;

  // FIXED TYPING
  onClick(event: MouseEvent) {
    if (this.fileUpload) {
      this.clearInputElement();
      this.fileUpload.nativeElement.click();
    }
  }

  // FIXED TYPING
  onFileSelected(event: Event) {
    this.invalidFileMessageDetail = '';

    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    let allFilesValid = true;
    const filesWithId: { id: number; file: File }[] = [];

    for (let i = 0; i < files.length; i++) {
      // Wrap file with ID
      const fileWithId = {
        id: i,
        file: files[i],
      };

      // Validate the file
      if (!this.validate(fileWithId.file)) {
        allFilesValid = false;
      } else {
        // Only push valid files
        filesWithId.push(fileWithId);
      }
    }

    if (allFilesValid) {
      console.log(filesWithId);
      // emit the array with id
      this.onformchange.emit(filesWithId);
    } else {
      console.warn('Some files are invalid!');
    }
  }

  removeFile(file: File) {
    const ix = this.files.indexOf(file);
    if (ix !== -1) {
      this.files.splice(ix, 1);
      this.clearInputElement();
    }
  }

  removeFileRemotly(id: number) {
    this.ondelete.emit(id);
  }

  validate(file: File) {
    if (file.size > this.size) {
      this.invalidFileMessageDetail = 'File is too big!';
      return false;
    }

    if (file.type === '') {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!this.accept.includes(ext)) {
        this.invalidFileMessageDetail = 'File is Invalid Format!';
        return false;
      }
      return true;
    }

    if (!this.accept.includes(file.type)) {
      this.invalidFileMessageDetail = 'File is Invalid Format!';
      return false;
    }

    return true;
  }

  truncateLabelText(label: string) {
    console.log(label);
    const ext = label.slice(label.lastIndexOf('.'));
    return label.slice(0, 10) + '...' + ext;
  }

  clearInputElement() {
    if (this.fileUpload) {
      this.fileUpload.nativeElement.value = '';
    }
  }

  isMultiple(): boolean {
    return this.multiple;
  }
}
