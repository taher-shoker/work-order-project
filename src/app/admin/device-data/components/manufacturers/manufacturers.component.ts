import { Component, OnInit } from '@angular/core';
import { ManufacturersService } from './sevices/manufacturers.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss'],
})
export class ManufacturersComponent implements OnInit {
  currentLang = localStorage.getItem('lang');

  companies: any[] = [];
  filteredList: any[] = [];
  ManufacturersId: any;
  selectedCompany: string | null = null;
  searchValue: string = '';

  constructor(
    private manufacturersService: ManufacturersService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {
    this.ManufacturersId = activatedRoute.snapshot.paramMap.get('id');
    console.log(this.ManufacturersId);
  }

  ngOnInit(): void {
    this.allManufacturers();
  }

  allManufacturers(): void {
    this.manufacturersService.getAllManufacturers().subscribe({
      next: (res) => {
        console.log(res);
        this.companies = res.data;
        this.filteredList = res.data;
      },
    });
  }
  // filetr
  filterManufacturers(keyword: string) {
    const search = keyword.toLowerCase();

    this.filteredList = this.companies.filter(
      (item) =>
        item.name_en?.toLowerCase().includes(search) ||
        item.name_ar?.includes(keyword)
    );
  }

  // add manufacturer
  openAddManufacturer() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '40%',
      data: this.companies,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addManufacturers(result);
      }
    });
  }

  addManufacturers(data: FormGroup) {
    this.manufacturersService.addManufacturers(data.value).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Company Added Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Added Company');
      },
      complete: () => {
        this.allManufacturers();
      },
    });
  }

  // edit manufacturer
  openEditManufacturer(id: any) {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      width: '40%',
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editManufacturers(result, id);
      }
    });
  }

  editManufacturers(data: FormGroup, id: string) {
    this.manufacturersService.updateManufacturers(data.value, id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Company Update Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Update Company');
      },
      complete: () => {
        this.allManufacturers();
      },
    });
  }

  //  delete manufacturer
  openDeleteManufacturer(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCompany(result.id);
      }
    });
  }
  deleteCompany(id: any) {
    this.manufacturersService.deleteManufacturers(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.allManufacturers();
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}
