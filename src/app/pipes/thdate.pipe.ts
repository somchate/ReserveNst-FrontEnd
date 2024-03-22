import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thdate'
})
export class ThdatePipe implements PipeTransform {

  transform(value: any): any {
    let thdate = new Date(value).getDate();
    let thmonth = new Date(value).getMonth()+1;
    let enyear : any= new Date(value).getFullYear();
    let thyear = enyear+543;
    console.log(value);
    return thdate + '/' + thmonth + '/' + thyear;
  }

}
