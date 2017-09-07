import { Pipe, PipeTransform } from '@angular/core';
import { NameCase } from "ht-js-utils"

@Pipe({
  name: 'nameCase'
})
export class NameCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return NameCase(value);
  }

}