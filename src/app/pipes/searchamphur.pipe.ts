import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAmphur',
  standalone: true
})
export class SearchAmphurPipe implements PipeTransform {

  transform(listAmphurs: any[], searchTxt: string): any[] {
    if (!listAmphurs || !listAmphurs.length) return listAmphurs;
    if (!searchTxt || !searchTxt.length) return listAmphurs;
    return listAmphurs.filter(res => {
      return res.amphur_NAME.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }
}
