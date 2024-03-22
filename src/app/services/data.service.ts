import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: object={};
  // provincesList!: any[];

  constructor(private api: ApiService) { }

  dataEmitter = new EventEmitter<any>();

  raiseDataEmitterEvent(data: any): void {
    this.dataEmitter.emit(data);
  }

  SetData(data: any) {
    this.data = data;
  }

  GetData(): any {
    return this.data;
  }

  // getProvinces():any {
  //   this.api
  //     .getAllProvinces()
  //     .pipe(map((res: any) => (this.provincesList = res.response)))
  //     .subscribe();
  //     return this.provincesList;
  // }
}
