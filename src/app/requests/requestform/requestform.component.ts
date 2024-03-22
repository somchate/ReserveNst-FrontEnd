import { Component, Inject, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators, ControlContainer, NgModel, NgForm, MaxLengthValidator } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup'
import { ListService } from '../../services/list.service';
import { ValidateService } from '../../services/validate.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.scss'],
})
export class RequestformComponent implements OnInit {

  requestForm !: FormGroup;
  actionBtn: string = "บันทึก";
  title: string = "เพิ่มรายการขอตรวจสอบ สด.43";
  isDelete!: boolean;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private list: ListService, private validate: ValidateService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RequestformComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string) { _adapter.setLocale('th-TH') }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      // id: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      id: [''],
      book_no: ['', Validators.required],
      book_date: ['', Validators.required],
      agency: ['', Validators.required],
      verifier: ['', Validators.required],
      save_date: ['', Validators.required],
      comment: ['']
    })
    var name = localStorage.getItem("name");
    this.requestForm.controls['verifier'].setValue(name);
    if (this.data.isDelete == true) {
      this.isDelete = this.data.isDelete;
      this.actionBtn = "ยืนยันการลบ";
      this.title = "ยืนยันการลบรายการขอตรวจสอบ สด.43";
      this.requestForm.controls['id'].setValue(this.data.id);
      this.requestForm.controls['book_no'].setValue(this.data.book_no);
      this.requestForm.controls['book_date'].setValue(this.data.book_date);
      this.requestForm.controls['agency'].setValue(this.data.agency);
      this.requestForm.controls['verifier'].setValue(this.data.verifier);
      this.requestForm.controls['save_date'].setValue(this.data.save_date);
      this.requestForm.controls['comment'].setValue(this.data.comment);
    }
    if (this.data && !this.data.isDelete) {
      this.actionBtn = "บันทึกการแก้ไข";
      this.title = "แก้ไขรายการขอตรวจสอบ สด.43";
      this.requestForm.controls['id'].setValue(this.data.id);
      this.requestForm.controls['book_no'].setValue(this.data.book_no);
      this.requestForm.controls['book_date'].setValue(this.data.book_date);
      this.requestForm.controls['agency'].setValue(this.data.agency);
      this.requestForm.controls['verifier'].setValue(this.data.verifier);
      this.requestForm.controls['save_date'].setValue(this.data.save_date);
      this.requestForm.controls['comment'].setValue(this.data.comment);
    }
  }

  keyPressNumbers(event: any) {
    this.validate.keyPressNumbers(event);
  }

  addRequest() {
    if (!this.data) {

      if (this.requestForm.valid) {
        this.api.postRequest(this.requestForm.value)
          .subscribe({
            next: (res) => {
              this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 5000 })
              this.requestForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 5000 })
              console.log(this.requestForm.value)
            }
          })
      }
    } else {
      console.log("else do update")
      this.updateRequest()
    }
  }

  updateRequest() {
    console.log("update Request")
    this.api.putRequest(this.requestForm.value)
      .subscribe({
        next: (res) => {
          this.ngtoastservice.success({ detail: "Success", summary: "Update successfully", duration: 5000 })
          this.requestForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.ngtoastservice.error({ detail: "Error", summary: "Error while updating the request", duration: 5000 })
        }
      })
  }

  deleteRequest() {
    this.api.deleteRequest(this.requestForm.value)
      .subscribe({
        next: (res) => {
          this.ngtoastservice.success({ detail: "Success", summary: "Delete successfully", duration: 5000 })
          this.requestForm.reset();
          this.dialogRef.close('delete');
        },
        error: () => {
          this.ngtoastservice.error({ detail: "Error", summary: "Error while deleting", duration: 5000 })
          console.log(this.requestForm.value)
        }
      })
  }

  onClear() {
    this.requestForm.reset();
    this.initializeForm();
  }

  onClose() {
    this.dialog.closeAll();
  }

  initializeForm() {
    this.requestForm.setValue({
      id: '',
      book_no: '',
      book_date: '',
      agency: '',
      Verifier: '',
      save_date: '',
      Comment: '',
    })
  }

  // changeDatePicker() { }

  // Thai() {
  //   this._locale = 'th';
  //   this._adapter.setLocale(this._locale);
  // }

  // getDateFormatString(): string {
  //   if (this._locale === 'th-TH') {
  //     return 'DD/MM/YYYY';
  //   } else if (this._locale === 'es') {
  //     return 'DD/MM/YYYY';
  //   }
  //   return '';
  // }
}