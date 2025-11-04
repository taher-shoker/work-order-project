import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { EquipmentsService } from '../../services/equipments.service';
import { AddEquipmentComponent } from '../add-equipment/add-equipment.component';
import { EditEquipmentComponent } from '../edit-equipment/edit-equipment.component';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent {

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  private subject = new Subject<any>;
  constructor(private _EquipmentsService: EquipmentsService,
    private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllEquipments();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.getAllEquipments()
      },
    })
  }

  // all equipment
  getAllEquipments() {
    this.spinner.show()
    this._EquipmentsService.getEquipments().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        this.spinner.hide()
      }
    });
  }

  // add equipment
  openAddEquipment() {
    const dialogRef = this.dialog.open(AddEquipmentComponent, {
      data: this.tableData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addEquipment(result)
      }
    });
  }

  addEquipment(data: FormGroup) {
    this._EquipmentsService.addEquipment(data.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Equipment Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Added Equipment');
      },
      complete: () => {
        this.getAllEquipments()
      }
    })
  }

  // edit equipment
  openEditEquipment(id: number) {
    const dialogRef = this.dialog.open(EditEquipmentComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editEquipment(result, id)
      }
    });
  }

  editEquipment(data: FormGroup, id: number) {
    this._EquipmentsService.editEquipment(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Equipment Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Equipment');
      },
      complete: () => {
        this.getAllEquipments()
      }

    })
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.getAllEquipments();
  }

  // delete equipment
  deleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(result.id)
      }
    });
  }

  deleteItem(id: number) {
    this._EquipmentsService.deleteEquipment(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Equipment Deleted')
      },
      error: (err) => {
        this._ToastrService.error('Delete Equipment Failed')
      },
      complete: () => {
        this.getAllEquipments();
      }
    })
  }

}
