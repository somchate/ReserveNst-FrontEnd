import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ListService } from '../../services/list.service';
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
  MatOption,
} from '@angular/material/core';
import { now } from 'moment';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { CheckIn } from '../../model/checkin';
import { Provinces } from '../../model/provinces';
import { MapType } from '@angular/compiler';
import { Observable, map } from 'rxjs';
import { ListProvincesComponent } from '../../list-provinces/list-provinces.component';

@Component({
  selector: 'app-checkin-item',
  templateUrl: './checkin-item.component.html',
  styleUrls: ['./checkin-item.component.scss'],
})
export class CheckInItemComponent implements OnInit {
  checkInDetailForm!: FormGroup;
  actionBtn: string = 'บันทึก';
  title: string = 'ข้อมูลการตรวจสอบใบรับรองผลการตรวจเลือกฯ ( แบบ สด.43 ) --> เอกสาร';
  titleCheckInResult: string = 'ข้อมูลทหารกองเกินและข้อมูลผลการตรวจเลือกฯ / ผลการจับสลาก ทางเอกสาร';
  titleCheckInComment: string = 'การตรวจสอบใบรับรองผลการตรวจเลือกฯ ในชั้นต้น';
  isDelete!: boolean;
  isSaveBtn: boolean = true;
  isEditBtn: boolean = false;
  isDeleteBtn: boolean = false;
  isReadOnly: boolean = false;

  provincesList!: any[];
  selectedOutPut!: any;
  selectedDocProvince!: any;
  selectedOwnerProvince!: any;

  // selectValue!: number;

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
    private dialogRef: MatDialogRef<CheckInItemComponent>,
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
      id: [{ value: '' }],
      mi_district: [{ value: '', }, Validators.required],
      mi_amphoe: [{ value: '', }, Validators.required],
      mi_province: [{ value: '', }, Validators.required],
      document_code: [{ value: '', }, Validators.required],
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
      doc_book_no: [''],
      doc_district: [''],
      doc_province: [''],
      doc_used_year: [''],
      sd43_owner_begin: [''],
      sd43_owner_end: [''],
      sd43_owner_province: [''],
      sd43_owner_year: [''],

    });

    if (this.data.checkIn) {
      // this.getProvinceById(this.data.result.mi_province);
      this.api.getCheckInById(this.data.checkIn).subscribe(res => {

        // this.getProvinceById(entry.mi_province);
        this.checkInDetailForm.controls['citizen_id'].setValue(res.citizen_id);
        this.checkInDetailForm.controls['pre_name'].setValue(res.pre_name);
        this.checkInDetailForm.controls['first_name'].setValue(res.first_name);
        this.checkInDetailForm.controls['last_name'].setValue(res.last_name);
        this.checkInDetailForm.controls['dob'].setValue(res.dob);
        this.checkInDetailForm.controls['id'].setValue(res.id);
        this.checkInDetailForm.controls['mi_district'].setValue(res.mi_district);
        this.checkInDetailForm.controls['mi_amphoe'].setValue(res.mi_amphoe);
        this.checkInDetailForm.controls['mi_province'].setValue(res.mi_province);

        this.checkInDetailForm.controls['document_code'].setValue(res.document_code);
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

        this.checkInDetailForm.controls['doc_book_no'].setValue(res.doc_book_no);
        this.checkInDetailForm.controls['doc_district'].setValue(res.doc_district);
        this.checkInDetailForm.controls['doc_province'].setValue(res.doc_province);
        this.checkInDetailForm.controls['doc_used_year'].setValue(res.doc_used_year);
        this.checkInDetailForm.controls['sd43_owner_begin'].setValue(res.sd43_owner_begin);
        this.checkInDetailForm.controls['sd43_owner_end'].setValue(res.sd43_owner_end);
        this.checkInDetailForm.controls['sd43_owner_province'].setValue(res.sd43_owner_province);
        this.checkInDetailForm.controls['sd43_owner_year'].setValue(res.sd43_owner_year);


      });
    }
    if (!this.data.result) {
      this.checkInDetailForm.controls['citizen_id'].setValue(null);
      this.checkInDetailForm.controls['pre_name'].setValue(null);
      this.checkInDetailForm.controls['first_name'].setValue(null);
      this.checkInDetailForm.controls['last_name'].setValue(null);
      this.checkInDetailForm.controls['dob'].setValue(null);
      this.checkInDetailForm.controls['id'].setValue(null);
      this.checkInDetailForm.controls['mi_district'].setValue(null);
      this.checkInDetailForm.controls['mi_amphoe'].setValue(null);
      this.checkInDetailForm.controls['mi_province'].setValue(null);
      this.checkInDetailForm.controls['document_code'].setValue(null);
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

      this.checkInDetailForm.controls['doc_book_no'].setValue(null);
      this.checkInDetailForm.controls['doc_district'].setValue(null);
      this.checkInDetailForm.controls['doc_province'].setValue(null);
      this.checkInDetailForm.controls['doc_used_year'].setValue(null);
      this.checkInDetailForm.controls['sd43_owner_begin'].setValue(null);
      this.checkInDetailForm.controls['sd43_owner_end'].setValue(null);
      this.checkInDetailForm.controls['sd43_owner_province'].setValue(null);
      this.checkInDetailForm.controls['sd43_owner_year'].setValue(null);
    }
    if (this.data.request) {
      for (let entry of this.data.request) {
        this.checkInDetailForm.controls['request_id'].setValue(entry.id);
        this.checkInDetailForm.controls['book_no'].setValue(entry.book_no);
        this.checkInDetailForm.controls['book_date'].setValue(entry.book_date);
        this.checkInDetailForm.controls['agency'].setValue(entry.agency);
      }
    }
    this.isSaveBtn = this.data.isSaveDisable;
    this.isEditBtn = this.data.isEditBtn;
    this.isDeleteBtn = this.data.isDeleteBtn;

    if (this.data.provinceId != null) {
      this.selectedOutPut = this.data.provinceId;
    }
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

  updateCheckIn() {
    this.api.putCheckIn(this.checkInDetailForm.value).subscribe({
      next: (res) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Update successfully',
          duration: 1500,
        });
        this.checkInDetailForm.reset();
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
    // this.selectValue= selectChangeValue;
    this.data.provinceId = null;
    this.checkInDetailForm.controls['mi_province'].setValue(selectChangeValue);
    this.selectedOutPut = selectChangeValue;
  }

  getSelectDocProvince(selectChangeValue: any) {
    this.checkInDetailForm.controls['doc_province'].setValue(selectChangeValue);
    this.selectedDocProvince = selectChangeValue;
  }

  getSelectOwnerProvince(selectChangeValue: any) {
    this.checkInDetailForm.controls['sd43_owner_province'].setValue(selectChangeValue);
    this.selectedOwnerProvince = selectChangeValue;
  }


}