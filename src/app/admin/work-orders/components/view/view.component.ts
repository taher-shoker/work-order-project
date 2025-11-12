// import { Component, Inject, ViewChild } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';
// import { WorkOrdersService } from '../../services/work-orders.service';
// import { AuthService } from 'src/app/auth/services/auth.service';
// import { VerifyCodeComponent } from './verify-code/verify-code.component';
// import {
//   MAT_DIALOG_DATA,
//   MatDialog,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { NgOtpInputComponent } from 'ng-otp-input';
// import { HoldReasonComponent } from './hold-reason/hold-reason.component';

// @Component({
//   selector: 'app-view',
//   templateUrl: './view.component.html',
//   styleUrls: ['./view.component.scss'],
// })
// export class ViewComponent {
//   orderData: any;
//   materialTableData: any[] = [];
//   spareTableData: any[] = [];
//   orderId: string | null;
//   btnsToShow: number[] = [];
//   constructor(
//     private workOrdersService: WorkOrdersService,
//     private route: ActivatedRoute,
//     private router: Router,

//     private toastr: ToastrService,
//     private authService: AuthService,
//     public dialog: MatDialog
//   ) {
//     this.orderId = this.route.snapshot.paramMap.get('id');
//   }
//   @ViewChild(NgOtpInputComponent, { static: false })
//   ngOtpInput!: NgOtpInputComponent;

//   ngOnInit(): void {
//     if (this.orderId) {
//       this.getOrderById(+this.orderId);
//     }
//   }

//   getOrderById(id: number): void {
//     this.workOrdersService.getOrder(id).subscribe({
//       next: (res) => {
//         // this.toastr.success(res.message, 'Order retrieved successfully');
//         this.orderData = res.data;
//         this.canShowButton();
//       },
//       error: (err) => {
//         this.toastr.error(err.message, 'Error fetching order');
//       },
//     });
//   }

//   getOrderMaterial(): void {
//     this.workOrdersService.getMaterialByOrderId(107).subscribe({
//       next: (res) => (this.materialTableData = res.data),
//       error: (err) =>
//         this.toastr.error(err.message, 'Error fetching materials'),
//     });
//   }

//   getOrderParts(): void {
//     this.workOrdersService.getPartsByOrderId(107).subscribe({
//       next: (res) => (this.spareTableData = res.data),
//       error: (err) => this.toastr.error(err.message, 'Error fetching parts'),
//     });
//   }
//   /** 🔹 Determine which buttons to show */
//   canShowButton(): void {
//     // const roleId = this.authService.user.value?.title?.id; // 1=Admin, 2=Engineer, 3=Technician
//     const status = this.orderData?.status.id;
//     switch (status) {
//       case 1:
//       case 2:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [8];
//         } else {
//           this.btnsToShow = [3];
//         }
//         break;
//       case 3:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [];
//         } else {
//           this.btnsToShow = [4, 5];
//         }
//         break;
//       case 4:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [];
//         } else {
//           this.btnsToShow = [3];
//         }
//         break;
//       case 5:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [13, 7];
//         } else {
//           this.btnsToShow = [];
//         }
//         break;

//       case 13:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [];
//         } else {
//           this.btnsToShow = [6];
//         }
//         break;
//       case 7:
//         if (this.authService.isAdmin()) {
//           // Admin or Engineer
//           this.btnsToShow = [];
//         } else {
//           this.btnsToShow = [3];
//         }
//         break;

//       default:
//         [];
//     }
//   }

//   /** 🔹 Handle each button action */
//   onAction(actionId: number): void {
//     if (!this.orderId) return;
//     const status = this.orderData?.status.id;
//     console.log(status);

