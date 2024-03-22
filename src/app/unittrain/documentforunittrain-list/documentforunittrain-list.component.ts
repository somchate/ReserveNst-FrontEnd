import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProvinceslistComponent } from '../../list/provinceslist/provinceslist.component';
import { UnittrainlistComponent } from '../../list/unittrainlist/unittrainlist.component';
import { ThDatePipe } from '../../pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from '../../spinners/spinner-standalone/spinner-standalone.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SchoolResponse } from '../../payload/response/schoolResponse';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { FileComponent } from '../../file/file.component';
import { RequestformComponent } from '../../requests/requestform/requestform.component';
import { ResultListComponent } from '../../results/result-list/result-list.component';
import { ResultlistEditComponent } from '../../results/resultlist-edit/resultlist-edit.component';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { DocumentItemComponent } from '../documentforunittrain-item/documentforunittrain-item.component';
import { NstselecttodocListComponent } from '../nstselecttodoc-list/nstselecttodoc-list.component';
import { Sd3AtyearlistComponent } from "../../list/sd3atyearlist/sd3atyearlist.component";
import { UnitlistComponent } from "../../list/unitlist/unitlist.component";
import { NstforunittrainlistComponent } from '../nstforunittrain-list/nstforunittrain-list.component';
import { DocumentResponse } from 'src/app/payload/response/documentResponse';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';

