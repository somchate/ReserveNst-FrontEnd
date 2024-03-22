import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchschool',
  standalone: true
})
export class SearchschoolPipe implements PipeTransform {

  transform(listSchool: any[], searchTxt: string): any[] {
    if (!listSchool || !listSchool.length) return listSchool;
    if (!searchTxt || !searchTxt.length) return listSchool;
    return listSchool.filter(res => {
      return res.school.school_SHORTNAME.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