//     switch (status) {
//       case 1:
//       case 2:
//       case 3:
//       case 7:
//         if (this.authService.isAdmin()) {
//           if (actionId === 8) {
//             this.onUpdateWorkOrderFlow(+this.orderId, actionId);
//           }
//         } else {
//           if (actionId === 4) {
//             this.onHoldWorkOrder(+this.orderId, actionId);
//           } else {
//             this.onUpdateWorkOrderFlow(+this.orderId, actionId);
//           }
//         }
//         break;
//       // this.assignOrder();
//       case 5:
//         this.onUpdateWorkOrderFlow(+this.orderId, actionId);
//         break;
//       case 4:
//         if (!this.authService.isAdmin()) {
//           this.onUpdateWorkOrderFlow(+this.orderId, actionId);
//         }
//         break;
//       case 13:
//         this.verfiyCloseWorkOrder(+this.orderId, actionId);
//         break;
//     }
//   }

//   public getLabel(statusId: number): string {
//     const statusLabels: { [key: number]: string } = {
//       3: 'status.in_progress',
//       4: 'status.on_hold',
//       5: 'status.completed',
//       6: 'status.closed',
//       7: 'status.rejected',
//       8: 'status.cancelled',
//       13: 'status.close_confirmed',
//     };

//     return statusLabels[statusId] || 'status.unknown';
//   }

//   /**  service calls */
//   private onUpdateWorkOrderFlow(orderId: number, statusId: number): void {
//     this.workOrdersService
//       .updateStatusOrder(orderId, { status: statusId })
//       .subscribe({
//         next: (res) => {
//           this.toastr.success('Order On Progress successfully');
//           this.router.navigate(['/dashboard/work-orders']);
//         },
//         error: (err) => this.toastr.error('Failed to approve order'),
//       });
//   }

//   private verfiyCloseWorkOrder(orderId: number, statusId: number): void {
//     const dialogRef = this.dialog.open(VerifyCodeComponent, {
//       width: '40%',
//       disableClose: true,
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       this.workOrdersService
//         .updateStatusOrder(orderId, {
//           status: statusId,
//           confirm_code: result.otp,
//         })
//         .subscribe({
//           next: (res) => {
//             this.toastr.success('Order On Progress successfully');
//             this.router.navigate(['/dashboard/work-orders']);
//           },
//           error: (err) => this.toastr.error('Failed to approve order'),
//         });
//     });
//   }

