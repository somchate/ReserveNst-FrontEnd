import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RequestformComponent } from '../../requests/requestform/requestform.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { FileComponent } from '../../file/file.component';
import { CheckInComponent } from '../../checkins/checkin/checkin.component';
import { ResultListComponent } from '../../results/result-list/result-list.component';
import { ResultlistEditComponent } from '../../results/resultlist-edit/resultlist-edit.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { count, map } from 'rxjs';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApprovedComponent } from '../../approves/approved/approved.component';
import { RequestVerify } from '../../model/requestverify';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThDatePipe } from '../../pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from '../../spinners/spinner-standalone/spinner-standalone.component';
import { School } from '../../model/school';
import { SchoolResponse } from '../../payload/response/schoolResponse';
import { ProvinceslistComponent } from "../../list/provinceslist/provinceslist.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnittrainlistComponent } from "../../list/unittrainlist/unittrainlist.component";

@Component({
  selector: 'app-schoollist',
  standalone: true,
  templateUrl: './schoollist.component.html',
  styleUrls: ['./schoollist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, FlexLayoutModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, ProvinceslistComponent, UnittrainlistComponent]
})
export class SchoollistComponent {

  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = false;
  filterValue: string = "";
  dataSource: SchoolResponse = {
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
  displayedColumns: string[] = ['Running', 'RequestAgency', 'BookRequestNo', 'BookRequestDate', 'UnitTrain'
    , 'Action'];
  isDelete: boolean = false;
  isAdd: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedProvinceOutPut: any;
  selectedUnitTrainOutPut: any;
  passUnitTrainToProvince: any; // test
  selectProvinceDisabled: any;
  title: string = "เลือกสถานศึกษาวิชาทหาร -> บันทึกข้อมูลภูมิลำเนาทหาร";

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router) {
  }
  schoolForm = this.formBuilder.group({
    id: [''],
    schoolid: ['', Validators.required],
    schoolName: ['', Validators.required],
    SchoolAddress: ['', Validators.required]
  })

  initDataSource() {
    this.loading = !this.loading;
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;

    if (this.selectedUnitTrainOutPut && !this.selectedProvinceOutPut) {

      if (!this.filterValue) {
        this.api.getSchoolByUnitIdWithPage(this.selectedUnitTrainOutPut, page, size).pipe(
          map((SchoolResponse: any) => this.dataSource = SchoolResponse.response)
        ).subscribe();
        this.paginator.firstPage();
      } else {
        this.findByName(filter)
      }

    } else {

      if (!this.filterValue && !this.selectedProvinceOutPut && !this.selectedUnitTrainOutPut) {
        this.api.getAllSchoolWithPage(page, size).pipe(
          map((SchoolResponse: any) => this.dataSource = SchoolResponse.response)
        ).subscribe();
      }

      if (this.selectedUnitTrainOutPut && this.selectedProvinceOutPut) {
        if (!this.filterValue) {
          this.api.getSchoolByProvinceCidWithPage(this.selectedProvinceOutPut, page, size).pipe(
            map((SchoolResponse: any) => this.dataSource = SchoolResponse.response)
          ).subscribe();
          this.paginator.firstPage();
        } else {
          this.findByName(filter)
        }
      }
    }

    this.loading = !this.loading;
  }

  onPaginateChange(event: PageEvent) {
    this.loading = !this.loading;
    let page = event.pageIndex;
    let size = event.pageSize;

    this.pageIndex = event.pageIndex;

    if (this.selectedUnitTrainOutPut && !this.selectedProvinceOutPut) {

      if (this.filterValue == "") {
        this.api.getSchoolByUnitIdWithPage(this.selectedUnitTrainOutPut, page, size).pipe(
          map((SchoolData: any) => this.dataSource = SchoolData.response)
        ).subscribe();

      }
      else {
        this.api.getAllSchoolWithPageFilter(page, size, this.filterValue).pipe(
          map((SchoolData: any) => this.dataSource = SchoolData.response)
        ).subscribe()
      }
    }

    if (this.selectedUnitTrainOutPut && this.selectedProvinceOutPut) {
      if (this.filterValue == "") {
        this.api.getSchoolByProvinceCidWithPage(this.selectedProvinceOutPut, page, size).pipe(
          map((SchoolData: any) => this.dataSource = SchoolData.response)
        ).subscribe();
      }
      else {
        this.api.getAllSchoolWithPageFilter(page, size, this.filterValue).pipe(
          map((SchoolData: any) => this.dataSource = SchoolData.response)
        ).subscribe()
      }
    }
    if (this.filterValue == "" && !this.selectedUnitTrainOutPut && !this.selectedProvinceOutPut) {
      this.api.getAllSchoolWithPage(page, size).pipe(
        map((SchoolData: any) => this.dataSource = SchoolData.response)
      ).subscribe()
    }
    this.loading = !this.loading;
  }

  openItemsDialog(requestid: string, showlistunit: boolean, title: string) { }

  addSchool() {
    this.dialog.open(RequestformComponent, {
      width: '65%',

    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource();
        this.loading = !this.loading;

      }
    })
    // this.loading=!this.loading;
  }

  updateRequest(row: any) {
    this.dialog.open(RequestformComponent, {
      width: '65%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.initDataSource();
        this.loading = !this.loading;
      }
    })
  }

  deleteRequest(bookrequest: any, requestid: number, requestdate: Date, requestunit: string, verifyuser: string, savedate: Date, comment: string, isDelete: boolean) {
    this.isDelete = isDelete;
    this.dialog.open(RequestformComponent, {
      width: '65%',
      data: { book_no: bookrequest, id: requestid, book_date: requestdate, agency: requestunit, verifier: verifyuser, save_date: savedate, comment: comment, isDelete: isDelete }
    }).afterClosed().subscribe(val => {
      if (val == 'delete') {
        this.initDataSource();
        this.loading = !this.loading;
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

  // ส่งข้อมูลและ redirect ไปยังหน้า nstformiupdatelist
  openNstForMiUpdateList(row: any) {
    this.dataService.data = row;
    this.router.navigate(['nstformiupdatelist']);
  }

  findByName(school_name: string) {
    this.loading = !this.loading;
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    this.paginator.pageIndex = 0;
    this.api.getAllSchoolWithPageFilter(page, size, school_name).pipe(
      map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
    ).subscribe()
    this.filterValue = school_name;
    this.loading = !this.loading;
  }

  countNst(row: any) {
    return Object.keys(row.resultCheckIn).length;
  }

  countInputAddrAndAllNst(row: any) {
    let allNst = Object.keys(row.nstRegisters).length;

    var i = 0;

    row.nstRegisters.forEach((item: any) => { if (item.reg_ARMY_PROVINCE_CID != null) { i = i + 1 } });


    return i.toString() + "/" + allNst;
  }

  getSelectUnitTrainChangeValue(selectChangeValue: any) {
    this.selectedProvinceOutPut = '';
    this.selectedUnitTrainOutPut = selectChangeValue;
    this.passUnitTrainToProvince = this.selectedUnitTrainOutPut;
    this.selectProvinceDisabled = "false";

    this.initDataSource();
  }

  getSelectProvinceChangeValue(selectChangeValue: any) {
    this.selectedProvinceOutPut = selectChangeValue;
    this.initDataSource();
  }
}
