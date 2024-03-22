import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInItemComponent } from '../../checkins/checkin-item/checkin-item.component';

export interface PeriodicElement {
  citizen_id: string;
  first_name: string;
  last_name: string;
  weight: number;
  height: number;
  chest: string;
  issue_no: string;
  result_year: string;
  result_id: string;
  comment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { citizen_id: '5120100048340', first_name: 'สมชาย', last_name: 'คำสิงห์', height: 150, chest: '76/79', weight: 81, issue_no: '256', result_year: '2551', result_id: 'สลากดำ', comment: '-' },
  { citizen_id: '5120100048340', first_name: 'สมชาย', last_name: 'คำสิงห์', height: 150, chest: '76/79', weight: 80, issue_no: '256', result_year: '2550', result_id: 'ขอผ่อนผัน ม.29(3)', comment: '-' },
  { citizen_id: '5120100048340', first_name: 'สมชาย', last_name: 'คำสิงห์', height: 150, chest: '76/79', weight: 87, issue_no: '256', result_year: '2549', result_id: 'ขอผ่อนผัน ม.29(3)', comment: '-' },
  { citizen_id: '5120100048340', first_name: 'สมชาย', last_name: 'คำสิงห์', height: 150, chest: '76/79', weight: 85, issue_no: '256', result_year: '2548', result_id: 'ขอผ่อนผัน ม.29(3)', comment: '-' },
  { citizen_id: '5120100048340', first_name: 'สมชาย', last_name: 'คำสิงห์', height: 150, chest: '76/79', weight: 80, issue_no: '256', result_year: '2547', result_id: 'ขอผ่อนผัน ม.29(3)', comment: '-' },
];


@Component({
  selector: 'app-resultlist-edit',
  templateUrl: './resultlist-edit.component.html',
  styleUrls: ['./resultlist-edit.component.scss']
})
export class ResultlistEditComponent implements OnInit {
  isButtonEnable: boolean = true;
  selection = new SelectionModel<PeriodicElement>(true, []);
  title: string = "ตรวจสอบ/ลบ/แก้ไขรายการผลการตรวจเลือกฯ สด.43";
  resultAddForm = new FormGroup({
    citizen_id: new FormControl('', Validators.required),
    result_year: new FormControl('')
  })

  displayedColumns: string[] = ['select', 'citizen_id', 'first_name', 'last_name', 'height',
    'chest', 'weight', 'issue_no', 'result_year', 'result_id', 'comment'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();

  constructor(private dialog: MatDialog) {
    this.selection.changed.subscribe(item => {
      this.isButtonEnable = this.selection.selected.length == 0;
    })
  }

  ngOnInit(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isButtonEnable = true;
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.isButtonEnable = false;
    }

  }

  onClear() {
    this.selection.clear();
    this.isButtonEnable = true;
  }

  onSave() {
    this.dialog.closeAll();
    this.dialog.open(CheckInItemComponent, {
      width: '60%',
      // data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        // this.getRequests();
      }
    })

  }

  onClose() {
    this.dialog.closeAll();
  }

}