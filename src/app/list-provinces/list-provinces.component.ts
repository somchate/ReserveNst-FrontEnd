import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from '../services/list.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list-provinces',
  templateUrl: './list-provinces.component.html',
  styleUrls: ['./list-provinces.component.scss'],
})
export class ListProvincesComponent implements OnInit {
  listProvinces: any[] = [];
  @Input() selected!: any;
  @Input() selectLabed!: string;
  @Input() selectDisabled!: string;
  @Output() selectChangeValue = new EventEmitter<number>();

  // selectedValue!: string;
  // mi_province_id!: string;
  // mi_province_name_th!: string;

  constructor(
    private list: ListService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    // this.selectedValue= this.selected;
    // if (this.selectedValue =="") {
    this.getListProvinces();
    // } else {
    //   this.getProvincesById(this.selectedValue);
    // }
  }


  getListProvinces(): any {
    this.list.getProvincesList().subscribe((res: any[]) => {
      this.listProvinces = res;
    });
  }

  // getProvincesById(id: any): any {
  //   this.list.getProvincesById(id).subscribe((res: any[]) => {
  //     this.listProvinces = res;
  //     this.mi_province_id= this.listProvinces[0].id;
  //     this.mi_province_name_th= this.listProvinces[0].name_th;

  //   });
  // }

  // onSelectChange(event: any) {
  //   console.log('onSelectChange work');
  //   this.selectchange.emit();
  // }

  onChange(value: any) {
    // this.getListProvinces();
    let selectedProvince = value.value;
    console.log("SelectionChange on change" + selectedProvince);
    this.selectChangeValue.emit(selectedProvince);

  }
}
