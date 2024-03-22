import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchreligion',
  standalone: true
})
export class SearchreligionPipe implements PipeTransform {

  transform(listReligion: any[], searchTxt: string): any[] {
    if (!listReligion || !listReligion.length) return listReligion;
    if (!searchTxt || !searchTxt.length) return listReligion;
    return listReligion.filter(res => {
      return res.religion_DESC.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
