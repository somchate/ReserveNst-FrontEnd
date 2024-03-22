import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-listunitform',
  templateUrl: './listunitform.component.html',
  styleUrls: ['./listunitform.component.scss']
})
export class ListunitformComponent implements OnInit {
  unitlist: any[] = []; 
  @Input() selected : any;
  @Output() selectchange= new EventEmitter();
  unitForm !: UntypedFormGroup;


  constructor(private list: ListService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.unitForm = this.formBuilder.group({
      history_unit_id: ['', Validators.required],
    })
    this.getUnitList();
    console.log("selected :"+ this.selected);
  }

  getUnitList(): any {
    this.list.getUnitList().subscribe((res: any[]) => {
      this.unitlist = res;
    })
  }

  onSelectChange(event: any) {
    console.log("onSelectChange work");
    this.selectchange.emit();
  }

}
