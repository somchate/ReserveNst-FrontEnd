import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInItemComponent } from '../checkin-item/checkin-item.component';
import { map } from 'rxjs';
import { DataService } from '../../services/data.service';
import { CheckIn } from '../../model/checkin';

export interface RequestVerify {
  id: any;
  book_no: any;
  book_date: any;
  agency: any;
}

const ELEMENT_DATA: CheckIn[] = [];

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckInComponent implements OnInit {
  isSaveDisable: boolean = true;
  isButtonEnable: boolean = true;
  isDeleteBtn: boolean = false;
  selection = new SelectionModel<CheckIn>(true, []);
  title: string =
    'รายการตรวจสอบใบรับรองผลการตรวจเลือกฯ ( แบบ สด.43 ) --> เอกสาร';
  checkInForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, Validators.required),
    book_no: new FormControl({ value: '', disabled: true }),
    book_date: new FormControl({ value: '', disabled: true }),
    agency: new FormControl({ value: '', disabled: true }),
  });
  checkInAddForm = new FormGroup({
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
    // 'mi_amphoe',
    // 'mi_province',
    // 'height',
    // 'chest',
    // 'weight',
    'issue_no',
    'order_no',
    'result_year',
    'result_mean',
    'description',
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
  provinceId: any;
  selected: any;

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
    this.checkInForm.controls['id'].setValue(this.data.id);
    this.checkInForm.controls['book_no'].setValue(this.data.book_no);
    this.checkInForm.controls['book_date'].setValue(this.data.book_date);
    this.checkInForm.controls['agency'].setValue(this.data.agency);
    this.id = this.data.id;
    this.book_no = this.data.book_no;
    this.book_date = this.data.book_date;
    this.agency = this.data.agency;
    this.initDataSource(this.data.id);
  }

  initDataSource(id: number) {
    this.api
      .getCheckInByRequestId(id)
      .pipe(
        map((verifyResultData: CheckIn[]) => {
          this.selection = new SelectionModel<CheckIn>(true, []);
          this.dataSource = new MatTableDataSource<CheckIn>(verifyResultData);
          this.clickedRows = new Set<CheckIn>();
        })
      )
      .subscribe();
  }

  initSearchDataSource(id: number) {
    this.api
      .getCheckInByRequestId(id)
      .pipe(
        map((verifyResultData: CheckIn[]) => {
          this.selection = new SelectionModel<CheckIn>(true, []);
          this.dataSource = new MatTableDataSource<CheckIn>(verifyResultData);
          this.clickedRows = new Set<CheckIn>();
        })
      )
      .subscribe();
  }

  SearchCheckInByRequestId(requestId: any) {
    // if (this.checkInForm.valid) {
    this.initSearchDataSource(requestId.id);
    // }
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

  onCheckClick(row: any, checkInForm: any) {
    this.selection.clear();
    this.selected = row.id;
    this.provinceId = row.mi_province;
    if (this.selection.selected) {
      // this.requestVerify.add({
      //   id: this.id,
      //   book_no: this.book_no,
      //   book_date: this.book_date,
      //   agency: this.agency,
      // });
      this.isSaveDisable = false;
      this.isButtonEnable = true;
    } else {
      this.isSaveDisable = true;
      this.isButtonEnable = false;
    }
  }

  showCheckInItem(row: any) {
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '80%',
        data: {
          checkIn: row.id,
          request: this.requestVerify,
          provinceId: this.provinceId,
          isSaveDisable: true,
          isDeleteBtn: false,
          isEditBtn: true,
        },
      })
      .afterClosed()

      .subscribe((val) => {
        this.clickedRows.clear;
        this.onClear();
        if (val == 'save' || 'update') {
          // this.getRequests();
          this.initDataSource(this.id);
        }
      });
  }

  showConfirmDel() {
    this.isDeleteBtn = true;
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '75%',
        data: {
          checkIn: this.selected,
          request: this.requestVerify,
          isSaveDisable: !this.isSaveDisable,
          isDeleteBtn: this.isDeleteBtn,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.clickedRows.clear;
        this.onClear();
        if (val == 'delete') {
          // this.getRequests();
          this.initDataSource(this.id);
        }
      });
  }

  createCheckIn() {
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(CheckInItemComponent, {
        width: '75%',
        data: {
          result: null,
          request: this.requestVerify,
          isSaveDisable: false,
          isEditBtn: false,
          isDeleteBtn: false,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          // this.getRequests();
          this.initDataSource(this.id);
        }
      });
  }

  homeBtn() {
    this.router.navigate(['requestlist']);
  }

  onClose() {
    this.dialog.closeAll();
  }
}