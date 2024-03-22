import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchsd3reason',
  standalone: true
})
export class SearchSd3ReasonPipe implements PipeTransform {

  transform(listSd3Reason: any[], searchTxt: string): any[] {
    if (!listSd3Reason || !listSd3Reason.length) return listSd3Reason;
    if (!searchTxt || !searchTxt.length) return listSd3Reason;
    return listSd3Reason.filter(res => {
      return res.reasonname.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
