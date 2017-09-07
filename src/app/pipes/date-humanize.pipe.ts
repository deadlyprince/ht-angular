import { Pipe, PipeTransform } from '@angular/core';
import {DateHumanize} from "ht-js-utils";

@Pipe({
  name: 'dateHumanize'
})
export class DateHumanizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DateHumanize(value);
  }

}
