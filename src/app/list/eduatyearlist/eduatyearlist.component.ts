import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { DataService } from 'src/app/services/data.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-eduatyearlist',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './eduatyearlist.component.html',
  styleUrls: ['./eduatyearlist.component.scss']
})
export class EduatyearlistComponent implements OnInit {
  listOfAtYear: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled: string = "true";
  @Input() selectSchoolId!: string;
  @Input() selectUnitId!: string;
  @Output() selectChangeValue = new EventEmitter<number>();

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
    private dataservice: DataService,
  ) { }

  ngOnInit(): void {

    this.getAtYearList("", "");

  }

  getAtYearList(schoolID: string, statusId: string): any {
    this.list.getNstsAtYearBySchoolIdAndStatusId(schoolID, statusId).subscribe((res: any[]) => {
      this.listOfAtYear = res;
    });
  }

  onChange(event: any) {
    let selectedAtYear = event.value;
    console.log("SelectionChange on change" + selectedAtYear);
    this.selectChangeValue.emit(selectedAtYear);
  }

  onFocus(schoolId: string, statusId: string) {
    this.getAtYearList(schoolId, statusId);
  }

}

