import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchprovince',
  standalone: true
})
export class SearchprovincePipe implements PipeTransform {

  transform(listProvinces: any[], searchTxt: string): any[] {
    if (!listProvinces || !listProvinces.length) return listProvinces;
    if (!searchTxt || !searchTxt.length) return listProvinces;
    return listProvinces.filter(res => {
      return res.province_NAME.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
