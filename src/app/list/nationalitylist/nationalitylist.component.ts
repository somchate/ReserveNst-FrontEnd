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

@Component({
  selector: 'app-nationalitylist',
  standalone: true,
  templateUrl: './nationalitylist.component.html',
  styleUrls: ['./nationalitylist.component.scss'],
  imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
    SearchprovincePipe, SearchnationalityPipe]
})
export class nationalitylistComponent implements OnInit {
  listNationality: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled: string = "false";
  @Input() selectedNationalityCode!: string;
  @Output() selectChangeValue = new EventEmitter<number>();

  nationalityIndex!: number;

  constructor(
    private list: ListService,
    private api: ApiService,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getListNationality('');
  }

  getListNationality(nationalityCode: any): any {
    if (nationalityCode) {
      this.api.getNationalityByCode(nationalityCode).subscribe((res: any[]) => {
        this.listNationality = res;
      });
    } else {
      this.list.getAllNationality().subscribe((res: any[]) => {
        this.listNationality = res;
      });
    }
  }



  onChange(event: any) {
    let selectedNationality = event.value;
    const index = this.listNationality.findIndex((x: any) => x.nationality_CODE == event.value);
    this.dataService.SetData(this.listNationality[index]); // ส่งค่า id ไปให้ nstformiupdate-item
    this.selectChangeValue.emit(selectedNationality);
  }

  onFocus(event: any) {
    this.getListNationality(event)
  }
}
