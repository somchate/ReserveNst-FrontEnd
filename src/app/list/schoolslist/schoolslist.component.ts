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
import { SearchprovincePipe } from 'src/app/pipes/searchprovince.pipe';
import { ThDatePipe } from 'src/app/pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from 'src/app/spinners/spinner-standalone/spinner-standalone.component';
import { ListService } from 'src/app/services/list.service';
import { SearchschoolPipe } from "../../pipes/searchschool.pipe";

@Component({
  selector: 'app-schoolslist',
  standalone: true,
  templateUrl: './schoolslist.component.html',
  styleUrls: ['./schoolslist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    SearchprovincePipe, SearchschoolPipe]
})
export class SchoolslistComponent implements OnInit {
  listSchool: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled: string = "true";
  @Input() selectUnitId!: string;
  @Output() selectChangeValue = new EventEmitter<number>();
  test: number = 10;
  provinceIndex!: number;

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.getListSchool('');
  }

  getListSchool(provinceId: any): any {
    if (provinceId) {
      this.list.getSchoolListByProvinceId(provinceId).subscribe((res: any[]) => {
        this.listSchool = res;
      });
    } else {
      this.list.getAmphursByProvinceId("").subscribe((res: any[]) => {
        this.listSchool = res;
      });
    }
  }

  onChange(value: any) {
    let selectedSchool = value.value;
    this.selectChangeValue.emit(selectedSchool);
  }

  onFocus(value: any) {
    this.getListSchool(value)
  }
}

