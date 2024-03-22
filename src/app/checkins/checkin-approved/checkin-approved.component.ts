import { Component, Inject, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ListService } from '../../services/list.service';
import { CheckIn } from '../../model/checkin';
import { ValidateService } from '../../services/validate.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { now } from 'moment';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-checkin-approved',
  templateUrl: './checkin-approved.component.html',
  styleUrls: ['./checkin-approved.component.scss']
})
export class CheckinApprovedComponent implements OnInit {
  resultVerify!: CheckIn[]
  checkInDetailForm!: FormGroup;
  approvedDetailForm!: FormGroup;
  actionBtn: string = 'บันทึก';
  title: string = 'ข้อมูลการตรวจสอบใบรับรองผลการตรวจเลือกฯ ( แบบ สด.43 )';
  titleCheckIn: string = 'การตรวจสอบใบรับรองผลการตรวจเลือกฯ --> เอกสาร';
  titleApproved: string = 'การตรวจสอบใบรับรองผลการตรวจเลือกฯ --> ระบบฐานข้อมูล';
  titleComment: string = 'ผลการตรวจสอบใบรับรองผลการตรวจเลือกฯ --> ระบบฐานข้อมูล';
  isDelete!: boolean;
  isSaveEnable: boolean = false;
  isButtonEnable: boolean = false;
  isEditBtn: boolean = false;
  isDeleteBtn: boolean = false;
  isReadOnly: boolean = false;
  isSearchEnable: boolean = false;

