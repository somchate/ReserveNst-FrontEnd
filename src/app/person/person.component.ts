import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ControlContainer, NgModel, NgForm, MaxLengthValidator } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup'
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ListService } from '../services/list.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['person_select', 'person_pid', 'person_rank_brief_name', 'person_fname', 'person_lname', 'person_position'];
  dataSource !: MatTableDataSource<any>;
  personForm!: UntypedFormGroup;
  title!: string;
  unitlist: any[] = [];
  showlistunit!: boolean;
  withdrawid!: string;
  budgetyear!: string;
  @Input() id!: any;

  selected: string = localStorage.getItem('unitid')!; // test to sent valiable
  checkboxdisabled:boolean = true;

  constructor(public dialogref: MatDialogRef<PersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private formBuilder: UntypedFormBuilder,
    private ngtoastservice: NgToastService, @Inject(MAT_DIALOG_DATA) public wid: any, private list: ListService,
  ) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      person_id: ['', Validators.required],
      person_rank_brief_name: ['', Validators.required],
      person_fname: ['', Validators.required],
      person_lname: ['', Validators.required],
      person_position: ['', Validators.required]
    })
    this.getPerson();
  }

  getPerson() {
    console.log("personcomponent id :" + this.data.wid + "  budgetyear" + this.data.budgetyear + " typeid" + this.data.typeid);
    this.showlistunit = this.data.showlistunit;
    this.title = this.data.title;
    this.budgetyear = this.data.budgetyear;
    this.checkboxdisabled = this.data.checkboxdisabled;
    this.withdrawid = this.data.wid;
    if (this.checkboxdisabled==true) {
      this.api.getPersonList(this.data.unitid, this.data.wid)
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(res);
          },
          error: (err) => {
            this.ngtoastservice.error({ detail: "Error", summary: "Error While Fetching", duration: 5000 })
          }
        })
    } else {
      this.api.getPersonToSelect(this.data.unitid)
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource(res);
          },
          error: (err) => {
            this.ngtoastservice.error({ detail: "Error", summary: "Error While Fetching", duration: 5000 })
          }
        })
    }
  }
  getCheckbox(pid: any) {
    console.log(pid);
  }

  onUnitChange() {
    console.log("onSelectChange work")
  }
}