import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countReports'
})
export class CountReportsPipe implements PipeTransform {

  transform(pigList:any[]): unknown {
    return pigList.length;
  }

}
