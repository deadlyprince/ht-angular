import { Pipe, PipeTransform } from '@angular/core';
import {DistanceLocale} from "ht-utility";

@Pipe({
  name: 'distanceLocale'
})
export class DistanceLocalePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return DistanceLocale(value);
  }

}
