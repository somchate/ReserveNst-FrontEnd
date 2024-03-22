import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  ControlContainer,
  NgModel,
  NgForm,
  MaxLengthValidator,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ListService } from '../services/list.service';
import { ValidateService } from '../services/validate.service';
import { PersonComponent } from '../person/person.component';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  listItemsForm!: UntypedFormGroup;
  itemForm!: UntypedFormGroup;
  displayedColumns: string[] = [
    'RequestID',
    'CitizenID',
    'OrderID',
    'FirstName',
    'LastName',
    'MilitaryAddress',
    'IssueNo',
    'Height',
    'Chest',
    'Weight',
    'ResultCertificate',
    'ResultYear',
    'VerifyDate',
    'Comment',
  ];
  dataSource!: MatTableDataSource<any>;
  typebudgetlist: any[] = [];
  unitlist: any[] = [];
  actionBtn: string = 'บันทึก';
  loading: boolean = false;
  unitid!: string;
  showlistunit: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private formBuilder: UntypedFormBuilder,
    private ngtoastservice: NgToastService,
    private list: ListService,
    private validate: ValidateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listItemsForm = this.formBuilder.group({
      RequestID: ['', Validators.required],
      CitizenID: ['', Validators.required],
      OrderID: ['', Validators.required],
      PreName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MilitaryDistrict: ['', Validators.required],
      MilitaryProvince: ['', Validators.required],
      IssueNo: ['', Validators.required],
      Height: ['', Validators.required],
      Chest: ['', Validators.required],
      Weight: ['', Validators.required],
      ResultCertificate: ['', Validators.required],
      ResultYear: ['', Validators.required],
      VerifyDate: ['', Validators.required],
      Comment: ['', Validators.required],
    });
    this.itemForm = this.formBuilder.group({
      history_id: ['', Validators.required],
      history_withdraw_id: ['', Validators.required],
      history_budget_year: ['', Validators.required],
      type_id: ['', Validators.required],
      type_name: ['', Validators.required],
      unit_brief_name: ['', Validators.required],
      history_comment: ['', Validators.required],
      action: ['', Validators.required],
    });

    this.unitid != localStorage.getItem('unitid');
    console.log('history test unitid' + localStorage.getItem('unitid'));
    // this.getTypeBudgetList();
    // this.getUnitList();
    this.getItems();
  }

  addItem() {
    if (this.itemForm.valid) {
      this.api.postHistory(this.itemForm.value).subscribe({
        next: (res) => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 5000,
          });
          this.getItems();
        },
        error: () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error while adding the items',
            duration: 5000,
          });
          console.log(this.itemForm.value);
        },
      });
    }
  }

  getTypeBudgetList(): any {
    this.list.getTypeBudgetList().subscribe((res: any[]) => {
      this.typebudgetlist = res;
    });
  }

  getUnitList(): any {
    this.list.getUnitList().subscribe((res: any[]) => {
      this.unitlist = res;
    });
  }

  getItems(): any {
    this.loading = true;
    this.api.getItems().subscribe({
      next: (res) => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.loading = false;
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error While Fetching',
          duration: 5000,
        });
      },
    });
  }

  onClear() {
    this.itemForm.reset();
    this.initializeForm();
  }

  initializeForm() {
    this.itemForm.setValue({
      history_id: '',
      history_withdraw_id: '',
      history_budget_year: '',
      history_type_id: '',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  keyPressNumbers(event: any) {
    this.validate.keyPressNumbers(event);
  }

  openPersonDialog(
    wid: string,
    budgetyear: string,
    typeid: string,
    unitid: string,
    showlistunit: boolean,
    title: string
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      wid: wid,
      title: 'Angular For Beginners',
      width: '40%',
    };
    // this.dialog.open(PersonComponent, dialogConfig);
    console.log('withdrawid is :' + wid);
    this.dialog.open(PersonComponent, {
      width: '40%',
      data: {
        wid: wid,
        budgetyear: budgetyear,
        typeid: typeid,
        unitid: unitid,
        showlistunit: showlistunit,
        title: title,
        checkboxdisabled: true,
      },
    });
  }

  openPersonToSelectDialog(
    unitid: string,
    wid: string,
    budgetyear: string,
    showlistunit: boolean,
    title: string
  ) {
    this.showlistunit = true;
    const dialogConfig = new MatDialogConfig();

    // this.dialog.open(PersonComponent, dialogConfig);

    this.dialog.open(PersonComponent, {
      width: '40%',
      data: {
        unitid: unitid,
        wid: wid,
        budgetyear: budgetyear,
        showlistunit: showlistunit,
        title: title,
        checkboxdisabled: false,
      },
    });
  }
}
