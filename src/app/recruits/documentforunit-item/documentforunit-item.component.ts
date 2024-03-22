import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProvinceslistComponent } from 'src/app/list/provinceslist/provinceslist.component';
import { UnitlistComponent } from 'src/app/list/unitlist/unitlist.component';
import { UnittrainlistComponent } from 'src/app/list/unittrainlist/unittrainlist.component';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { ThYearPipe } from 'src/app/pipes/th-year.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { NgToastService } from 'ng-angular-popup';
import { RequestformComponent } from 'src/app/requests/requestform/requestform.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';
import { ValidateService } from 'src/app/services/validate.service';
import { departmentlistComponent } from "../../list/departmentlist/departmentlist.component";

@Component({
  selector: 'app-documentforunit-item',
  standalone: true,
  templateUrl: './documentforunit-item.component.html',
  styleUrls: ['./documentforunit-item.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, FlexLayoutModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    ProvinceslistComponent, UnittrainlistComponent, UnitlistComponent, ThYearPipe, departmentlistComponent]
})
export class DocumentforunitItemComponent {
  documentForm !: FormGroup;
  actionBtn: string = "บันทึก";
  title: string = "รายการรับหนังสือขอนำตัวขึ้นทะเบียนและนำปลดฯ";
  titleForUnit: string = "ส่วนการบันทึกข้อมูลของหน่วยในสายงานสัสดี";
  isUnAccept!: boolean;
  selectedProvinceOutPut: string | undefined;
  selectedUnitTrainOutPut: any;
  selectedUnitOutPut: any;
  passUnitTrainToProvince: any;
  selectProvinceDisabled: string | undefined;
  sd3Year!: String;
  docNo!: string;
  docDate!: string;
  selectedDepartmentOutPut!: String;
  departmentSelectDisable: String = "false";
  isunAssignMiSignNo!: string;

  receiveShortName!: string;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private list: ListService, private validate: ValidateService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RequestformComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private dataservice: DataService) {
    _adapter.setLocale('th-TH'),

      this.documentForm = this.formBuilder.group({
        id: [''],
        doc_NO: ['', Validators.required],
        doc_NAME: ['', Validators.required],
        doc_DATE: ['', Validators.required],
        doc_DEPARTMENT_ID: ['', Validators.required],
        recruit_DOC_NO: [''],
        recruit_DOC_DATE: [''],
        recruit_UNIT_ID: ['', Validators.required],
        recruit_UNIT_SHORTNAME: ['', Validators.required],
        recruit_PROVINCE_ID: ['', Validators.required],
        unit_TRAIN_ID: ['', Validators.required],
        unit_TRAIN_SHORTNAME: ['', Validators.required],
        at_YEAR: ['', Validators.required],
        user_VERIFY: ['', Validators.required],
        doc_NOTE: ['']
      })
  }

  ngOnInit(): void {
    if (this.data.docId) {
      this.findDocumentById(this.data.docId);
      if (this.data.isUnAccept) {
        this.isUnAccept = this.data.isUnAccept;
        this.actionBtn = "ยกเลิกรับหนังสือ";
      }
    }
  }

  findDocumentById(docId: any) {
    this.api.getDocumentById(docId).subscribe(res => {
      this.documentForm.controls['id'].setValue(res.id);
      this.documentForm.controls['doc_NO'].setValue(res.doc_NO);
      this.documentForm.controls['doc_NAME'].setValue(res.doc_NAME);
      this.documentForm.controls['doc_DATE'].setValue(res.doc_DATE);
      this.documentForm.controls['doc_DEPARTMENT_ID'].setValue(res.doc_DEPARTMENT_ID);
      this.documentForm.controls['recruit_DOC_NO'].setValue(res.recruit_DOC_NO);
      this.documentForm.controls['recruit_DOC_DATE'].setValue(res.recruit_DOC_DATE);
      this.documentForm.controls['recruit_UNIT_ID'].setValue(res.recruit_UNIT_ID);
      this.documentForm.controls['recruit_UNIT_SHORTNAME'].setValue(res.recruit_UNIT_SHORTNAME);
      this.documentForm.controls['recruit_PROVINCE_ID'].setValue(res.recruit_PROVINCE_ID);
      this.documentForm.controls['unit_TRAIN_ID'].setValue(res.unit_TRAIN_ID);
      this.documentForm.controls['unit_TRAIN_SHORTNAME'].setValue(res.unit_TRAIN_SHORTNAME);
      this.documentForm.controls['at_YEAR'].setValue(res.at_YEAR);
      this.documentForm.controls['user_VERIFY'].setValue(res.user_VERIFY);
      this.documentForm.controls['doc_NOTE'].setValue(res.doc_NOTE);
    })
  }

  toAtYear(ev: any) {
    const thYear = new ThYearPipe();
    this.sd3Year = ((new Date(ev)).getFullYear()).toString();
    const thAtYear = thYear.transform(this.sd3Year)
    this.documentForm.controls['at_YEAR'].setValue(thAtYear);
  }

  keyPressNumbers(event: any) {
    this.validate.keyPressNumbers(event);
  }

  saveDocument() {
    if (this.documentForm.valid) {
      this.api.createDocument(this.documentForm.value)
        .subscribe({
          next: (res) => {
            this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 1000 })
            this.documentForm.reset();
            this.dialogRef.close('accept');
          },
          error: () => {
            this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 1000 })
            console.log(this.documentForm.value)
          }
        })
    }
  }

  updateDocument() {
    if (this.documentForm.valid) {
      this.api.updateDocument(this.documentForm.value)
        .subscribe({
          next: (res) => {
            this.ngtoastservice.success({ detail: "Success", summary: "Update successfully", duration: 1000 })
            this.documentForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            this.ngtoastservice.error({ detail: "Error", summary: "Error while updating the request", duration: 1000 })
          }
        })
    }
  }

  deleteDocument() {
    this.api.deleteDocumentById(this.documentForm.value.id)
      .subscribe({
        next: (res) => {
          this.ngtoastservice.success({ detail: "Success", summary: "Delete successfully", duration: 1000 })
          this.documentForm.reset();
          this.dialogRef.close('delete');
        },
        error: () => {
          this.ngtoastservice.error({ detail: "Error", summary: "Error while deleting", duration: 1000 })
          console.log(this.documentForm.value)
        }
      })
  }

  unAcceptDoc() {
    this.documentForm.controls['recruit_DOC_NO'].setValue('');
    this.documentForm.controls['recruit_DOC_DATE'].setValue('');
  }

  onClear() {
    this.documentForm.reset();
    this.initializeForm();
  }

  onClose() {
    this.dialog.closeAll();
  }

  initializeForm() {
    this.documentForm.setValue({
      id: '',
      book_no: '',
      book_date: '',
      agency: '',
      Verifier: '',
      save_date: '',
      Comment: '',
    })
  }

  getSelectUnitTrainChangeValue(selectChangeValue: any) {
    this.selectedProvinceOutPut = '';
    this.selectedUnitTrainOutPut = selectChangeValue;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    this.selectProvinceDisabled = "false";
    this.documentForm.controls['unit_TRAIN_SHORTNAME'].setValue(this.dataservice.GetData());
  }

  getSelectUnitChangeValue(selectChangeValue: any) {
    this.selectedUnitOutPut = selectChangeValue;
    this.documentForm.controls['recruit_UNIT_SHORTNAME'].setValue(this.dataservice.GetData().abbrName);
    this.documentForm.controls['recruit_PROVINCE_ID'].setValue(this.dataservice.GetData().addressProvinceID);
  }

  getSelectDepartmentChangeValue(selectChangeValue: any) {

    this.documentForm.controls['doc_DEPARTMENT_ID'].setValue(selectChangeValue);
    this.selectedDepartmentOutPut = selectChangeValue;
    this.departmentSelectDisable = "false";

  }

}
