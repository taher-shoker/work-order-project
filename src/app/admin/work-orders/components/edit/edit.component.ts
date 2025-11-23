import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { WorkOrdersService } from '../../services/work-orders.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { HelperService } from 'src/app/services/helper.service';

// -------------------------
// Local interfaces
// -------------------------
interface LookupItem {
  id: number;
  name: string;
}

interface UploadedFile {
  id: number;
  file: File;
  name: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  orderId: string | null = null;
  currentOrder: any = null;

  // lookups
  workTypes: LookupItem[] = [];
  buildings: LookupItem[] = [];
  equipments: LookupItem[] = [];
  sources: LookupItem[] = [];
  reports: LookupItem[] = [];
  departments: LookupItem[] = [];
  engineers: any[] = [];
  technicians: any[] = [];

  // uploaded files
  uploadedFiles: any = [];

  // UI helpers
  hide = true;
  confirmHide = true;
  hideRequiredMarker = true;

  // Reactive form
  orderForm = new FormGroup({
    start_date: new FormControl<Date | null>(null),
    start_time: new FormControl<string>(
      new Date().toTimeString().split(' ')[0],
      [Validators.required]
    ),
    department_id: new FormControl<number | null>(null, [Validators.required]),
    engineer_id: new FormControl<number | null>(null, [Validators.required]),
    technician_id: new FormControl<number | null>(null, [Validators.required]),
    work_type_id: new FormControl<number | null>(null, [Validators.required]),
    building_id: new FormControl<number | null>(null, [Validators.required]),
    floor_no: new FormControl<string | null>(null, [Validators.required]),
    room_no: new FormControl<string | null>(null, [Validators.required]),
    source_id: new FormControl<number | null>(null, [Validators.required]),
    customer_name: new FormControl<string | null>(null, [Validators.required]),
    customer_phone: new FormControl<string | null>(null, [Validators.required]),
    equipment_id: new FormControl<number | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    priority: new FormControl<string>('high', [Validators.required]),
    type: new FormControl<string>('maintenance', [Validators.required]),
    // typed correctly to hold uploaded files array
    attachment: new FormControl<UploadedFile[]>([], []),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workOrdersService: WorkOrdersService,
    private lookupsService: LookupsService,
    private toastr: ToastrService,
    private helperService: HelperService
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadLookups();

    if (this.orderId) {
      this.loadOrderById(this.orderId);
    }

    // react to department changes
    this.orderForm.get('department_id')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.loadEngineers(deptId);
        this.loadTechnicians(deptId);
      } else {
        this.engineers = [];
        this.technicians = [];
      }
    });
  }

  // -------------------------
  // Submit
  // -------------------------
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    if (!this.orderId) {
      this.toastr.error('Invalid order ID.');
      return;
    }

    // Build FormData if your backend expects multipart/form-data and attachments
    const formValues = form.value;
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (key === 'start_date' && value instanceof Date) {
        formData.append(key, value.toISOString().split('T')[0]);
      } else if (key === 'attachment') {
        // append files if any
        console.log(this.uploadedFiles);
        this.uploadedFiles.forEach((x: any) =>
          formData.append('attachment', x.file)
        );
      } else {
        formData.append(key, String(value));
      }
    });

    // Call  service: choose editOrder(formData, id) or editOrder(form.value, id)
    // depending on your backend. Here we try to send FormData.
    this.workOrdersService.editOrder(formData, +this.orderId).subscribe({
      next: () => {
        this.toastr.success('Work order updated successfully.');
        setTimeout(() => this.router.navigate(['/dashboard/work-orders']), 800);
      },
      error: (err) => {
        this.toastr.error(err?.message || 'Error updating work order.');
      },
    });
  }

  // -------------------------
  // Load existing order
  // -------------------------
  private loadOrderById(id: string): void {
    this.workOrdersService.getOrder(+id).subscribe({
      next: (res) => {
        this.currentOrder = res.data;
        const o = this.currentOrder;

        // patch form safely
        this.orderForm.patchValue({
          start_date: o?.start_date ? new Date(o.start_date) : null,
          start_time: o?.start_time || new Date().toTimeString().split(' ')[0],
          department_id: o?.department?.id ?? null,
          work_type_id: o?.work_type?.id ?? null,
          building_id: o?.building?.id ?? null,
          floor_no: o?.floor_no ?? null,
          room_no: o?.room_no ?? null,
          customer_name: o?.customer_name ?? null,
          customer_phone: o?.customer_phone ?? null,
          equipment_id: o?.equipment?.id ?? null,
          source_id: o?.source?.id ?? null,
          description: o?.description ?? null,
          priority: o?.priority ?? 'high',
          type: o?.type ?? 'maintenance',
        });

        if (typeof o.attachment === 'string') {
          const url = o.attachment;
          const fileName = url.split('attachment/')[1];

          this.uploadedFiles = [
            {
              id: fileName, // constant based on filename

              file: {
                name: fileName,
              },
            },
          ];

          this.orderForm.get('attachment')?.setValue(this.uploadedFiles);
        }
      },
      error: (err) => {
        this.toastr.error(err?.message || 'Error loading order.');
      },
    });
  }

  // -------------------------
  // Lookups
  // -------------------------
  private loadLookups(): void {
    this.lookupsService
      .getWork_type()
      .subscribe((res) => (this.workTypes = res.data || []));
    this.lookupsService
      .getbuilding()
      .subscribe((res) => (this.buildings = res.data || []));
    this.lookupsService
      .getEquipment()
      .subscribe((res) => (this.equipments = res.data || []));
    this.lookupsService
      .getSource()
      .subscribe((res) => (this.sources = res.data || []));
    this.lookupsService
      .getReport()
      .subscribe((res) => (this.reports = res.data || []));
    this.lookupsService
      .getDepartment()
      .subscribe((res) => (this.departments = res.data || []));
  }

  private loadEngineers(deptId: number): void {
    if (!deptId) return;
    this.helperService.getEngineers(deptId).subscribe({
      next: (res) => {
        this.engineers = res?.data || [];
        // optionally set engineer if current order has it
        if (this.currentOrder?.engineer?.id) {
          this.orderForm
            .get('engineer_id')
            ?.setValue(this.currentOrder.engineer.id);
        }
      },
      error: () => (this.engineers = []),
    });
  }

  private loadTechnicians(deptId: number): void {
    if (!deptId) return;
    this.helperService.getTechnicians(deptId).subscribe({
      next: (res) => {
        this.technicians = res?.data || [];
        if (this.currentOrder?.technician?.id) {
          this.orderForm
            .get('technician_id')
            ?.setValue(this.currentOrder.technician.id);
        }
      },
      error: () => (this.technicians = []),
    });
  }

  // -------------------------
  // department select helper (keeps compatibility with your template)
  // -------------------------
  onselectDepartment(event: any): void {
    // placeholder if your template emits an event
    // you already react to valueChanges above
    console.log('department selected:', event);
  }

  // -------------------------
  // File upload helpers
  // `files` expected to be UploadedFile[] (id + file + name)
  // -------------------------
  onUploadFile(files: UploadedFile[]): void {
    // append or replace depending on your UI — here we replace with new list
    this.uploadedFiles = [...files];
    this.orderForm.get('attachment')?.setValue(this.uploadedFiles);
  }

  onDeleteFile(id: number): void {
    this.uploadedFiles = this.uploadedFiles.filter((f: any) => f.id !== id);
    this.orderForm.get('attachment')?.setValue(this.uploadedFiles);
  }
}
