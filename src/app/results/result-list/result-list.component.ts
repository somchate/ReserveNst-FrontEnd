import { DataService } from '../../services/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInItemComponent } from '../../checkins/checkin-item/checkin-item.component';
import { map } from 'rxjs';
import { FileComponent } from '../../file/file.component';
import { Router } from '@angular/router';

export interface CheckIn {
  id: number;
  citizen_id: string;
  pre_name: string;
  first_name: string;
  last_name: string;
  dob: Date;
  mi_district: string;
  mi_amphoe: string;
  mi_province: string;
  weight: number;
  height: number;
  chest: string;
  description: string;
  issue_no: string;
  order_no: string;
  result_year: string;
  result_mean: string;
  result_comment: string;
}

export interface RequestVerify {
  id: any;
  book_no: any;
  book_date: any;
  agency: any;
}

const ELEMENT_DATA: CheckIn[] = [];

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  isSaveDisable: boolean = true;
  isButtonEnable: boolean = true;
  isEditBtn: boolean = true;
  isDeleteBtn: boolean = true;
  selection = new SelectionModel<CheckIn>(true, []);
  title: string = 'รายการผลตรวจสอบ สด.43';
  requestForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, Validators.required),
    book_no: new FormControl({ value: '', disabled: true }),
    book_date: new FormControl({ value: '', disabled: true }),
    agency: new FormControl({ value: '', disabled: true }),
  });
  resultAddForm = new FormGroup({
    citizen_id: new FormControl('', Validators.required),
    result_year: new FormControl(''),
  });

  displayedColumns: string[] = [
    'select',
    'citizen_id',
    'pre_name',
    'first_name',
    'last_name',
    'dob',
    // 'mi_district',
    'mi_amphoe',
    'mi_province',
    // 'height',
    // 'chest',
    // 'weight',
    'issue_no',
    'order_no',
    'result_year',
    'result_mean',
    'result_comment',
    'print',
  ];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<CheckIn>(ELEMENT_DATA);
  clickedRows = new Set<CheckIn>();
  requestVerify = new Set<RequestVerify>();
  id!: number;
  book_no!: string;
  book_date!: Date;
  agency!: string;
  data: any;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any
    private dataService: DataService
  ) {
    this.selection.changed.subscribe((item) => {
      this.isButtonEnable = this.selection.selected.length == 0;
    });
  }

  ngOnInit(): void {
    this.data = this.dataService.data;
    this.requestForm.controls['id'].setValue(this.data.id);
    this.requestForm.controls['book_no'].setValue(this.data.book_no);
    this.requestForm.controls['book_date'].setValue(this.data.book_date);
    this.requestForm.controls['agency'].setValue(this.data.agency);
    this.id = this.data.id;
    this.book_no = this.data.book_no;
    this.book_date = this.data.book_date;
    this.agency = this.data.agency;
    this.initSearchDataSource(this.data.id);
  }

  initDataSource() {
    this.api
      .getAllVerify()
      .pipe(
        map((verifyResultData: CheckIn[]) => {
          this.selection = new SelectionModel<CheckIn>(true, []);
          this.dataSource = new MatTableDataSource<CheckIn>(
            verifyResultData
          );
          this.clickedRows = new Set<CheckIn>();
        })
      )
      .subscribe();
  }

  initSearchDataSource(request_id: number) {
    this.api
      .getResultByRequestId(request_id)
      .pipe(
        map((verifyResultData: CheckIn[]) => {
          this.selection = new SelectionModel<CheckIn>(true, []);
          this.dataSource = new MatTableDataSource<CheckIn>(
            verifyResultData
          );
          this.clickedRows = new Set<CheckIn>();
        })
      )
      .subscribe();
  }

  SearchByCitizenID(searchCID: any) {
    if (this.resultAddForm.valid) {
      this.initSearchDataSource(searchCID.citizen_id);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isButtonEnable = true;
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
      this.isButtonEnable = false;
    }
  }

  onClear() {
    this.selection.clear();
    this.isSaveDisable = true;
    this.isButtonEnable = true;
  }

  onCheckClick(row: any, requestForm: any) {
    this.selection.clear();
    if (this.selection.selected) {
      this.clickedRows.add({
        id: row.id,
        citizen_id: row.citizen_id,
        pre_name: row.pre_name,
        first_name: row.first_name,
        last_name: row.last_name,
        dob: row.dob,
        mi_district: row.mi_district,
        mi_amphoe: row.mi_amphoe,
        mi_province: row.mi_province,
        height: row.height,
        chest: row.chest,
        weight: row.weight,
        description: row.description,
        issue_no: row.issue_no,
        order_no: row.order_no,
        result_year: row.result_year,
        result_mean: row.result_mean,
        result_comment: row.result_comment,
      });
      this.requestVerify.add({
        id: this.id,
        book_no: this.book_no,
        book_date: this.book_date,
        agency: this.agency,
      });
      this.isSaveDisable = false;
      this.isButtonEnable = true;
    } else {
      this.isSaveDisable = true;
      this.isButtonEnable = false;
    }
  }

  showResultDetail() {
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '60%',
        data: {
          result: this.clickedRows,
          request: this.requestVerify,
          isSaveDisable: !this.isSaveDisable,
          isButtonEnable: !this.isButtonEnable,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          // this.getRequests();
        }
        this.onClear();
      });
  }

  showResultEdit() {
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '60%',
        data: {
          result: this.clickedRows,
          request: this.requestVerify,
          isSaveDisable: !this.isSaveDisable,
          isDeleteBtn: !this.isDeleteBtn,
          isEditBtn: this.isEditBtn,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.ngOnInit();
        }
        this.onClear();
      });
  }

  showResultDelete() {
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '60%',
        data: {
          result: this.clickedRows,
          request: this.requestVerify,
          isSaveDisable: !this.isSaveDisable,
          isDeleteBtn: this.isDeleteBtn,
          isEditBtn: !this.isEditBtn,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'delete') {
          this.ngOnInit();
        }
        this.onClear();
      });
  }

  onClose() {
    this.dialog.closeAll();
    this.router.navigate(['resultlist']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCheck43Report(id: any) {
    this.loading = !this.loading;
    this.dialog
      .open(FileComponent, {
        width: '40%',
        data: id,
      })
      .afterClosed()
      .subscribe((val) => { });
    this.loading = !this.loading;
  }
}
