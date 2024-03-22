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
import { SearchdepartmentPipe } from "../../pipes/searchdepartment.pipe";
import { SearchcorpsPipe } from "../../pipes/searchcorps.pipe";
import { SearchReserveTypePipe } from 'src/app/pipes/searchreservetype.pipe';
import { SearchSd3ReasonPipe } from "../../pipes/searchsd3reason.pipe";

@Component({
    selector: 'app-sd3reasonlist',
    standalone: true,
    templateUrl: './sd3reasonlist.component.html',
    styleUrls: ['./sd3reasonlist.component.scss'],
    imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatTableModule, MatPaginatorModule, ThDatePipe, SpinnerStandaloneComponent, MatSortModule,
        MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
        SearchprovincePipe, SearchnationalityPipe, SearchreligionPipe, SearchdepartmentPipe, SearchcorpsPipe, SearchReserveTypePipe, SearchSd3ReasonPipe]
})
export class sd3reasonlistComponent implements OnInit {
  listSd3Reason: any[] = [];
  @Input() selected!: any;
  @Input() selectLabel!: string;
  @Input() selectDisabled: string = "false";
  @Input() selectedSd3ReasonId!: string;
  @Output() selectChangeValue = new EventEmitter<number>();

  constructor(
    private list: ListService,
    private api: ApiService,
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getListSd3Reason('');
  }

  getListSd3Reason(sd3ReasonId: any): any {
    if (sd3ReasonId) {
      this.api.getSd3ReasonById(sd3ReasonId).subscribe((res: any[]) => {
        this.listSd3Reason = res;
      });
    } else {
      this.list.getAllSd3Reason().subscribe((res: any[]) => {
        this.listSd3Reason = res;
      });
    }
  }

  onChange(event: any) {
    let selectedSd3Reason = event.value;
    const index = this.listSd3Reason.findIndex((x: any) => x.id == event.value);
    this.dataService.SetData(this.listSd3Reason[index]); // ส่งค่าไปให้ nstformiupdate-item
    this.selectChangeValue.emit(selectedSd3Reason);
  }

  onFocus(value: any) {
    this.getListSd3Reason(value)
  }
}
