import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { SourcesService } from '../../services/sources.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddSourceComponent } from '../add-source/add-source.component';
import { FormGroup } from '@angular/forms';
import { EditSourceComponent } from '../edit-source/edit-source.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent {

   tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  private subject = new Subject<any>;
  constructor(private _SourcesService: SourcesService, private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllSources();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.getAllSources()
      },
    })
  }

  // all sources
  getAllSources() {
    this.spinner.show()
    this._SourcesService.getSources().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        this.spinner.hide()
      }
    });
  }

  // add source
  openAddSource() {
    const dialogRef = this.dialog.open(AddSourceComponent, {
      data: this.tableData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addSource(result)

      }
    });
  }

  addSource(data: FormGroup) {
    this._SourcesService.addSource(data.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Source Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Added Source');
      },
      complete: () => {
        this.getAllSources()
      }
    })
  }

  // edit source
  openEditSource(id: number) {
    const dialogRef = this.dialog.open(EditSourceComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editSource(result, id)
      }
    });
  }

  editSource(data: FormGroup, id: number) {
    this._SourcesService.editSource(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Source Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Source');
      },
      complete: () => {
        this.getAllSources()
      }

    })
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.getAllSources();
  }

  // delete source
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
    this._SourcesService.deleteSource(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Source Deleted')
      },
      error: (err) => {
        this._ToastrService.error('Delete Source Failed')
      },
      complete: () => {
        this.getAllSources();
      }
    })
  }

}
