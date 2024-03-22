import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchreservetype',
  standalone: true
})
export class SearchReserveTypePipe implements PipeTransform {

  transform(listReserveType: any[], searchTxt: string): any[] {
    if (!listReserveType || !listReserveType.length) return listReserveType;
    if (!searchTxt || !searchTxt.length) return listReserveType;
    return listReserveType.filter(res => {
      return res.typeabbrname.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
