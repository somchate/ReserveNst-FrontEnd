import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchknowledge',
  standalone: true
})
export class SearchknowledgePipe implements PipeTransform {

  transform(listKnowledge: any[], searchTxt: string): any[] {
    if (!listKnowledge || !listKnowledge.length) return listKnowledge;
    if (!searchTxt || !searchTxt.length) return listKnowledge;
    return listKnowledge.filter(res => {
      return res.knowledge_DESC.toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });

  }

}
