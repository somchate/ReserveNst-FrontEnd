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
import { SearchprovincePipe } from 'src/app/pipes/searchprovince.pipe';
import { SearchnationalityPipe } from "../../pipes/searchnationality.pipe";
import { SearchreligionPipe } from "../../pipes/searchreligion.pipe";

@Component({
  selector: 'app-religionlist',
  standalone: true,
  templateUrl: './religionlist.component.html',
  styleUrls: ['./religionlist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    SearchprovincePipe, SearchnationalityPipe, SearchreligionPipe]
})
export class religionlistComponent implements OnInit {
  listReligion: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled: string = "false";
  @Input() selectedReligionId!: string;
  @Output() selectChangeValue = new EventEmitter<number>();

  nationalityIndex!: number;

  constructor(
    private list: ListService,
    private api: ApiService,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getListReligion('');
  }

  getListReligion(religionId: any): any {
    if (religionId) {
      this.api.getReligionById(religionId).subscribe((res: any[]) => {
        this.listReligion = res;
      });
    } else {
      this.list.getAllReligion().subscribe((res: any[]) => {
        this.listReligion = res;
      });
    }
  }

  onChange(event: any) {
    let selectedReligion = event.value;
    const index = this.listReligion.findIndex((x: any) => x.religion_ID == event.value);
    this.dataService.SetData(this.listReligion[index]); // ส่งค่าไปให้ nstformiupdate-item
    this.selectChangeValue.emit(selectedReligion);
  }

  onFocus(value: any) {
    this.getListReligion(value)
  }
}
