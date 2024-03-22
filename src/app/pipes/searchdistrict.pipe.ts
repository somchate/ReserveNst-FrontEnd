import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchdistrict',
  standalone: true
})
export class SearchdistrictPipe implements PipeTransform {

  transform(listDistricts: any[], searchTxt: string): any[] {
    if (!listDistricts || !listDistricts.length) return listDistricts;
    if (!searchTxt || !searchTxt.length) return listDistricts;
    return listDistricts.filter(res => {
      return res.district_NAME.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