  provincesList!: any[];
  selectedOutPut!: any;
  selectedOutPutApproved!: any;


  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private ngtoastservice: NgToastService,
    private list: ListService,
    private dataService: DataService,
    private router: Router,
    private validate: ValidateService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CheckinApprovedComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    _adapter.setLocale('th-TH');
  }

  ngOnInit(): void {
    this.checkInDetailForm = this.formBuilder.group({
      request_id: [{ value: '', readonly: true }, Validators.required],
      agency: [{ value: '', readonly: true }, Validators.required],
      book_no: [{ value: '', readonly: true }, Validators.required],
      book_date: [{ value: '', readonly: true }, Validators.required],
      citizen_id: [{ value: '', }, Validators.required],
      pre_name: [{ value: '', }, Validators.required],
      first_name: [{ value: '', }, Validators.required],
      last_name: [{ value: '', }, Validators.required],
      dob: [{ value: '', }, Validators.required],
      id: [{ value: '', }, Validators.required],
      mi_district: [{ value: '', }, Validators.required],
      mi_amphoe: [{ value: '', }, Validators.required],
      mi_province: [{ value: '', }, Validators.required],
      issue_no: [{ value: '', }, Validators.required],
      order_no: [{ value: '', }, Validators.required],
      result_mean: [{ value: '', }, Validators.required],
      result_year: [{ value: '', }, Validators.required],
      height: [{ value: '', }],
      chest: [{ value: '', }],
      weight: [{ value: '', }],
      description: [{ value: '', }],
      verify_date: [{ value: '', }, Validators.required],
      result_verify: [{ value: '', }, Validators.required],
      result_comment: [''],
    });

    this.approvedDetailForm = this.formBuilder.group({
      checkin_id: [{ value: '', readonly: true }, Validators.required],
      request_id: [{ value: '', readonly: true }, Validators.required],
      agency: [{ value: '', readonly: true }, Validators.required],
      book_no: [{ value: '', readonly: true }, Validators.required],
      book_date: [{ value: '', readonly: true }, Validators.required],
      citizen_id: [{ value: '', }, Validators.required],
      pre_name: [{ value: '', }, Validators.required],
      first_name: [{ value: '', }, Validators.required],
      last_name: [{ value: '', }, Validators.required],
      dob: [{ value: '', }, Validators.required],
      // id: [{ value: '',  }],
      mi_district: ['-'],
      mi_amphoe: ['-'],
      mi_province: [{ value: '', }, Validators.required],
      issue_no: [{ value: '', }, Validators.required],
      order_no: [{ value: '', }, Validators.required],
      result_mean: [{ value: '', }, Validators.required],
      result_year: [{ value: '', }, Validators.required],
      height: ['-'],
      chest: ['-'],
      weight: ['-'],
      description: [{ value: '', }],
      verify_date: [{ value: '', }, Validators.required],
      result_verify: [{ value: '', }, Validators.required],
      result_comment: ['-'],
    });

    if (this.data.checkIn) {
      this.api.getCheckInById(this.data.checkIn).subscribe(res => {
        this.checkInDetailForm.controls['citizen_id'].setValue(res.citizen_id);
        this.checkInDetailForm.controls['pre_name'].setValue(res.pre_name);
        this.checkInDetailForm.controls['first_name'].setValue(res.first_name);
        this.checkInDetailForm.controls['last_name'].setValue(res.last_name);
        this.checkInDetailForm.controls['dob'].setValue(res.dob);
        this.checkInDetailForm.controls['id'].setValue(res.id);
        this.checkInDetailForm.controls['mi_district'].setValue(res.mi_district);
        this.checkInDetailForm.controls['mi_amphoe'].setValue(res.mi_amphoe);
        this.checkInDetailForm.controls['mi_province'].setValue(res.mi_province);
        this.checkInDetailForm.controls['issue_no'].setValue(res.issue_no);
        this.checkInDetailForm.controls['order_no'].setValue(res.order_no);
        this.checkInDetailForm.controls['result_mean'].setValue(res.result_mean);
        this.checkInDetailForm.controls['result_year'].setValue(res.result_year);
        this.checkInDetailForm.controls['height'].setValue(res.height);
        this.checkInDetailForm.controls['chest'].setValue(res.chest);
        this.checkInDetailForm.controls['weight'].setValue(res.weight);
        this.checkInDetailForm.controls['description'].setValue(res.description);
        this.checkInDetailForm.controls['verify_date'].setValue(res.verify_date);
        this.checkInDetailForm.controls['result_verify'].setValue(res.result_verify);
        this.checkInDetailForm.controls['result_comment'].setValue(res.result_comment);
        this.approvedDetailForm.controls['checkin_id'].setValue(res.id);
      });
    }

    if (this.data.approved != null) {
      this.api.getApprovedById(this.data.approved).subscribe(res => {

        if (res != null) {
          this.approvedDetailForm.controls['citizen_id'].setValue(res.citizen_id),
            this.approvedDetailForm.controls['pre_name'].setValue(res.pre_name),
            this.approvedDetailForm.controls['first_name'].setValue(res.first_name),
            this.approvedDetailForm.controls['last_name'].setValue(res.last_name),
            this.approvedDetailForm.controls['dob'].setValue(res.dob),
            this.approvedDetailForm.controls['mi_district'].setValue(res.mi_district),
            this.approvedDetailForm.controls['mi_amphoe'].setValue(res.mi_amphoe),
            this.approvedDetailForm.controls['mi_province'].setValue(res.mi_province),
            this.approvedDetailForm.controls['result_year'].setValue(res.result_year),
            this.approvedDetailForm.controls['height'].setValue(res.height);
          this.approvedDetailForm.controls['chest'].setValue(res.chest);
          this.approvedDetailForm.controls['weight'].setValue(res.weight);
          this.approvedDetailForm.controls['issue_no'].setValue(res.issue_no),
            this.approvedDetailForm.controls['order_no'].setValue(res.order_no),
            this.approvedDetailForm.controls['result_mean'].setValue(res.result_mean),
            this.approvedDetailForm.controls['description'].setValue(res.description),
            this.approvedDetailForm.controls['verify_date'].setValue(res.verify_date),
            this.approvedDetailForm.controls['result_verify'].setValue(res.result_verify)
          this.approvedDetailForm.controls['result_comment'].setValue(res.result_comment)

        } else {

          this.approvedDetailForm.controls['citizen_id'].setValue(null);
          this.approvedDetailForm.controls['pre_name'].setValue(null);
          this.approvedDetailForm.controls['first_name'].setValue(null);
          this.approvedDetailForm.controls['last_name'].setValue(null);
          this.approvedDetailForm.controls['dob'].setValue(null);
          this.approvedDetailForm.controls['id'].setValue(null);
          this.approvedDetailForm.controls['mi_district'].setValue(null);
          this.approvedDetailForm.controls['mi_amphoe'].setValue(null);
          this.approvedDetailForm.controls['mi_province'].setValue(null);
          this.approvedDetailForm.controls['issue_no'].setValue(null);
          this.approvedDetailForm.controls['order_no'].setValue(null);
          this.approvedDetailForm.controls['result_mean'].setValue(null);
          this.approvedDetailForm.controls['result_year'].setValue(null);
          this.approvedDetailForm.controls['height'].setValue(null);
          this.approvedDetailForm.controls['chest'].setValue(null);
          this.approvedDetailForm.controls['weight'].setValue(null);
          this.approvedDetailForm.controls['description'].setValue(null);
          this.approvedDetailForm.controls['verify_date'].setValue(null);
          this.approvedDetailForm.controls['result_verify'].setValue(null);
          this.approvedDetailForm.controls['result_comment'].setValue(null);

        }
      });
    }

    if (!this.data.checkIn) {
      this.checkInDetailForm.controls['citizen_id'].setValue(null);
      this.checkInDetailForm.controls['pre_name'].setValue(null);
      this.checkInDetailForm.controls['first_name'].setValue(null);
      this.checkInDetailForm.controls['last_name'].setValue(null);
      this.checkInDetailForm.controls['dob'].setValue(null);
      this.checkInDetailForm.controls['id'].setValue(null);
      this.checkInDetailForm.controls['mi_district'].setValue(null);
      this.checkInDetailForm.controls['mi_amphoe'].setValue(null);
      this.checkInDetailForm.controls['mi_province'].setValue(null);
      this.checkInDetailForm.controls['issue_no'].setValue(null);
      this.checkInDetailForm.controls['order_no'].setValue(null);
      this.checkInDetailForm.controls['result_mean'].setValue(null);
      this.checkInDetailForm.controls['result_year'].setValue(null);
      this.checkInDetailForm.controls['height'].setValue(null);
      this.checkInDetailForm.controls['chest'].setValue(null);
      this.checkInDetailForm.controls['weight'].setValue(null);
      this.checkInDetailForm.controls['description'].setValue(null);
      this.checkInDetailForm.controls['verify_date'].setValue(null);
      this.checkInDetailForm.controls['result_verify'].setValue(null);
      this.checkInDetailForm.controls['result_comment'].setValue(null);
    }

    if (this.data.request) {
      for (let entry of this.data.request) {
        this.checkInDetailForm.controls['request_id'].setValue(entry.id);
        this.checkInDetailForm.controls['book_no'].setValue(entry.book_no);
        this.checkInDetailForm.controls['book_date'].setValue(entry.book_date);
        this.checkInDetailForm.controls['agency'].setValue(entry.agency);

        this.approvedDetailForm.controls['request_id'].setValue(entry.id);
        this.approvedDetailForm.controls['book_no'].setValue(entry.book_no);
        this.approvedDetailForm.controls['book_date'].setValue(entry.book_date);
        this.approvedDetailForm.controls['agency'].setValue(entry.agency);
      }
    }
    this.approvedDetailForm.controls['result_year'].setValue(null);
    this.approvedDetailForm.controls['issue_no'].setValue(null);
    this.approvedDetailForm.controls['order_no'].setValue(null);
    this.approvedDetailForm.controls['result_mean'].setValue(null);
    this.approvedDetailForm.controls['result_verify'].setValue(null);
    this.approvedDetailForm.controls['result_comment'].setValue(null);
    this.approvedDetailForm.controls['description'].setValue(null);
  }

  SearchApprovedByCID(searchCID: any) {
    this.api.getVerifyResultByCitizen_id(searchCID.citizen_id).subscribe(res => {
      this.resultVerify = res;
      this.approvedDetailForm.controls['citizen_id'].setValue(res[0].citizen_id),
        this.approvedDetailForm.controls['pre_name'].setValue(res[0].pre_name),
        this.approvedDetailForm.controls['first_name'].setValue(res[0].first_name),
        this.approvedDetailForm.controls['last_name'].setValue(res[0].last_name),
        this.approvedDetailForm.controls['dob'].setValue(res[0].dob),
        this.approvedDetailForm.controls['mi_district'].setValue(res[0].mi_district),
        this.approvedDetailForm.controls['mi_amphoe'].setValue(res[0].mi_amphoe),
        this.approvedDetailForm.controls['mi_province'].setValue(res[0].mi_province),
        this.approvedDetailForm.controls['result_year'].setValue(res[0].result_year),
        this.approvedDetailForm.controls['height'].setValue(res[0].height),
        this.approvedDetailForm.controls['chest'].setValue(res[0].chest),
        this.approvedDetailForm.controls['weight'].setValue(res[0].weight),
        this.approvedDetailForm.controls['issue_no'].setValue(res[0].issue_no),
        this.approvedDetailForm.controls['order_no'].setValue(res[0].order_no),
        this.approvedDetailForm.controls['result_mean'].setValue(res[0].result_mean),
        this.approvedDetailForm.controls['description'].setValue(res[0].description)
    });
  }

  SearchApprovedByCitizen_idAndResult_year(citizen: any) {
    this.api.getVerifyResultByCitizen_idAndResult_year(citizen.citizen_id, citizen.result_year)
      .subscribe(
        (res) => {
          if (res) {
            this.approvedDetailForm.controls['citizen_id'].setValue(res.citizen_id);
            this.approvedDetailForm.controls['pre_name'].setValue(res.pre_name);
            this.approvedDetailForm.controls['first_name'].setValue(res.first_name);
            this.approvedDetailForm.controls['last_name'].setValue(res.last_name);
            this.approvedDetailForm.controls['dob'].setValue(res.dob);
            this.approvedDetailForm.controls['mi_district'].setValue(res.mi_district);
            this.approvedDetailForm.controls['mi_amphoe'].setValue(res.mi_amphoe);
            this.approvedDetailForm.controls['mi_province'].setValue(res.mi_province);
            this.approvedDetailForm.controls['result_year'].setValue(res.result_year);
            this.approvedDetailForm.controls['height'].setValue(res.height);
            this.approvedDetailForm.controls['chest'].setValue(res.chest);
            this.approvedDetailForm.controls['weight'].setValue(res.weight);
            this.approvedDetailForm.controls['issue_no'].setValue(res.issue_no);
            this.approvedDetailForm.controls['order_no'].setValue(res.order_no);
            this.approvedDetailForm.controls['result_mean'].setValue(res.result_mean);
            this.approvedDetailForm.controls['description'].setValue(res.description);
          } else {
            this.ngtoastservice.error({
              detail: 'Error',
              summary: 'Not found this record ',
              duration: 1500,
            });
          }
        },
        () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error please check API again',
            duration: 1500,
          });
        }
      );
  }

  saveCheckIn(checkIn: any) {
    if (this.checkInDetailForm.valid) {
      this.api.postCheckIn(checkIn).subscribe({
        next: (res) => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 1500,
          });
          this.checkInDetailForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error while adding the items',
            duration: 1500,
          });
          console.log(this.checkInDetailForm.value);
        },
      });
    }
  }

  updateApproved(approved: any) {
    this.api.putApproved(approved).subscribe({
      next: (res) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Update successfully',
          duration: 1500,
        });
        // this.checkInDetailForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while updating the check in',
          duration: 1500,
        });
      },
    });
  }

  deleteCheckIn() {
    this.api.deleteCheckIn(this.checkInDetailForm.value).subscribe({
      next: (res) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Delete successfully',
          duration: 1500,
        });
        this.checkInDetailForm.reset();
        this.dialogRef.close('delete');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while deleting',
          duration: 1500,
        });
        console.log(this.checkInDetailForm.value);
      },
    });
  }

  saveApproved(approved: any) {
    if (this.approvedDetailForm.valid) {
      this.api.postApproved(approved).subscribe({
        next: (res) => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 1500,
          });
          this.checkInDetailForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error while adding the items',
            duration: 1500,
          });
          console.log(this.checkInDetailForm.value);
        },
      });
    }
  }

  onClear() {
    this.checkInDetailForm.reset();
    this.initializeForm();
  }

  onClose() {
    this.dialog.closeAll();
  }

  initializeForm() {
    this.checkInDetailForm.setValue({
      RequestID: '',
      BookRequest: '',
      RequestDate: '',
      RequestUnit: '',
      VerifyUser: '',
      Comment: '',
    });
  }

  getProvinces() {
    this.api.getAllProvinces().pipe(
      map((res: any) => this.provincesList = res)
    ).subscribe();
  }

  getProvinceById(id: string) {
    this.api.getProvinceById(id).pipe(
      map((res: any) => this.provincesList = res.response)
    ).subscribe();
  }

  getSelectChangeValue(selectChangeValue: any) {
    this.data.provinceId = null;
    this.checkInDetailForm.controls['mi_province'].setValue(selectChangeValue);
    this.selectedOutPut = selectChangeValue;
  }

  getSelectChangeValueApproved(selectChangeValue: any) {
    this.data.provinceId = null;
    this.approvedDetailForm.controls['mi_province'].setValue(selectChangeValue);
    this.selectedOutPutApproved = selectChangeValue;
  }
}