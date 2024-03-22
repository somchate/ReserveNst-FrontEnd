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
import { SearchdistrictPipe } from "../../pipes/searchdistrict.pipe";


@Component({
  selector: 'app-districtlist',
  standalone: true,
  templateUrl: './districtlist.component.html',
  styleUrls: ['./districtlist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, SearchdistrictPipe]
})
export class DistrictlistComponent implements OnInit {
  listDistricts: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled!: string;
  @Input() getDistrictsByAmphur!: string;
  @Output() selectChangeValue = new EventEmitter<number>();
  selectListDistricts !: any[];

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getListDistricts('');
    this.selectListDistricts = this.listDistricts;
  }


  getListDistricts(amphurId: string): any {
    if (amphurId) {
      this.list.getDistrictByAmphurId(amphurId).subscribe((res: any[]) => {
        this.listDistricts = res;
      })
    } else {

      this.list.getDistrictList().subscribe((res: any[]) => {
        this.listDistricts = res;
      });
    }
  }

  onFocus(value: any) {
    this.getListDistricts(value)
  }

  onChange(event: any) {
    let selectedDistrict = event.value;
    const index = this.listDistricts.findIndex((x: any) => x.district_ID == event.value);
    this.dataService.SetData(this.listDistricts[index]); // ส่งค่าตำบล ไปให้ nstformiupdate-item
    this.selectChangeValue.emit(selectedDistrict);

  }
}
