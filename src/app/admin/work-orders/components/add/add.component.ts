import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { WorkOrdersService } from '../../services/work-orders.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { HelperService } from 'src/app/services/helper.service';
import { DevicesService } from 'src/app/admin/devices/services/devices.service';
import { NgxSpinnerService } from 'ngx-spinner';

// ✅ Strongly typed interfaces
interface LookupItem {
  id: number;
  name: string;
}

interface Device {
  id: number;
  name: string;
  serial_number?: string;
}

interface WorkOrder {
  start_date: string;
  start_time: string;
  department_id: number;
  engineer_id: number;
  technician_id: number;
  work_type_id: number;
  building_id: number;
  floor_no: string;
  room_no: string;
  source_id: number;
  customer_name: string;
  customer_phone: string;
  equipment_id: number;
  description: string;
  priority: string;
  type: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  // Flags
  isUpdatePage = false;

  // IDs & current data
  orderId: string | null = null;
  deviceId: string | null = null;
  currentOrder: any = null;
  deviceData: Device | null = null;

  // Lookup data
  workTypes: LookupItem[] = [];
  buildings: LookupItem[] = [];
  equipments: LookupItem[] = [];
  sources: LookupItem[] = [];
  reports: LookupItem[] = [];
  departments: LookupItem[] = [];
  engineers: LookupItem[] = [];
  technicians: LookupItem[] = [];

  // Devices
  devices: Device[] = [];
  pageSize = 5;
  page = 1;

  // UI helpers
  hide = true;
  confirmHide = true;
  hideRequiredMarker = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workOrdersService: WorkOrdersService,
    private lookupsService: LookupsService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private devicesService: DevicesService,
    private spinner: NgxSpinnerService
  ) {
    this.deviceId = this.route.snapshot.paramMap.get('deviceId');
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.isUpdatePage = !!this.orderId;
  }

  // ✅ Reactive form
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
  });

  ngOnInit(): void {
    if (this.orderId) this.getOrderById(this.orderId);
    if (this.deviceId) this.getDeviceById(this.deviceId);

    this.loadLookups();
    this.loadDevices();

    // React to department changes
    this.orderForm.get('department_id')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.loadEngineers(deptId);
        this.loadTechnicians(deptId);
      }
    });
  }

  // ✅ Submit form
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    const values = form.value;
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'start_date' && value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 10));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (this.isUpdatePage && this.orderId) {
      this.updateOrder(formData);
    } else {
      this.addNewOrder(formData);
    }
  }

  // ✅ Add new work order
  private addNewOrder(formData: FormData): void {
    this.workOrdersService.addNewOrder(formData).subscribe({
      next: (res) => {
        this.toastr.success('Work order added successfully');
        setTimeout(
          () => this.router.navigate(['/dashboard/admin/work-orders']),
          1200
        );
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error adding work order');
      },
    });
  }

  // ✅ Update existing work order
  private updateOrder(formData: FormData): void {
    this.workOrdersService.editOrder(formData, +this.orderId!).subscribe({
      next: () => {
        this.toastr.success('Work order updated successfully');
        setTimeout(
          () => this.router.navigate(['/dashboard/admin/work-orders']),
          1200
        );
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error updating work order');
      },
    });
  }

  // ✅ Get single order by ID
  private getOrderById(id: string): void {
    this.workOrdersService.getOrder(+id).subscribe({
      next: (res) => {
        this.currentOrder = res.data;
        const o = this.currentOrder;

        this.orderForm.patchValue({
          start_date: o?.start_date ? new Date(o.start_date) : null,
          department_id: o?.department?.id,
          work_type_id: o?.work_type?.id,
          building_id: o?.building?.id,
          floor_no: o?.floor_no,
          room_no: o?.room_no,
          customer_name: o?.customer_name,
          customer_phone: o?.customer_phone,
          equipment_id: o?.equipment?.id,
          source_id: o?.source?.id,
          description: o?.description,
        });
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error fetching order details');
      },
    });
  }

  // ✅ Lookup methods
  private loadLookups(): void {
    this.lookupsService
      .getWork_type()
      .subscribe((res) => (this.workTypes = res.data));
    this.lookupsService
      .getbuilding()
      .subscribe((res) => (this.buildings = res.data));
    this.lookupsService
      .getEquipment()
      .subscribe((res) => (this.equipments = res.data));
    this.lookupsService
      .getSource()
      .subscribe((res) => (this.sources = res.data));
    this.lookupsService
      .getReport()
      .subscribe((res) => (this.reports = res.data));
    this.lookupsService
      .getDepartment()
      .subscribe((res) => (this.departments = res.data));
  }
  onselectDepartment(event: any) {
    //this.supervisor = 'ssss';
    // this.engineers(this.departmentId);
    //this.technicians(this.departmentId);
    console.log(event);
    //this.loadEngineers();
  }

  private loadEngineers(deptId: number): void {
    this.helperService.getEngineers(deptId).subscribe({
      next: (res) => {
        this.engineers = res.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error loading engineers:', err);
      },
      complete: () => {
        console.log('Engineers loaded successfully.');
      },
    });
  }

  private loadTechnicians(deptId: number): void {
    this.helperService
      .getTechnicians(deptId)
      .subscribe((res) => (this.technicians = res.data));
  }

  // ✅ Devices
  private loadDevices(): void {
    const params = { page_size: this.pageSize, page: this.page };
    this.devicesService.getAllDevices(params).subscribe({
      next: (res) => (this.devices = res.data),
      error: (err) => this.toastr.error(err.message, 'Error loading devices'),
    });
  }

  private getDeviceById(id: string): void {
    this.devicesService.getDevice(+id).subscribe({
      next: (res) => (this.deviceData = res.data),
      error: (err) => this.toastr.error(err.message, 'Error loading device'),
    });
  }
}
