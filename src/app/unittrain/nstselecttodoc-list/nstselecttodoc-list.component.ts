import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { delay, map, timer } from 'rxjs';
import { FileComponent } from 'src/app/file/file.component';
import { SchoolResponse } from 'src/app/payload/response/schoolResponse';
import { ResultListComponent } from 'src/app/results/result-list/result-list.component';
import { ResultlistEditComponent } from 'src/app/results/resultlist-edit/resultlist-edit.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { DocumentItemComponent } from '../documentforunittrain-item/documentforunittrain-item.component';
import { NstResponse } from 'src/app/payload/response/nstResponse';
import { NstformiupdateitemComponent } from '../nstformiupdate-item/nstformiupdate-items.component';
import { ProvinceslistComponent } from "../../list/provinceslist/provinceslist.component";
import { UnittrainlistComponent } from "../../list/unittrainlist/unittrainlist.component";
import { SchoolslistComponent } from "../../list/schoolslist/schoolslist.component";
import { EduatyearlistComponent } from "../../list/eduatyearlist/eduatyearlist.component";
import { DocumentforunittrainListComponent } from '../documentforunittrain-list/documentforunittrain-list.component';

interface DocumentSd3 {
  citizen_ID: string;
  document_ID: string;
  note: string;
}

@Component({
  selector: 'app-nstselecttodoc-list',
  standalone: true,
  templateUrl: './nstselecttodoc-list.component.html',
  styleUrls: ['./nstselecttodoc-list.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ProvinceslistComponent, UnittrainlistComponent, SchoolslistComponent, EduatyearlistComponent]
})
export class NstselecttodocListComponent implements OnInit {
  title = "งานจัด นศท.->หนังสือนำตัวขึ้นทะเบียน/นำปลดฯ";
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
  displayedColumns: string[] = ['nstRd25', 'nstRegPid', 'regName', 'nstAtClass',
    'nstAtYear', 'nstStatus', 'armyProvince', 'option'];
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
  passUnitTrainToProvince: any; // test
  passProvinceToSchool: any; // test
  passSchoolToEduAtYear: any; // test
  selectProvinceDisabled: any;
  selectSchoolDisabled: any;
  selectEduAtYearDisabled: any;
  nstListArrayToDoc: any = [];
  isDisable: any = "true";
  checkboxOptionValue: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DocumentforunittrainListComponent>,) {

    this.documentFormGroup = this.formBuilder.group({
      documentId: [''],
      documentNo: ['', Validators.required],
      documentName: ['', Validators.required],
      documentDate: ['', Validators.required],
      recruitUnitName: ['', Validators.required],
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
    this.documentFormGroup.controls['documentId'].setValue(this.data.documentId);
    this.documentFormGroup.controls['documentNo'].setValue(this.data.documentNo);
    this.documentFormGroup.controls['documentName'].setValue(this.data.documentName);
    this.documentFormGroup.controls['recruitUnitName'].setValue(this.data.recruitUnitName);
    this.schoolFormGroup.controls['unitTrainId'].setValue(this.data.unitTrainId)
    this.toThDate(this.data.documentDate);
    this.initDataSource('0', '0', '0');
    // this.getSchoolInfo(this.data.school_ID);
    this.selectedUnitTrainOutPut = this.data.unitTrainId;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    // this.isDisable = "true";
  }

  toThDate(docDate: any) {
    const thDate = new ThDatePipe();
    this.docDate = (new Date(docDate)).toString();
    const thDateConvert = thDate.transform(this.docDate)
    this.documentFormGroup.controls['documentDate'].setValue(thDateConvert);
  }

  initDataSource(atYear: string, schoolId: string, statusId: string) {
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;
    this.loading = true;
    if (!this.filterValue) {
      this.api.getNstBySchoolStatusProvinceAtYear(page, size, atYear, schoolId, this.data.recruitProvinceId, statusId).pipe(
        map((nstData: any) => this.dataSource = nstData.response)
      ).subscribe();

    } else {
      this.findByName(filter)
    }
    this.loading = !this.loading;
    this.selectProvinceDisabled = "false";
    this.isDisable = "false"
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

  showNstItem(row: any) {
    this.dataService.data = row;
    this.dialog.open(NstformiupdateitemComponent, {
      // width: auto,
      height: "80%",
      data: {
        regPid: row.reg_PID,
      },
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        // this.initDataSource(this.data.school_ID, this.statusId);
        this.loading = !this.loading;
      }
    })
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
    this.isDisable = "true"
    this.dataSource.content = [];
    this.selectedProvinceOutPut = '';
    this.selectedSchoolOutPut = '';
    this.selectedEduAtYearOutPut = '';
    this.selectedUnitTrainOutPut = selectChangeValue;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    this.selectProvinceDisabled = "false";
  }

  getSelectProvinceChangeValue(selectChangeValue: any) {
    this.isDisable = "true"
    this.dataSource.content = [];
    this.selectedSchoolOutPut = '';
    this.selectedEduAtYearOutPut = '';
    this.selectedProvinceOutPut = selectChangeValue;
    this.passProvinceToSchool = this.selectedProvinceOutPut;
    this.selectSchoolDisabled = "false";
  }

  getSelectSchoolChangeValue(selectChangeValue: any) {
    this.isDisable = "true"
    this.dataSource.content = [];
    this.selectedEduAtYearOutPut = '';
    this.selectedSchoolOutPut = selectChangeValue;
    this.passSchoolToEduAtYear = this.selectedSchoolOutPut;
    this.selectEduAtYearDisabled = "false";
  }

  getSelectEduAtYearChangeValue(selectChangeValue: any) {
    this.isDisable = "true"
    this.selectedEduAtYearOutPut = selectChangeValue;
    this.schoolId = this.selectedSchoolOutPut;
    this.initDataSource(this.selectedEduAtYearOutPut, this.selectedSchoolOutPut, '53');
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
    console.log(this.nstListArrayToDoc)
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

  addNstToDocSd3() {
    this.api.postDocumentSd3ByDocSd3Request(this.nstListArrayToDoc).subscribe({
      next: (res) => {
        this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 1000 })
      },
      error: () => {
        this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 1000 })
      }
    });
    this.nstListArrayToDoc = [];
    setTimeout(() => { this.dialogRef.close('save') }, 1000);
    this.isDisable = "true";
  }
}