//   private onHoldWorkOrder(orderId: number, statusId: number): void {
//     const dialogRef = this.dialog.open(HoldReasonComponent, {
//       width: '50%',
//       disableClose: true,
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(result);
//       this.workOrdersService
//         .onHoldOrder(orderId, {
//           status: statusId,
//           ...result,
//         })
//         .subscribe({
//           next: (res) => {
//             this.toastr.success('Order On Progress successfully');
//             this.router.navigate(['/dashboard/work-orders']);
//           },
//           error: (err) => this.toastr.error('Failed to approve order'),
//         });
//     });
//   }
// }
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrdersService } from '../../services/work-orders.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgOtpInputComponent } from 'ng-otp-input';
import { HoldReasonComponent } from './hold-reason/hold-reason.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;

  orderData: any;
  materialTableData: any[] = [];
  spareTableData: any[] = [];
  orderId: string | null;
  btnsToShow: number[] = [];

  constructor(
    private workOrdersService: WorkOrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.getOrderById(+this.orderId);
    }
  }

  /** 🔹 Fetch order by ID */
  private getOrderById(id: number): void {
    this.workOrdersService.getOrder(id).subscribe({
      next: (res) => {
        this.orderData = res.data;
        this.canShowButton();
      },
      error: (err) => this.toastr.error(err.message, 'Error fetching order'),
    });
  }

  /** 🔹 Fetch materials */
  private getOrderMaterial(): void {
    this.workOrdersService.getMaterialByOrderId(107).subscribe({
      next: (res) => (this.materialTableData = res.data),
      error: (err) =>
        this.toastr.error(err.message, 'Error fetching materials'),
    });
  }

  /** 🔹 Fetch parts */
  private getOrderParts(): void {
    this.workOrdersService.getPartsByOrderId(107).subscribe({
      next: (res) => (this.spareTableData = res.data),
      error: (err) => this.toastr.error(err.message, 'Error fetching parts'),
    });
  }

  /** 🔹 Determine which buttons to show */
  private canShowButton(): void {
    const status = this.orderData?.status?.id;
    const isAdmin = this.authService.isAdmin();

    switch (status) {
      case 1:
      case 2:
        this.btnsToShow = isAdmin ? [8] : [3];
        break;
      case 3:
        this.btnsToShow = isAdmin ? [] : [4, 5];
        break;
      case 4:
        this.btnsToShow = isAdmin ? [] : [3];
        break;
      case 5:
        this.btnsToShow = isAdmin ? [13, 7] : [];
        break;
      case 13:
        this.btnsToShow = isAdmin ? [] : [6];
        break;
      case 7:
        this.btnsToShow = isAdmin ? [] : [3];
        break;
      default:
        this.btnsToShow = [];
        break;
    }
  }

  /** 🔹 Handle button actions */
  onAction(actionId: number): void {
    if (!this.orderId) return;
    const orderId = +this.orderId;
    const status = this.orderData?.status?.id;
    const isAdmin = this.authService.isAdmin();

    switch (status) {
      case 1:
      case 2:
      case 3:
      case 7:
        if (isAdmin && actionId === 8) {
          this.updateWorkOrderStatus(orderId, actionId);
        } else if (!isAdmin) {
          actionId === 4
            ? this.openHoldReasonDialog(orderId, actionId)
            : this.updateWorkOrderStatus(orderId, actionId);
        }
        break;

      case 4:
        if (!isAdmin) this.updateWorkOrderStatus(orderId, actionId);
        break;

      case 5:
        this.updateWorkOrderStatus(orderId, actionId);
        break;

      case 13:
        this.openVerifyDialog(orderId, actionId);
        break;

      default:
        break;
    }
  }

  /** 🔹 Get translated label key by status ID */
  getLabel(statusId: number): string {
    const statusLabels: Record<number, string> = {
      3: 'status.in_progress',
      4: 'status.on_hold',
      5: 'status.completed',
      6: 'status.closed',
      7: 'status.rejected',
      8: 'status.cancelled',
      13: 'status.close_confirmed',
    };

    return statusLabels[statusId] || 'status.unknown';
  }
  /** 🔹 Generate dynamic success message based on actionId */
  private getActionMessage(actionId: number): string {
    const messages: Record<number, string> = {
      3: 'Order started successfully',
      4: 'Order placed on hold successfully',
      5: 'Order completed successfully',
      6: 'Order closed successfully',
      7: 'Order rejected successfully',
      8: 'Order assigned successfully',
      13: 'Order close confirmed successfully',
    };

    return messages[actionId] || 'Order updated successfully';
  }
  /** 🔹 Service calls */
  private updateWorkOrderStatus(orderId: number, statusId: number): void {
    this.workOrdersService
      .updateStatusOrder(orderId, { status: statusId })
      .subscribe({
        next: () => {
          this.toastr.success(this.getActionMessage(statusId));
          this.router.navigate(['/dashboard/work-orders']);
        },
        error: () => this.toastr.error('Failed to update order'),
      });
  }

  private openVerifyDialog(orderId: number, statusId: number): void {
    const dialogRef = this.dialog.open(VerifyCodeComponent, {
      width: '40%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result?.otp) return;

      this.workOrdersService
        .updateStatusOrder(orderId, {
          status: statusId,
          confirm_code: result.otp,
        })
        .subscribe({
          next: () => {
            this.toastr.success(this.getActionMessage(statusId));
            this.router.navigate(['/dashboard/work-orders']);
          },
          error: () => this.toastr.error('Failed to verify order'),
        });
    });
  }

  private openHoldReasonDialog(orderId: number, statusId: number): void {
    const dialogRef = this.dialog.open(HoldReasonComponent, {
      width: '50%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.workOrdersService
        .onHoldOrder(orderId, { status: statusId, ...result })
        .subscribe({
          next: () => {
            this.toastr.success(this.getActionMessage(statusId));
            this.router.navigate(['/dashboard/work-orders']);
          },
          error: () => this.toastr.error('Failed to hold order'),
        });
    });
  }
}
