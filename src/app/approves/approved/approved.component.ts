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
import { ApprovedItemComponent } from '../approved-item/approved-item.component';
import { map } from 'rxjs';
import { DataService } from '../../services/data.service';
import { CheckInItemComponent } from '../../checkins/checkin-item/checkin-item.component';
import { CheckinApprovedComponent } from '../../checkins/checkin-approved/checkin-approved.component';
// import { CheckIn } from '../checkin/checkin.component';
import { Approved } from '../../model/approved';
import { CheckIn } from '../../model/checkin';

export interface RequestVerify {
  id: any;
  book_no: any;
  book_date: any;
  agency: any;
}

const ELEMENT_DATA_CHECKIN: CheckIn[] = [];
const ELEMENT_DATA_APPROVED: Approved[] = [];

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss'],
})
export class ApprovedComponent implements OnInit {
  isSave: boolean = true;
  isButtonEnable: boolean = true;
  isDeleteBtn: boolean = false;
  isDelete: boolean = false;
  isUpdate: boolean = false;
  isSearchDisable: boolean = true;
  selectionApproved = new SelectionModel<Approved>(true, []);
  selectionCheckIn = new SelectionModel<CheckIn>(true, []);
  title: string =
    'รายการผลการตรวจสอบใบรับรองผลการตรวจเลือกฯ ( แบบ สด.43) --> เอกสาร-ระบบฐานข้อมูล ';
  titleCheckIn: string = 'ผลการตรวจสอบใบรับรองผลการตรวจเลือกฯ --> เอกสาร';
  titleApproved: string = 'ผลการตรวจสอบใบรับรองผลการตรวจเลือกฯ --> ระบบฐานข้อมูล';

