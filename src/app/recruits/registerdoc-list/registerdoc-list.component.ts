import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { NstformiupdateitemComponent } from 'src/app/unittrain/nstformiupdate-item/nstformiupdate-items.component';
import { NstResponse } from 'src/app/payload/response/nstResponse';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { FileComponent } from 'src/app/file/file.component';
import { DocumentItemComponent } from 'src/app/unittrain/documentforunittrain-item/documentforunittrain-item.component';
import { SchoolResponse } from 'src/app/payload/response/schoolResponse';
import { RequestformComponent } from 'src/app/requests/requestform/requestform.component';
import { ResultListComponent } from 'src/app/results/result-list/result-list.component';
import { ResultlistEditComponent } from 'src/app/results/resultlist-edit/resultlist-edit.component';
import { UnittrainlistComponent } from "../../list/unittrainlist/unittrainlist.component";
import { ProvinceslistComponent } from "../../list/provinceslist/provinceslist.component";

@Component({
  selector: 'app-registerdoc-list',
  standalone: true,
  templateUrl: './registerdoc-list.component.html',
  styleUrls: ['./registerdoc-list.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, UnittrainlistComponent, ProvinceslistComponent]
})
export class RegisterdoclistComponent {
  title = "รายการเลขที่หนังสือขึ้นทะเบียน/นำปลดฯ->งานบันทึกข้อมูล(จังหวัด)"
  requestForm !: FormGroup;
  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = true;
  filterValue: string = "";
  dataSource!: SchoolResponse;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['running', 'requestUnitTrain', 'bookRequestNo', 'bookRequestDate'
    , 'bookTitleName', 'toRecruiter', 'toSd3Year', 'saveUser', 'amount', 'comment', 'action'];
  isDelete: boolean = false;
  isAdd: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedProvinceOutPut: any;
  selectedUnitTrainOutPut: any;
  passUnitTrainToProvince: any; // test
  selectProvinceDisabled: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router) {


  }

  ngOnInit(): void {
    this.initDataSource();
    this.requestForm = this.formBuilder.group({
      id: [''],
      book_no: ['', Validators.required],
      book_date: ['', Validators.required],
      agency: ['', Validators.required],
      verifier: ['', Validators.required],
      save_date: ['', Validators.required],
      comment: ['']
    })
  }

  initDataSource() {
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;
    if (!this.filterValue) {
      this.api.getAllSchoolWithPage(page, size).pipe(
        map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
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

    this.pageIndex = event.pageIndex;

    if (this.filterValue == "") {

      this.api.getAllSchoolWithPage(page, size).pipe(
        map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
      ).subscribe();
    }
    else {
      this.api.getAllRequestsWithPageFilter(page, size, this.filterValue).pipe(
        map((requestVerifyData: any) => this.dataSource = requestVerifyData.response)
      ).subscribe()
    }
    this.loading = !this.loading;
  }

  openItemsDialog(requestid: string, showlistunit: boolean, title: string) { }

  addDocumentItem() {
    this.dialog.open(DocumentItemComponent, {
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

