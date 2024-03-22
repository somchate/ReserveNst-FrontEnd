import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ControlContainer, NgModel, NgForm, MaxLengthValidator } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup'
import { ListService } from '../services/list.service';
import { ValidateService } from '../services/validate.service';
import { PersonComponent } from '../person/person.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from  '@angular/material/dialog';

@Component({
  selector: 'app-historyform',
  templateUrl: './historyform.component.html',
  styleUrls: ['./historyform.component.scss']
})
export class HistoryformComponent implements OnInit {
  historyForm !: UntypedFormGroup;
  typebudgetlist: any[] = [];
  unitlist: any[] = [];
  actionBtn: string = "บันทึก";

  constructor(private api: ApiService, private formBuilder: UntypedFormBuilder, private ngtoastservice: NgToastService,
    private list: ListService, private validate: ValidateService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.historyForm =this.formBuilder.group({
      history_id: ['', Validators.required],
      history_type_id: ['', Validators.required],
      history_unit_id: ['', Validators.required],
      history_budget_year: ['', Validators.required],
      history_withdraw_id: ['', Validators.required],
      history_begin_date: ['', Validators.required],
      history_end_date: ['', Validators.required],
      history_comment: ['']
    })
    this.getTypeBudgetList();
    this.getUnitList();
  }

  keyPressNumbers(event: any) {
    this.validate.keyPressNumbers(event);
  }

  getTypeBudgetList(): any {
    this.list.getTypeBudgetList().subscribe((res: any[]) => {
      this.typebudgetlist = res;
    })
  }

  getUnitList(): any {
    this.list.getUnitList().subscribe((res: any[]) => {
      this.unitlist = res;
    })
  }

  addHistory() {

    if (this.historyForm.valid) {
      this.api.postHistory(this.historyForm.value)
        .subscribe({
          next: (res) => {
            this.ngtoastservice.success({ detail: "Success", summary: "Items add successfully", duration: 5000 })
            
          },
          error: () => {
            this.ngtoastservice.error({ detail: "Error", summary: "Error while adding the items", duration: 5000 })
            console.log(this.historyForm.value)
          }
        })
    }
  }

  onClear() {
    this.historyForm.reset();
    this.initializeForm();
  }

  initializeForm() {
    this.historyForm.setValue({
      history_id: '',
      history_withdraw_id: '',
      history_budget_year: '',
      history_type_id: ''
    })
  }

}
