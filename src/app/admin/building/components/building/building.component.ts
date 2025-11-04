import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { EditBuildingComponent } from '../edit-building/edit-building.component';
import { debounceTime, Subject } from 'rxjs';
import { BuildingService } from '../../services/building.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddBuildingComponent } from '../add-building/add-building.component';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent {
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;
  buildingData: any

  private subject = new Subject<any>;
  constructor(
    private _BuildingService: BuildingService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _ToastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllBuildings();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.getAllBuildings()
      },
    })
  }
    // all buildings
  getAllBuildings() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
    };
    this.spinner.show()
    this._BuildingService.getBuildings().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        this.spinner.hide();
      }
    });
  }

  // add building
  openAddBuilding() {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      data: this.tableData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addBuilding(result)
      }
    });
  }

  addBuilding(data: FormGroup) {
    this._BuildingService.addBuilding(data.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Building Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Added Building');
      },
      complete: () => {
        this.getAllBuildings()
      }
    })
  }

  // edit building
  openEditBuilding(id: any) {
    const dialogRef = this.dialog.open(EditBuildingComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editBuilding(result, id)
      }
    });
  }

  editBuilding(data: FormGroup, id: number) {
    this._BuildingService.editBuilding(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Building Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Building');
      },
      complete: () => {
        this.getAllBuildings()
      }
    })
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.getAllBuildings();
  }

  // delete building
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
    this._BuildingService.deleteBuilding(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Building Deleted')
      },
      error: (err) => {
        this._ToastrService.error('Delete Building Failed')
      },
      complete: () => {
        this.getAllBuildings();
      }
    })
  }
}
