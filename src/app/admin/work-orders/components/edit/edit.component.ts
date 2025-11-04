import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrdersService } from '../../services/work-orders.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  ngOnInit() {
    this.getOrderById(this.orderId)
    this.getworkType()
    this.getBuilding()
    this.getEqipment()
    this.getSource()
    this.getReport()
    this.getDepartment()

  }
  constructor(
    private _activateRoute: ActivatedRoute,
    private _WorkOrdersService: WorkOrdersService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) {
    this.orderId = this._activateRoute.snapshot.paramMap.get('id')
  }
  data: any

  orderId: any;
  currentOrder: any
  workType: any
  building: any
  equipment: any
  source: any
  report: any
  departments: any
  departmentId: any
  supervisor: any
  engineers: any
  technicians: any
  start_date: any
  date: any

  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  orderForm = new FormGroup(
    {
      start_date: new FormControl(null),
      start_time: new FormControl(new Date().toTimeString().split(' ')[0], [Validators.required]),
      department_id: new FormControl(null, [Validators.required]),
      engineer_id: new FormControl(null, [Validators.required]),
      technician_id: new FormControl(null, [Validators.required]),
      work_type_id: new FormControl(null, [Validators.required]),
      building_id: new FormControl(null, [Validators.required]),
      floor_no: new FormControl(null, [Validators.required]),
      room_no: new FormControl(null, [Validators.required]),
      source_id: new FormControl(null, [Validators.required]),
      customer_name: new FormControl(null, [Validators.required]),
      customer_phone: new FormControl(null, [Validators.required]),
      equipment_id: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      priority: new FormControl("high", [Validators.required]),
      type: new FormControl("maintenance", [Validators.required])



    }
  );
  onSubmit(data: FormGroup) {
    if (this.orderId) {
      // Edit Order
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }

      this._WorkOrdersService.editOrder(data.value, this.orderId).subscribe({
        next: (res) => {
          console.log(data.value)
          this._ToastrService.success('Work Order Updated Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error in Update Order');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/admin/work-orders']);
        }
      })

    }
  }
    getOrderById(id: number) {
    this._WorkOrdersService.getOrder(id).subscribe(
      (res) => {
        this.currentOrder = res.data
        // console.log(this.currentOrder.work_type.id)

        this.orderForm.patchValue({
          start_date: this.currentOrder?.start_date,
          department_id: this.currentOrder?.department.id,
          work_type_id: this.currentOrder?.work_type.id,
          building_id: this.currentOrder?.building.id,
          floor_no: this.currentOrder?.floor_no,
          room_no: this.currentOrder?.room_no,
          customer_name: this.currentOrder?.customer_name,
          customer_phone: this.currentOrder?.customer_phone,
          equipment_id: this.currentOrder?.equipment.id,
          source_id: this.currentOrder?.source.id,
          description: this.currentOrder?.description,

        })

      }
    )
  }
  // Start Lookups 

  getworkType() {
    this._LookupsService.getWork_type().subscribe(
      (res) => {
        this.workType = res.data
      }
    )
  }
  getBuilding() {
    this._LookupsService.getbuilding().subscribe(
      (res) => {
        this.building = res.data
      }
    )
  }
  getSource() {
    this._LookupsService.getSource().subscribe(
      (res) => {
        this.source = res.data
      }
    )
  }
  getEqipment() {
    this._LookupsService.getEquipment().subscribe(
      (res) => {
        this.equipment = res.data
      }
    )
  }
  getReport() {
    this._LookupsService.getReport().subscribe(
      (res) => {
        this.report = res.data
      }
    )
  }
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.departments = res.data
     
      }
    )
  }
  onselectDepartment(){
    this.supervisor = 'ssss'
    this.getengineers(this.departmentId)
    this.gettechnicians(this.departmentId)
  }
  getengineers(id: number) {
    this._HelperService.getEngineers(id).subscribe(
      (res) => {
        console.log(res.data)
        // console.log(this.departmentId)

        this.engineers = res.data;
      }
    )
  }
  gettechnicians(id: number) {
    this._HelperService.getTechnicians(id).subscribe(
      (res) => {
        console.log(res.data)
        this.technicians = res.data;
      }
    )
  }
}
