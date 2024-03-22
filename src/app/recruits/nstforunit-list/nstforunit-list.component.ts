import { Component, DoCheck, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { departmentlistComponent } from 'src/app/list/departmentlist/departmentlist.component';
import { EduatyearlistComponent } from 'src/app/list/eduatyearlist/eduatyearlist.component';
import { ProvinceslistComponent } from 'src/app/list/provinceslist/provinceslist.component';
import { SchoolslistComponent } from 'src/app/list/schoolslist/schoolslist.component';
import { UnittrainlistComponent } from 'src/app/list/unittrainlist/unittrainlist.component';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { async, map } from 'rxjs';
import { NstResponse } from 'src/app/payload/response/nstResponse';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { DocumentforunittrainListComponent } from '../../unittrain/documentforunittrain-list/documentforunittrain-list.component';
import { NstformiupdateitemComponent } from '../../unittrain/nstformiupdate-item/nstformiupdate-items.component';
import { NstforregisterItemComponent } from '../nstforregister-item/nstforregister-item.component';
import { NumberOnlyDirective } from 'src/app/directive/numberonly.directive';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-nstforunit-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    ProvinceslistComponent, UnittrainlistComponent, SchoolslistComponent, EduatyearlistComponent, departmentlistComponent, NumberOnlyDirective],
  templateUrl: './nstforunit-list.component.html',
  styleUrls: ['./nstforunit-list.component.scss']
})
export class NstforunitListComponent implements OnInit, DoCheck {

  title = "ตรวจสอบ นศท.-> นำตัวขึ้นทะเบียนกองประจำการ";
  documentFormGroup!: FormGroup;
  nstFormGroup !: FormGroup;
  schoolFormGroup!: FormGroup;
  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = true;
  filterValue: string = "";
  dataSource!: NstResponse;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['nstRd25', 'select', 'nstRegPid', 'regName', 'nstAtClass',
    'nstAtYear', 'nstStatus', 'armyProvince', 'print'];
  isDelete: boolean = false;
  isAdd: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  statusId: string = "53";
  schoolId: string = "";
  schoolShortName: string = "";
  schoolInfo !: any;
  docDate!: string;
  selectedProvinceOutPut: any;
  selectedUnitTrainOutPut: any;
  selectedSchoolOutPut: any;
  selectedEduAtYearOutPut: any;
  selectedDepartmentOutPut: any;
  passUnitTrainToProvince: any; // test
  passProvinceToSchool: any; // test
  passSchoolToEduAtYear: any; // test
  selectProvinceDisabled: any;
  selectUnitTrainDisabled: any;
  selectSchoolDisabled: any;
  selectEduAtYearDisabled: any;
  departmentSelectDisable: any;
  data: any;

