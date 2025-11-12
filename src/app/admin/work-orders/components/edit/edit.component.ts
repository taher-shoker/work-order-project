// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { WorkOrdersService } from '../../services/work-orders.service';
// import { LookupsService } from 'src/app/services/lookups.service';
// import { ToastrService } from 'ngx-toastr';
// import { HelperService } from 'src/app/services/helper.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.scss']
// })
// export class EditComponent {
//   ngOnInit() {
//     this.getOrderById(this.orderId)
//     this.getworkType()
//     this.getBuilding()
//     this.getEqipment()
//     this.getSource()
//     this.getReport()
//     this.getDepartment()

//   }
//   constructor(
//     private _activateRoute: ActivatedRoute,
//     private _WorkOrdersService: WorkOrdersService,
//     private _LookupsService: LookupsService,
//     private _ToastrService: ToastrService,
//     private _Router: Router,
//     private _HelperService: HelperService
//   ) {
//     this.orderId = this._activateRoute.snapshot.paramMap.get('id')
//   }
//   data: any

//   orderId: any;
//   currentOrder: any
//   workType: any
//   building: any
//   equipment: any
//   source: any
//   report: any
//   departments: any
//   departmentId: any
//   supervisor: any
//   engineers: any
//   technicians: any
//   start_date: any
//   date: any

//   hide: boolean = true;
//   confirmHide: boolean = true;
//   hideRequiredMarker: boolean = true;

//   orderForm = new FormGroup(
//     {
//       start_date: new FormControl(null),
//       start_time: new FormControl(new Date().toTimeString().split(' ')[0], [Validators.required]),
//       department_id: new FormControl(null, [Validators.required]),
//       engineer_id: new FormControl(null, [Validators.required]),
//       technician_id: new FormControl(null, [Validators.required]),
//       work_type_id: new FormControl(null, [Validators.required]),
//       building_id: new FormControl(null, [Validators.required]),
//       floor_no: new FormControl(null, [Validators.required]),
//       room_no: new FormControl(null, [Validators.required]),
//       source_id: new FormControl(null, [Validators.required]),
//       customer_name: new FormControl(null, [Validators.required]),
//       customer_phone: new FormControl(null, [Validators.required]),
//       equipment_id: new FormControl(null, [Validators.required]),
//       description: new FormControl(null, [Validators.required]),
//       priority: new FormControl("high", [Validators.required]),
//       type: new FormControl("maintenance", [Validators.required])

//     }
//   );
//   onSubmit(data: FormGroup) {
//     if (this.orderId) {
//       // Edit Order
//       let myData = new FormData();
//       let myMap = new Map(Object.entries(data.value));
//       for (const [key, value] of myMap) {
//         myData.append(key, data.value[key]);
//       }

//       this._WorkOrdersService.editOrder(data.value, this.orderId).subscribe({
//         next: (res) => {
//           console.log(data.value)
//           this._ToastrService.success('Work Order Updated Succesfuly');
//         },
//         error: (err) => {
//           this._ToastrService.error(err.message, 'Error in Update Order');
//         },
//         complete: () => {
//           this._Router.navigate(['/dashboard/admin/work-orders']);
//         }
//       })

//     }
//   }
//     getOrderById(id: number) {
//     this._WorkOrdersService.getOrder(id).subscribe(
//       (res) => {
//         this.currentOrder = res.data
//         // console.log(this.currentOrder.work_type.id)

//         this.orderForm.patchValue({
//           start_date: this.currentOrder?.start_date,
//           department_id: this.currentOrder?.department.id,
//           work_type_id: this.currentOrder?.work_type.id,
//           building_id: this.currentOrder?.building.id,
//           floor_no: this.currentOrder?.floor_no,
//           room_no: this.currentOrder?.room_no,
//           customer_name: this.currentOrder?.customer_name,
//           customer_phone: this.currentOrder?.customer_phone,
//           equipment_id: this.currentOrder?.equipment.id,
//           source_id: this.currentOrder?.source.id,
//           description: this.currentOrder?.description,

//         })

//       }
//     )
//   }
//   // Start Lookups

