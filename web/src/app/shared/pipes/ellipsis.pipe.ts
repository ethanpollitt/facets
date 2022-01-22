import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(_string: string, length: number) {
    if ([null, undefined].includes(length) || [null, undefined].includes(_string))
      return _string;

    if (_string.length > length) {
      return _string.substring(0, length) + '...';
    } else {
      return _string;
    }
  }
}
