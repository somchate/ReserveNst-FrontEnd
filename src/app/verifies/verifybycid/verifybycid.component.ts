
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestformComponent } from '../../requests/requestform/requestform.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { FileComponent } from '../../file/file.component';
import { ResultListComponent } from '../../results/result-list/result-list.component';
import { ResultlistEditComponent } from '../../results/resultlist-edit/resultlist-edit.component';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { map } from 'rxjs';
import { MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgToastService } from 'ng-angular-popup';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThDatePipe } from '../../pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from '../../spinners/spinner-standalone/spinner-standalone.component';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SchoolResponse } from '../../payload/response/schoolResponse';

@Component({
  selector: 'app-verifybycid',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './verifybycid.component.html',
  styleUrls: ['./verifybycid.component.scss']
})
export class VerifybycidComponent {

  verifyForm !: FormGroup;
  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = true;
  filterValue: string = "";
  // dataSource = new MatTableDataSource<RequestVerifyData>();
  dataSource!: SchoolResponse;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Running', 'RequestAgency', 'BookRequestNo', 'BookRequestDate'
    , 'VerifyUser', 'SaveDate', 'Amount', 'Comment'];
  isDelete: boolean = false;
  isAdd: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  // data = ['Java', 'Python', 'JavaScript', 'Go']
  // page: number = 1;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {

    this.initDataSource();
    this.verifyForm = this.formBuilder.group({
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
      this.api.getAllVerifyResultsWithPage(page, size).pipe(
        map((verifyResultsData: any) => this.dataSource = verifyResultsData.response)
      ).subscribe();
    } else {
      this.findByCitizenId(filter)
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

  addRequest() {
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

  // CheckInCreate(row: any) {
  //   this.loading=!this.loading;
  //   const dialogConfig = new MatDialogConfig();
  //   this.dialog.open(CheckInComponent, {
  //     width: '85%',
  //     data: row,
  //   }).afterClosed().subscribe(val => {
  //     if (val == 'save') {
  //       this.initDataSource();        
  //     }
  //   })
  //   this.loading=!this.loading;
  // }

  ApprovedCreate(row: any) {
    this.dataService.data = row;
    this.router.navigate(['approved']);
  }
  // ApproveCreate(row: any) {
  //   this.loading=!this.loading;
  //   const dialogConfig = new MatDialogConfig();
  //   this.dialog.open(ApprovedComponent, {
  //     width: '85%',
  //     data: row,
  //   }).afterClosed().subscribe(val => {
  //     if (val == 'save') {
  //       this.initDataSource();        
  //     }
  //   })
  //   this.loading=!this.loading;
  // }

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
    // this.dataService.raiseDataEmitterEvent(data);
    this.dataService.data = data;
    this.router.navigate(['approvedlist']);
  }

  findByCitizenId(citizen_id: string) {

    if (citizen_id.length == 13) {
      this.loading = !this.loading;
      let page: number = this.pageIndex;
      let size: number = this.pageSize;
      this.paginator.pageIndex = 0;
      this.api.getAllVerifyByCidResultsWithPageFilter(page, size, citizen_id).pipe(
        map((verifyResultsData: any) => this.dataSource = verifyResultsData.response)
      ).subscribe()
      this.filterValue = citizen_id;
      this.loading = !this.loading;
    }
  }

  countCheckIn(row: any) {
    return Object.keys(row.resultCheckIn).length;
  }

  countCheckInAndApproved(row: any) {
    let checkInItems = Object.keys(row.resultCheckIn).length;
    let approvedItems = Object.keys(row.resultApproved).length;
    return approvedItems + "/" + checkInItems;
  }
}