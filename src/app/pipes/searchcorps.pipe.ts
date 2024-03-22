import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcorps',
  standalone: true
})
export class SearchcorpsPipe implements PipeTransform {

  transform(listCorps: any[], searchTxt: string): any[] {
    if (!listCorps || !listCorps.length) return listCorps;
    if (!searchTxt || !searchTxt.length) return listCorps;
    return listCorps.filter(res => {
      return res.corps_ABBR.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