  requestVerifyForm = new FormGroup({
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
  dataSourceCheckIn = new MatTableDataSource<CheckIn>(ELEMENT_DATA_CHECKIN);
  dataSourceApproved = new MatTableDataSource<Approved>(ELEMENT_DATA_APPROVED);
  clickedRowCheckIn = new Set<CheckIn>();
  clickedRowApproved = new Set<Approved>();
  requestVerify = new Set<RequestVerify>();
  id!: number;
  book_no!: string;
  book_date!: Date;
  agency!: string;
  data: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any
    private dataService: DataService,
    private router: Router
  ) {
    this.selectionApproved.changed.subscribe((item) => {
      this.isButtonEnable = this.selectionApproved.selected.length == 0;
    });
  }

  ngOnInit(): void {
    this.data = this.dataService.data;
    this.requestVerifyForm.controls['id'].setValue(this.data.id);
    this.requestVerifyForm.controls['book_no'].setValue(this.data.book_no);
    this.requestVerifyForm.controls['book_date'].setValue(this.data.book_date);
    this.requestVerifyForm.controls['agency'].setValue(this.data.agency);
    this.id = this.data.id;
    this.book_no = this.data.book_no;
    this.book_date = this.data.book_date;
    this.agency = this.data.agency;

    this.initDataSourceCheckIn(this.data.id);
    this.initDataSourceApproved(this.data.id);
  }

  initDataSourceCheckIn(id: number) {
    this.api
      // .getCheckInByRequestId(id)
      .getCheckInByRequestIdNotIn(id)
      .pipe(
        map((checkInData: CheckIn[]) => {
          this.selectionCheckIn = new SelectionModel<CheckIn>(true, []);
          this.dataSourceCheckIn = new MatTableDataSource<CheckIn>(checkInData);
          this.clickedRowCheckIn = new Set<CheckIn>();
        })
      )
      .subscribe();
  }

  initDataSourceApproved(id: number) {
    this.api
      .getApprovedByRequestId(id)
      .pipe(
        map((approvedData: Approved[]) => {
          this.selectionApproved = new SelectionModel<Approved>(true, []);
          this.dataSourceApproved = new MatTableDataSource<Approved>(
            approvedData
          );
          this.clickedRowApproved = new Set<Approved>();
        })
      )
      .subscribe();
  }

  initSearchDataSource(citizen_id: string) {
    this.api
      .getVerifyResultByCitizen_id(citizen_id)
      .pipe(
        map((approvedData: Approved[]) => {
          this.selectionApproved = new SelectionModel<Approved>(true, []);
          this.dataSourceApproved = new MatTableDataSource<Approved>(
            approvedData
          );
          this.clickedRowApproved = new Set<Approved>();
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
    const numSelected = this.selectionApproved.selected.length;
    const numRows = this.dataSourceApproved.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selectionApproved.clear();
      this.isButtonEnable = true;
    } else {
      this.dataSourceApproved.data.forEach((row) =>
        this.selectionApproved.select(row)
      );
      this.isButtonEnable = false;
    }
  }

  onClear() {
    this.selectionApproved.clear();
    this.isSave = true;
    this.isButtonEnable = true;
  }

  onCheckClick(row: any, requestForm: any) {
    this.selectionApproved.clear();
    if (this.selectionApproved.selected) {
      this.clickedRowApproved.add({
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
        issue_no: row.issue_no,
        order_no: row.order_no,
        result_year: row.result_year,
        result_mean: row.result_mean,
        description: row.description,
        verify_date: row.verify_date,
        result_comment: row.result_comment,
      });
      // this.requestVerify.add({
      //   id: this.id,
      //   book_no: this.book_no,
      //   book_date: this.book_date,
      //   agency: this.agency,
      // });
      this.isSave = false;
      this.isButtonEnable = true;
    } else {
      this.isSave = true;
      this.isButtonEnable = false;
    }
  }

  showCheckInApproved(row: any, requestForm: any) {
    this.onClear();
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(CheckinApprovedComponent, {
        width: '95%',
        data: {
          approved: row.id,
          checkIn: row.id,
          request: this.requestVerify,
          isSave: this.isSave,
          isDelete: !this.isDelete,
          isUpdate: !this.isUpdate,
          isSearchDisable: !this.isSearchDisable
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.onClear();
        this.clickedRowApproved.clear();
        this.clickedRowCheckIn.clear();
        if (val == 'save') {
          // this.getRequests();
          this.initDataSourceCheckIn(this.id);
          this.initDataSourceApproved(this.id);
        }
      });
  }

  showResultCheckInApproved(row: any, requestForm: any) {
    this.selectionApproved.clear();
    this.onClear()
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(CheckinApprovedComponent, {
        width: '95%',
        data: {
          approved: row.id,
          checkIn: row.id,
          request: this.requestVerify,
          isSave: !this.isSave,
          isDelete: !this.isDelete,
          isUpdate: this.isUpdate,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.onClose();
        this.clickedRowApproved.clear();
        this.clickedRowCheckIn.clear();
        if (val == 'update') {
          // this.getRequests();
          this.initDataSourceCheckIn(this.id);
          this.initDataSourceApproved(this.id);
        }
      });
  }

  showApprovedItem() {
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(ApprovedItemComponent, {
        width: '75%',
        data: {
          result: this.clickedRowApproved,
          request: this.requestVerify,
          isSave: this.isSave,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.onClear();
        this.selectionApproved.clear();
        this.isSave = true;
        this.isButtonEnable = true;
        if (val == 'update') {
          // this.getRequests();
        }
      });
  }

  showAddNewDetail() {
    this.requestVerify.add({
      id: this.id,
      book_no: this.book_no,
      book_date: this.book_date,
      agency: this.agency,
    });
    this.dialog.closeAll();
    this.dialog
      .open(ApprovedItemComponent, {
        width: '60%',
        data: {
          result: null,
          request: this.requestVerify,
          isSaveDisable: this.isSave,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          // this.getRequests();
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
      .open(ApprovedItemComponent, {
        width: '75%',
        data: {
          result: this.clickedRowApproved,
          request: this.requestVerify,
          isSaveDisable: !this.isSave,
          isDeleteBtn: this.isDeleteBtn,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        this.onClear();
        if (val == 'delete') {
          // this.getRequests();
          this.initDataSourceCheckIn(this.id);
          this.initDataSourceApproved(this.id);
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
