import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchdepartment',
  standalone: true
})
export class SearchdepartmentPipe implements PipeTransform {

  transform(listDepartment: any[], searchTxt: string): any[] {
    if (!listDepartment || !listDepartment.length) return listDepartment;
    if (!searchTxt || !searchTxt.length) return listDepartment;
    return listDepartment.filter(res => {
      return res.department_ABBR.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
