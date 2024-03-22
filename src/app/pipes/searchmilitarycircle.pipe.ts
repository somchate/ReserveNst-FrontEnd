import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchmilitarycircle',
  standalone: true
})
export class SearchmilitarycirclePipe implements PipeTransform {

  transform(listMilitaryCircle: any[], searchTxt: string): any[] {
    if (!listMilitaryCircle || !listMilitaryCircle.length) return listMilitaryCircle;
    if (!searchTxt || !searchTxt.length) return listMilitaryCircle;
    return listMilitaryCircle.filter(res => {
      return res.crcl_ABBR.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