  nstListArrayToDoc: any = [];
  isDisable: any = "true";
  checkboxOptionValue: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router,
  ) {

    this.documentFormGroup = this.formBuilder.group({
      documentId: [''],
      documentAtYear: ['', Validators.required],
      documentNo: ['', Validators.required],
      documentName: ['', Validators.required],
      documentDate: ['', Validators.required],
      documentDept: ['', Validators.required],
      recruitUnitName: ['', Validators.required],
      recruitProvince: ['', Validators.required],
      unitTrainName: ['', Validators.required],
    })
    this.schoolFormGroup = this.formBuilder.group({
      schoolID: [{ value: '', readonly: true }],
      schoolShortName: [{ value: '', readonly: true }],
      unitTrainId: [{ value: '', readonly: true }],
    })
    this.nstFormGroup = this.formBuilder.group({
      id: [''],
      schoolid: ['', Validators.required],
      schoolName: ['', Validators.required],
      SchoolAddress: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.data = this.dataService.data;
    this.documentFormGroup.controls['documentId'].setValue(this.data.id);
    this.documentFormGroup.controls['documentAtYear'].setValue(this.data.at_YEAR);
    this.documentFormGroup.controls['documentNo'].setValue(this.data.doc_NO);
    this.documentFormGroup.controls['documentDept'].setValue(this.data.doc_DEPARTMENT_ID);
    this.documentFormGroup.controls['documentName'].setValue(this.data.doc_NAME);
    this.documentFormGroup.controls['recruitUnitName'].setValue(this.data.recruit_UNIT_SHORTNAME);
    this.documentFormGroup.controls['unitTrainName'].setValue(this.data.unit_TRAIN_SHORTNAME);
    this.schoolFormGroup.controls['unitTrainId'].setValue(this.data.unitTrainId)
    this.toThDate(this.data.doc_DATE);
    this.initDataSource(this.documentFormGroup.controls['documentId'].value);
    this.getSchoolInfo(this.data.school_ID);
    this.selectedUnitTrainOutPut = this.data.unitTrainId;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    this.selectUnitTrainDisabled = "true";
  }

  ngDoCheck(): void {
    this.documentFormGroup.controls['documentDept'].setValue(this.data.doc_DEPARTMENT_ID);
    this.documentFormGroup.controls['recruitProvince'].setValue(this.data.recruit_PROVINCE_ID);
  }


  toThDate(docDate: any) {
    const thDate = new ThDatePipe();
    this.docDate = (new Date(docDate)).toString();
    const thDateConvert = thDate.transform(this.docDate)
    this.documentFormGroup.controls['documentDate'].setValue(thDateConvert);
  }

  initDataSource(docId: string) {
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;
    this.loading = true;
    if (!this.filterValue) {
      this.api.getNstByDocId(page, size, docId).pipe(
        map((nstData: any) => this.dataSource = nstData.response)
      ).subscribe();

    } else {
      this.findByName(filter)
    }
    this.loading = !this.loading;
    this.selectProvinceDisabled = "false";
    this.departmentSelectDisable = "false";
    this.isDisable = "false";
  }

  getSchoolInfo(schoolId: string) {
    if (!this.filterValue) {
      this.api.getSchoolByIdWithResponse(schoolId)
        .subscribe(item => {
          this.schoolFormGroup.controls['schoolID'].setValue(item.school.school_ID);
          this.schoolFormGroup.controls['schoolShortName'].setValue(item.school.school_SHORTNAME);
        });
    }
  }

  onPaginateChange(event: PageEvent) {
    this.loading = !this.loading;
    let page = event.pageIndex;
    let size = event.pageSize;

    this.pageIndex = event.pageIndex;

    if (this.filterValue == "") {

      this.api.getNstBySchoolAndStatusWithPage(page, size, this.data.school_ID, this.statusId).pipe(
        map((nstData: any) => this.dataSource = nstData.response)
      ).subscribe();
    }
    else {
      this.api.getNstBySchoolAndStatusWithPageFilter(page, size, this.schoolId, this.statusId, this.filterValue).pipe(
        map((nstData: any) => this.dataSource = nstData.response)
      ).subscribe()
    }
    this.loading = !this.loading;
  }

  openItemsDialog(requestid: string, showlistunit: boolean, title: string) { }

  showNstForRegisterItem(row: any) {
    this.dataService.data = row;
    this.dialog.open(NstforregisterItemComponent, {
      autoFocus: false,
      height: "80%",
      data: {
        regPid: row.reg_PID,
        docId: this.data.id,
      },
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource(this.data.id);
      }
    });
  }

  findByName(regName: string) {
    this.loading = !this.loading;
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    this.paginator.pageIndex = 0;
    this.api.getNstBySchoolAndStatusWithPageFilter(page, size, this.schoolId, this.statusId, regName).pipe(
      map((nstData: any) => this.dataSource = nstData.response)
    ).subscribe()
    this.filterValue = regName;
    this.loading = !this.loading;
  }

  countCheckIn(row: any) {
    return Object.keys(row.resultCheckIn).length;
  }

  countCheckInAndApproved(row: any) {
    let checkInItems = Object.keys(row.resultCheckIn).length;
    let approvedItems = Object.keys(row.resultApproved).length;
    return approvedItems + "/" + checkInItems;
  }

  getSelectUnitTrainChangeValue(selectChangeValue: any) {
    this.dataSource.content = [];
    this.selectedProvinceOutPut = '';
    this.selectedSchoolOutPut = '';
    this.selectedEduAtYearOutPut = '';
    this.selectedUnitTrainOutPut = selectChangeValue;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    this.selectProvinceDisabled = "false";
  }

  getSelectDepartmentChangeValue(selectChangeValue: any) {
    this.selectedDepartmentOutPut = '';
    // this.documentFormGroup.controls['documentDept'].setValue(selectChangeValue);
    this.selectedDepartmentOutPut = selectChangeValue;
    this.departmentSelectDisable = "false";

  }


  getSelectProvinceChangeValue(selectChangeValue: any) {
    this.dataSource.content = [];
    this.selectedSchoolOutPut = '';
    this.selectedEduAtYearOutPut = '';
    this.selectedProvinceOutPut = selectChangeValue;
    this.passProvinceToSchool = this.selectedProvinceOutPut;
    this.selectSchoolDisabled = "false";
    // this.initDataSource();
  }

  getSelectSchoolChangeValue(selectChangeValue: any) {
    this.dataSource.content = [];
    this.selectedEduAtYearOutPut = '';
    this.selectedSchoolOutPut = selectChangeValue;
    this.passSchoolToEduAtYear = this.selectedSchoolOutPut;
    this.selectEduAtYearDisabled = "false";
  }

  getSelectEduAtYearChangeValue(selectChangeValue: any) {
    this.selectedEduAtYearOutPut = selectChangeValue;
    // this.initDataSource(this.selectedEduAtYearOutPut, this.selectedSchoolOutPut, '53');
  }

  addNstToDocArray(event: any, row: any) {
    let index: number = -1;
    const found = this.nstListArrayToDoc.find((obj: any) => {
      return obj.citizen_ID === row.reg_PID;
    });
    if (found) {
      index = this.nstListArrayToDoc.findIndex((d: { citizen_ID: any; }) => d.citizen_ID === row.reg_PID);
    }
    if (event.checked == true || !found) {
      this.nstListArrayToDoc.push({ document_ID: this.data.documentId, citizen_ID: row.reg_PID, note: "-" });
    }
    if (event.checked == false || found) {
      this.nstListArrayToDoc.splice(index, 1);
    }
    console.log(this.nstListArrayToDoc);
    if (this.nstListArrayToDoc) {
      this.isDisable = "false";
    }
  }

  addNstToDocArrayByOption() {
    console.log(this.dataSource.content)
    this.checkboxOptionValue = !this.checkboxOptionValue;
    if (this.checkboxOptionValue) {
      this.nstListArrayToDoc = [];
      this.dataSource.content.forEach((element: any) => {

        this.nstListArrayToDoc.push({ document_ID: this.data.documentId, citizen_ID: element.reg_PID, note: "-" });

      });
    } else {
      this.nstListArrayToDoc = [];
    }
    this.isDisable = "false";
  }

  deleteNstFromDocSd3() {
    this.api.deleteDocumentSd3ByDocSd3Request(this.nstListArrayToDoc).subscribe({
      next: (res) => {
        this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 5000 })
      },
      error: () => {
        this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 5000 })
      }
    });
    this.nstListArrayToDoc = [];
    // setTimeout(() => { this.dialogRef.close('save') }, 1000);
    this.isDisable = "true";
  }

}
