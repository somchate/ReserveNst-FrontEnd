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

@Component({
  selector: 'app-unittrainlist',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './unittrainlist.component.html',
  styleUrls: ['./unittrainlist.component.scss']
})
export class UnittrainlistComponent implements OnInit {
  listUnittrain: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled!: string;
  @Output() selectChangeValue = new EventEmitter<number>();
  @Output() selectShortName !: string;
  provinceIndex!: number;

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
    private dataservice: DataService,
  ) { }

  ngOnInit(): void {

    this.getListUnitTrain();
    // this.provinceIndex = this.listProvinces.findIndex(x => x.reg_PROVINCE_CID === '13');

  }


  getListUnitTrain(): any {
    this.list.getUnitTrainList().subscribe((res: any[]) => {
      this.listUnittrain = res;
    });
  }

  onChange(event: any) {

    let selectedUnitTrain = event.value;
    const index = this.listUnittrain.findIndex((x: any) => x.unit_ID == event.value)
    this.selectShortName = this.listUnittrain[index].unit_SHORTNAME;
    this.dataservice.SetData(this.selectShortName);
    console.log("SelectionChange on change" + selectedUnitTrain);
    this.selectChangeValue.emit(selectedUnitTrain);
  }

  onMouseDown() {
    // this.getListUnitTrain()
  }
}
