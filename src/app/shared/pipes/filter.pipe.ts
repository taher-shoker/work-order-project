import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(arrList: any[], searchItem: string): unknown {
    return arrList.filter((item) => {
      return item.name.toUpperCase().includes(searchItem.toUpperCase());
    });
  }
}