@Component({
  selector: 'app-documentforunittrain-list',
  standalone: true,
  templateUrl: './documentforunittrain-list.component.html',
  styleUrls: ['./documentforunittrain-list.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, FlexLayoutModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ProvinceslistComponent, UnittrainlistComponent, Sd3AtyearlistComponent, UnitlistComponent]
})
export class DocumentforunittrainListComponent {
  docListArrayToDoc: any[] = [];
  isDisable: string = 'true';
  title = "รายการหนังสือที่ขอนำตัวขึ้นทะเบียน/นำปลดฯ->งานบันทึกข้อมูล(หน่วยฝึก)"
  documentForm !: FormGroup;
  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = false;
  filterValue: string = "";
  dataSource: DocumentResponse = {
    content: [],
    pageable: {
      offset: 0,
      pageSize: 0,
      pageNumber: 0,
      page: false,
      unpage: false
    },
    totalElements: 0,
    totalPages: 0,
    last: false,
    size: 0,
    number: 0,
    numberOfElements: 0,
    first: false,
    previous: '',
    empty: false
  };
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['running', 'unitTrain', 'documentNo', 'documentName', 'documentDate'
    , 'recruitUnit', 'atYear', 'amount', 'comment', 'action', 'option'];
  isDelete: boolean = false;
  isAdd: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedProvinceOutPut: any;
  selectedUnitTrainOutPut: any = "0";
  selectedUnitOutPut: any = "0";
  selectedAtYearOutPut: any = "0";
  selectProvinceDisabled: any;
  selectUnitDisabled: any;
  selectAtYearDisabled: any;
  passUnitTrainToProvince: any;
  passUnitToAtYear: any;
  passProvinceToAtYear: any;
  passUnitTrainToAtYear: any;
  checkboxOptionValue: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {

    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;
    let unitTrainId: string = this.selectedUnitTrainOutPut;
    let unitId: string = this.selectedUnitOutPut;
    let atYear: string = this.selectedAtYearOutPut;
    this.loading = true;
    if (!this.filterValue) {
      this.api.getDocumentByUnitAndYearAndStatus(page, size, unitTrainId, unitId, atYear).pipe(
        map((data: any) => this.dataSource = data.response)
      ).subscribe();
    } else {
      this.findByBookNo(filter)
    }
    this.loading = !this.loading;
  }

  onPaginateChange(event: PageEvent) {
    this.loading = !this.loading;
    let page = event.pageIndex;
    let size = event.pageSize;
    let atYear: string = '2566';

    this.pageIndex = event.pageIndex;

    if (this.filterValue == "") {
      this.api.getDocumentByYear(page, size, atYear).pipe(
        map((data: any) => this.dataSource = data.response)
      ).subscribe();
    }
    else {
      // this.api.getAllRequestsWithPageFilter(page, size, this.filterValue).pipe(
      //   map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
      // ).subscribe()
    }
    this.loading = !this.loading;
  }

  openItemsDialog(requestid: string, showlistunit: boolean, title: string) { }

  addDocumentItem() {
    const dialogRef = this.dialog.open(DocumentItemComponent, {
      width: '65%',
      data: { isInsert: true },
      autoFocus: false

    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.loading = true;
        this.initDataSource();
      }
    })
  }

  updateDocument(row: any) {
    this.dialog.open(DocumentItemComponent, {
      width: '65%',
      data: { docId: row.id, isUpdate: true },
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.loading = true;
        this.initDataSource();
      }
    })
  }

  deleteDocument(row: any, isDelete: boolean) {
    this.isDelete = isDelete;
    this.dialog.open(DocumentItemComponent, {
      width: '65%',
      data: { docId: row.id, isDelete: this.isDelete },
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val == 'delete') {
        this.initDataSource();
      }
    })
  }

  openNstSelectToDocList(row: any) {
    this.dialog.open(NstselecttodocListComponent, {
      width: '90%',
      data: {
        documentId: row.id, documentNo: row.doc_NO, documentName: row.doc_NAME, documentDate: row.doc_DATE,
        recruitUnitName: row.recruit_UNIT_SHORTNAME, recruitProvinceId: row.recruit_PROVINCE_ID,
        unitTrainId: row.unit_TRAIN_ID
      },
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource();
      }
    })
  }

  openNstListToEdit(row: any, isRemove: boolean) {
    this.dialog.open(NstforunittrainlistComponent, {
      width: '90%',
      autoFocus: false,
      data: {
        documentId: row.id, documentNo: row.doc_NO, documentName: row.doc_NAME, documentDate: row.doc_DATE,
        recruitUnitName: row.recruit_UNIT_SHORTNAME, recruitProvinceId: row.recruit_PROVINCE_ID, departmentId: row.doc_DEPARTMENT_ID,
        recruitProvince: row.recruit_PROVINCE_ID, unitTrainId: row.unit_TRAIN_ID, isRemove: isRemove
      },

    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource();
      }
    })
  }

  getSumarizeReport(requestid: number) {
    this.loading = !this.loading;
    this.dialog.open(FileComponent, {
      width: '40%',
      data: requestid,
    }).afterClosed().subscribe(val => {

    })
    this.loading = !this.loading;
  }

  CheckInCreate(row: any) {
    this.dataService.data = row;
    this.router.navigate(['checkin']);
  }

  ApprovedCreate(row: any) {
    this.dataService.data = row;
    this.router.navigate(['approved']);
  }


  editResultList() {
    this.loading = !this.loading;
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ResultlistEditComponent, {
      width: '65%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource();
      }
    })
    this.loading = !this.loading;
  }

  getResultList(row: any) {
    this.loading = !this.loading;
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ResultListComponent, {
      height: '80%',
      autoFocus: false,
      width: '85%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource();
      }
    })
    this.loading = !this.loading;
  }


  OnBtnApprovedListClick(data: any) {
    this.dataService.data = data;
    this.router.navigate(['approvedlist']);
  }

  findByBookNo(agency: string) {
    this.loading = !this.loading;
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    this.paginator.pageIndex = 0;
    console.log(agency);
    this.api.getAllRequestsWithPageFilter(page, size, agency).pipe(
      map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
    ).subscribe()
    this.filterValue = agency;
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
    this.selectedProvinceOutPut = '';
    this.selectedAtYearOutPut = '';
    this.selectedUnitTrainOutPut = selectChangeValue;
    this.passUnitTrainToAtYear = this.selectedUnitTrainOutPut;
    this.selectProvinceDisabled = "false";
    this.selectUnitDisabled = "false";
    // this.initDataSource();
    // this.loading = !this.loading;
  }

  getSelectUnitChangeValue(selectChangeValue: any) {
    this.selectedAtYearOutPut = '';
    this.selectedUnitOutPut = selectChangeValue;
    this.passUnitToAtYear = this.selectedUnitOutPut;
    this.selectAtYearDisabled = "false";
    // this.initDataSource();
    // this.loading = !this.loading;
  }

  getSelectAtYearChangeValue(selectChangeValue: any) {
    this.selectedAtYearOutPut = selectChangeValue;
    this.initDataSource();

  }

  // addDocsToDocArrayByOption() {
  //   console.log(this.dataSource.content)
  //   this.checkboxOptionValue = !this.checkboxOptionValue;
  //   if (this.checkboxOptionValue) {
  //     this.docListArrayToDoc = [];
  //     this.dataSource.content.forEach((element: any) => {
  //       this.docListArrayToDoc.push({ id: element.id, doc_STATUS: "1" });
  //     });
  //   } else {
  //     this.docListArrayToDoc = [];
  //   }
  //   this.isDisable = "false";
  // }

  addDocToDocArray(event: any, row: any) {
    let index: number = -1;
    const found = this.docListArrayToDoc.find((obj: any) => {
      return obj.id === row.id;
    });
    if (found) {
      if (event.checked == false) {
        index = this.docListArrayToDoc.findIndex((d: { id: any; }) => d.id === row.id);
        this.docListArrayToDoc.splice(index, 1);
        this.docListArrayToDoc.push({ id: row.id, doc_STATUS: null });
      }
      if (event.checked == true) {
        index = this.docListArrayToDoc.findIndex((d: { id: any; }) => d.id === row.id);
        this.docListArrayToDoc.splice(index, 1);
        this.docListArrayToDoc.push({ id: row.id, doc_STATUS: "1" });
      }
    } else {
      if ((event.checked == true)) {
        this.docListArrayToDoc.push({ id: row.id, doc_STATUS: "1" });
      }
      if ((event.checked == false)) {
        this.docListArrayToDoc.push({ id: row.id, doc_STATUS: null });
      }
      event.checked == false
    }
    console.log(this.docListArrayToDoc)
    if (this.docListArrayToDoc) {
      this.isDisable = "false";
    }
  }

  ChangeDocumentStatus() {
    this.api.updateDocumentStatusByDocArray(this.docListArrayToDoc).subscribe({
      next: (res) => {
        this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 1000 })
      },
      error: () => {
        this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 1000 })
      }
    });
    this.docListArrayToDoc = [];
    this.isDisable = "true";
    // this.initDataSource();
  }

  ConfirmUpdateDocStatus() {
    this.dialog.open(ConfirmComponent, {
      width: '30%',
      data: { docArray: this.docListArrayToDoc, title: "ยืนยันการเปลี่ยนสถานะ", btnText: "ยืนยัน" }
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.loading = true;
        this.docListArrayToDoc = [];
        this.loading = !this.loading;
        this.initDataSource();
        this.isDisable = "true";
      }
    });
  }
}

