import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RequestformComponent } from '../../requests/requestform/requestform.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
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
import { NstResponse } from '../../payload/response/nstResponse';
import { NstformiupdateitemComponent } from '../nstformiupdate-item/nstformiupdate-items.component';
import { auto } from '@popperjs/core';


@Component({
  selector: 'app-nstformiupdatelist',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './nstformiupdate-list.component.html',
  styleUrls: ['./nstformiupdate-list.component.scss']
})
export class NstformiupdatelistComponent implements OnInit {
  title = "งานการบันทึกข้อมูลภูมิลำเนาทหาร";
  nstForm !: FormGroup;
  waitStatus: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  loading: boolean = true;
  filterValue: string = "";
  // dataSource = new MatTableDataSource<RequestVerifyData>();
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
  data: any;
  schoolFormGroup: any;
  schoolInfo !: any;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private api: ApiService, private formBuilder: FormBuilder, private ngtoastservice: NgToastService,
    private dialog: MatDialog, private dataService: DataService, private router: Router) {

    this.schoolFormGroup = this.formBuilder.group({
      schoolID: [{ value: '', readonly: true }],
      schoolShortName: [{ value: '', readonly: true }],
    })

  }

  ngOnInit(): void {
    this.data = this.dataService.data;
    this.initDataSource(this.data.school_ID, this.statusId);
    this.getSchoolInfo(this.data.school_ID);
    this.nstForm = this.formBuilder.group({
      id: [''],
      schoolid: ['', Validators.required],
      schoolName: ['', Validators.required],
      SchoolAddress: ['', Validators.required]
    })

  }

  initDataSource(schoolId: string, statusId: string) {
    let page: number = this.pageIndex;
    let size: number = this.pageSize;
    let filter: string = this.filterValue;
    if (!this.filterValue) {
      this.api.getNstBySchoolAndStatusWithPage(page, size, schoolId, statusId).pipe(
        map((nstData: any) => this.dataSource = nstData.response)
      ).subscribe();
    } else {
      this.findByName(filter)
    }
    this.loading = !this.loading;
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

  showNstForMiUpdateItem(row: any) {
    this.dataService.data = row;
    // this.dialog.open(NstformiupdateitemComponent, {
    this.dialog.open(NstformiupdateitemComponent, {
      // width: "70%",
      height: "80%",
      data: {
        regPid: row.reg_PID,
      },
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.initDataSource(this.data.school_ID, this.statusId);
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

  getSd3Report(row: any) {
    // this.loading=!this.loading;
    this.dialog.open(FileComponent, {
      minWidth: '23%',
      height: '13%',
      data: {
        title: 'จัดพิมพ์หรือบันทึกข้อมูลแบบ สด.3',
        btnText: 'พิมพ์',
        reportType: 'sd3',
        citizenId: row.reg_PID
      }
    }).afterClosed().subscribe(val => {

    })
    // this.loading=!this.loading;
  }
}
