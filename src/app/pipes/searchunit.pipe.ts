import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchunit',
  standalone: true
})
export class SearchunitPipe implements PipeTransform {

  transform(listUnits: any[], searchTxt: string): any[] {
    if (!listUnits || !listUnits.length) return listUnits;
    if (!searchTxt || !searchTxt.length) return listUnits;
    return listUnits.filter(res => {
      return res.abbrName.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