//   getworkType() {
//     this._LookupsService.getWork_type().subscribe(
//       (res) => {
//         this.workType = res.data
//       }
//     )
//   }
//   getBuilding() {
//     this._LookupsService.getbuilding().subscribe(
//       (res) => {
//         this.building = res.data
//       }
//     )
//   }
//   getSource() {
//     this._LookupsService.getSource().subscribe(
//       (res) => {
//         this.source = res.data
//       }
//     )
//   }
//   getEqipment() {
//     this._LookupsService.getEquipment().subscribe(
//       (res) => {
//         this.equipment = res.data
//       }
//     )
//   }
//   getReport() {
//     this._LookupsService.getReport().subscribe(
//       (res) => {
//         this.report = res.data
//       }
//     )
//   }
//   getDepartment() {
//     this._LookupsService.getDepartment().subscribe(
//       (res) => {
//         this.departments = res.data

//       }
//     )
//   }
//   onselectDepartment(){
//     this.supervisor = 'ssss'
//     this.getengineers(this.departmentId)
//     this.gettechnicians(this.departmentId)
//   }
//   getengineers(id: number) {
//     this._HelperService.getEngineers(id).subscribe(
//       (res) => {
//         console.log(res.data)
//         // console.log(this.departmentId)

//         this.engineers = res.data;
//       }
//     )
//   }
//   gettechnicians(id: number) {
//     this._HelperService.getTechnicians(id).subscribe(
//       (res) => {
//         console.log(res.data)
//         this.technicians = res.data;
//       }
//     )
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { WorkOrdersService } from '../../services/work-orders.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { HelperService } from 'src/app/services/helper.service';

// ✅ Interfaces for strong typing
interface LookupItem {
  id: number;
  name: string;
}

interface WorkOrder {
  id: number;
  start_date: string;
  start_time: string;
  department_id: number;
  engineer: { id: number; name: string };
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  orderId!: string | null;
  currentOrder: any = null;

  // Lookup data
  workTypes: LookupItem[] = [];
  buildings: LookupItem[] = [];
  equipments: LookupItem[] = [];
  sources: LookupItem[] = [];
  reports: LookupItem[] = [];
  departments: LookupItem[] = [];
  engineers: LookupItem[] = [];
  technicians: LookupItem[] = [];

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
    if (this.orderId) {
      this.loadOrderById(this.orderId);
    }
    this.loadLookups();

    // Load engineers & technicians when department changes
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

    if (!this.orderId) {
      this.toastr.error('Invalid order ID.');
      return;
    }

    this.workOrdersService.editOrder(form.value, +this.orderId).subscribe({
      next: () => {
        this.toastr.success('Work order updated successfully.');
        setTimeout(
          () => this.router.navigate(['/dashboard/work-orders']),
          1000
        );
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error updating work order.');
      },
    });
  }

  // ✅ Load existing order data
  private loadOrderById(id: string): void {
    this.workOrdersService.getOrder(+id).subscribe({
      next: (res) => {
        this.currentOrder = res.data;
        const o = this.currentOrder;

        this.orderForm.patchValue({
          start_date: o?.start_date ? new Date(o.start_date) : null,
          start_time: o?.start_time || new Date().toTimeString().split(' ')[0],
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
          priority: o?.priority || 'high',
          type: o?.type || 'maintenance',
        });
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error loading order.');
      },
    });
  }

  // ✅ Load all lookup data
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

  // ✅ Load engineers & technicians based on department

  private loadEngineers(deptId: number): void {
    if (!deptId) return; // prevent unnecessary API call

    this.helperService.getEngineers(deptId).subscribe({
      next: (res) => {
        this.engineers = res?.data || [];
        this.orderForm.patchValue({
          engineer_id: this.currentOrder.engineer.id,
        });
      },
      error: (err) => {
        console.error('Failed to load engineers:', err);
        this.engineers = [];
      },
    });
  }

  private loadTechnicians(deptId: number): void {
    if (!deptId) return; // ✅ skip if department ID is missing

    this.helperService.getTechnicians(deptId).subscribe({
      next: (res) => {
        this.technicians = res?.data || [];
        this.orderForm.patchValue({
          technician_id: this.currentOrder.technician.id,
        });
      },
      error: (err) => {
        console.error('Failed to load technicians:', err);
        this.technicians = [];
      },
    });
  }

  onselectDepartment(event: any) {
    //this.supervisor = 'ssss';
    // this.engineers(this.departmentId);
    //this.technicians(this.departmentId);
    console.log(event);
    //this.loadEngineers();
  }
}
