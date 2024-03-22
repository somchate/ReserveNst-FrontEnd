import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListService } from '../../services/list.service';
import { DataService } from '../../services/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThDatePipe } from '../../pipes/th-date.pipe';
import { SpinnerStandaloneComponent } from '../../spinners/spinner-standalone/spinner-standalone.component';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { NstformiupdateitemComponent } from '../../unittrain/nstformiupdate-item/nstformiupdate-items.component';
import { SearchAmphurPipe } from "../../pipes/searchamphur.pipe";



@Component({
  selector: 'app-amphurlist',
  standalone: true,
  templateUrl: './amphurlist.component.html',
  styleUrls: ['./amphurlist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    SearchAmphurPipe]
})
export class AmphurlistComponent implements OnInit {
  listAmphurs: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled!: string;
  @Input() getAmphurByProvince!: string;
  @Output() selectChangeValue = new EventEmitter<number>();
  searchTxt: any;
  selectedListAmphurs!: any[]; //test

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getListAmphurs('');
    // this.selectedListAmphurs = this.listAmphurs
  }


  getListAmphurs(provinceCid: any): any {
    if (provinceCid) {
      this.list.getAmphursByProvinceId(provinceCid).subscribe((res: any[]) => {
        this.listAmphurs = res;
      })
    } else {
      this.list.getAmphursList().subscribe((res: any[]) => {
        this.listAmphurs = res;
      });
    }

  }

  onChange(event: any) {
    // this.getListProvinces();
    let selectedAmphur = event.value;
    console.log("SelectionChange on change" + selectedAmphur);
    const index = this.listAmphurs.findIndex((x: any) => x.amphur_ID == event.value);
    this.dataService.SetData(this.listAmphurs[index]); // ส่งข้อมูลอำเภอ ไปให้ nstformiupdate-item
    this.selectChangeValue.emit(selectedAmphur);

  }

  onFocus(value: any) {
    this.getListAmphurs(value)
  }



  // Receive user input and send to search method**
  onKey(value: any) {
    this.listAmphurs = this.search(value);

  }

  search(value: string) {
    let filter = value.toLowerCase();
    //   return this.selectedListAmphurs.filter(option => option.toLowerCase().startsWith(filter));
    // }
    if (!this.listAmphurs || !this.listAmphurs.length) return this.listAmphurs;
    if (!filter || !filter.length) return this.listAmphurs;


    // return this.listAmphurs.forEach(item => {
    //   return this.selectedListAmphurs = item.aumphur_NAME.toString().toLowerCase().startsWith(filter.toLowerCase())
    // }
    // );





    var result = this.listAmphurs.filter(option => option.amphur_NAME.startsWith(filter));
    return result;
  };





}
