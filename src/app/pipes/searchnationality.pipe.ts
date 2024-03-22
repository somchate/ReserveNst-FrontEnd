import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnationality',
  standalone: true
})
export class SearchnationalityPipe implements PipeTransform {

  transform(listNationality: any[], searchTxt: string): any[] {
    if (!listNationality || !listNationality.length) return listNationality;
    if (!searchTxt || !searchTxt.length) return listNationality;
    return listNationality.filter(res => {
      return res.nationality_NAME.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
