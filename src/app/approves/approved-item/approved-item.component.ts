import { Component, Inject, OnInit, Input } from '@angular/core';
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
} from '@angular/material/core';
import { now } from 'moment';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-item',
  templateUrl: './approved-item.component.html',
  styleUrls: ['./approved-item.component.scss']
})
export class ApprovedItemComponent implements OnInit {
  resultDetailForm!: FormGroup;
  actionBtn: string = 'บันทึก';
  title: string = 'บันทึกรายละเอียดผลการตรวจสอบ สด.43';
  isDelete!: boolean;
  isSaveDisable: boolean = true;
  isButtonEnable: boolean = false;
  isEditBtn: boolean = false;
  isDeleteBtn: boolean = false;
  isReadOnly: boolean = false;

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
    private dialogRef: MatDialogRef<ApprovedItemComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    _adapter.setLocale('th-TH');
  }

  ngOnInit(): void {
    this.resultDetailForm = this.formBuilder.group({
      request_id: [{ value: '', readonly: true }, Validators.required],
      agency: [{ value: '', disabled: true }, Validators.required],
      book_no: [{ value: '', disabled: true }, Validators.required],
      book_date: [{ value: '', disabled: true }, Validators.required],
      citizen_id: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      pre_name: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      first_name: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      last_name: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      dob: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      id: [{ value: '', readonly: !this.isReadOnly }],
      mi_district: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      mi_amphoe: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      mi_province: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      issue_no: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      order_no: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      result_mean: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      result_year: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      height: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      chest: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      weight: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      description: [{ value: '', readonly: !this.isReadOnly }],
      verify_date: [{ value: '', readonly: !this.isReadOnly }, Validators.required],
      result_comment: [''],
    });

    if (this.data.result) {
      for (let entry of this.data.result) {
        this.resultDetailForm.controls['citizen_id'].setValue(entry.citizen_id);
        this.resultDetailForm.controls['pre_name'].setValue(entry.pre_name);
        this.resultDetailForm.controls['first_name'].setValue(entry.first_name);
        this.resultDetailForm.controls['last_name'].setValue(entry.last_name);
        this.resultDetailForm.controls['dob'].setValue(entry.dob);
        this.resultDetailForm.controls['id'].setValue(entry.id);
        this.resultDetailForm.controls['mi_district'].setValue(entry.mi_district);
        this.resultDetailForm.controls['mi_amphoe'].setValue(entry.mi_amphoe);
        this.resultDetailForm.controls['mi_province'].setValue(entry.mi_province);
        this.resultDetailForm.controls['issue_no'].setValue(entry.issue_no);
        this.resultDetailForm.controls['order_no'].setValue(entry.order_no);
        this.resultDetailForm.controls['result_mean'].setValue(entry.result_mean);
        this.resultDetailForm.controls['result_year'].setValue(entry.result_year);
        this.resultDetailForm.controls['height'].setValue(entry.height);
        this.resultDetailForm.controls['chest'].setValue(entry.chest);
        this.resultDetailForm.controls['weight'].setValue(entry.weight);
        this.resultDetailForm.controls['description'].setValue(entry.description);
        this.resultDetailForm.controls['verify_date'].setValue(entry.verify_date);
        this.resultDetailForm.controls['result_comment'].setValue(entry.result_comment);
      }
    }
    if (!this.data.result) {
      this.resultDetailForm.controls['citizen_id'].setValue(null);
      this.resultDetailForm.controls['pre_name'].setValue(null);
      this.resultDetailForm.controls['first_name'].setValue(null);
      this.resultDetailForm.controls['last_name'].setValue(null);
      this.resultDetailForm.controls['dob'].setValue(null);
      this.resultDetailForm.controls['id'].setValue(null);
      this.resultDetailForm.controls['mi_district'].setValue(null);
      this.resultDetailForm.controls['mi_amphoe'].setValue(null);
      this.resultDetailForm.controls['mi_province'].setValue(null);
      this.resultDetailForm.controls['issue_no'].setValue(null);
      this.resultDetailForm.controls['order_no'].setValue(null);
      this.resultDetailForm.controls['result_mean'].setValue(null);
      this.resultDetailForm.controls['result_year'].setValue(null);
      this.resultDetailForm.controls['height'].setValue(null);
      this.resultDetailForm.controls['chest'].setValue(null);
      this.resultDetailForm.controls['weight'].setValue(null);
      this.resultDetailForm.controls['description'].setValue(null);
      this.resultDetailForm.controls['verify_date'].setValue(null);
      this.resultDetailForm.controls['result_comment'].setValue(null);
    }
    if (this.data.request) {
      for (let entry of this.data.request) {
        this.resultDetailForm.controls['request_id'].setValue(entry.id);
        this.resultDetailForm.controls['book_no'].setValue(entry.book_no);
        this.resultDetailForm.controls['book_date'].setValue(entry.book_date);
        this.resultDetailForm.controls['agency'].setValue(entry.agency);
      }
    }
    this.isSaveDisable = this.data.isSaveDisable;
    this.isButtonEnable = this.data.isbuttonEnable;
    this.isEditBtn = this.data.isEditBtn;
    this.isDeleteBtn = this.data.isDeleteBtn;
  }

  saveNstMiInfo(result: any) {
    // alert(result.citizen_id);
    if (this.resultDetailForm.valid) {
      this.api.postApproved(result).subscribe({
        next: (res) => {
          this.ngtoastservice.success({
            detail: 'Success',
            summary: 'Items add successfully',
            duration: 1500,
          });
          this.resultDetailForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          this.ngtoastservice.error({
            detail: 'Error',
            summary: 'Error while adding the items',
            duration: 1500,
          });
          console.log(this.resultDetailForm.value);
        },
      });
    }
  }

  updateResult() {
    console.log('update Request');
    this.api.putApproved(this.resultDetailForm.value).subscribe({
      next: (res) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Update successfully',
          duration: 1500,
        });
        this.resultDetailForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while updating the request',
          duration: 1500,
        });
      },
    });
  }

  deleteApproved() {
    this.api.deleteApproved(this.resultDetailForm.value).subscribe({
      next: (res) => {
        this.ngtoastservice.success({
          detail: 'Success',
          summary: 'Delete successfully',
          duration: 1500,
        });
        this.resultDetailForm.reset();
        this.dialogRef.close('delete');
      },
      error: () => {
        this.ngtoastservice.error({
          detail: 'Error',
          summary: 'Error while deleting',
          duration: 1500,
        });
        console.log(this.resultDetailForm.value);
      },
    });
  }

  onClear() {
    this.resultDetailForm.reset();
    this.initializeForm();
  }

  onClose() {
    this.dialog.closeAll();
  }

  initializeForm() {
    this.resultDetailForm.setValue({
      RequestID: '',
      BookRequest: '',
      RequestDate: '',
      RequestUnit: '',
      VerifyUser: '',
      Comment: '',
    });
  }
}