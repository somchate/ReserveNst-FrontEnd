import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thtwodigitYear',
  standalone: true
})
export class ThTwoDigitYearPipe implements PipeTransform {

  transform(value: any): any {
    let enyear: any = new Date(value).getFullYear();
    let thyear = (enyear + 543).toString().substr(-2);
    return thyear;
  }

}
