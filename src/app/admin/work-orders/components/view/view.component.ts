import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkOrdersService } from '../../services/work-orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  currentLang = localStorage.getItem('lang')
  // buildingData: any
  orderData :any
  materialTableData:any
  spareTableData:any

  constructor(
    public dialogRef: MatDialogRef<ViewComponent>, private _WorkOrdersService: WorkOrdersService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getOrderById(this.data)
    this.getOrderMaterial()
    this.getOrderParts()
  }
  getOrderById(id:number){
      this._WorkOrdersService.getOrder(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Get order Succesfuly');
        this.orderData=res.data
        // console.log(this.orderData);
        
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Fetch Order');
      },
      complete: () => {
      }
    })
  }
    onClose(): void {
    this.dialogRef.close();
  }

   getOrderMaterial() {
    this._WorkOrdersService.getMaterialByOrderId(107).subscribe(
      (res) => {
        this.materialTableData = res.data
      }
    )
  }
  getOrderParts() {
    this._WorkOrdersService.getPartsByOrderId(107).subscribe(
      (res) => {
        this.spareTableData = res.data
      }
    )
  }
}
