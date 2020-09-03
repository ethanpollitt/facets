import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUri'
})
export class EncodeUriPipe implements PipeTransform {
  transform(value: any): string {
    return encodeURIComponent(value);
  }
}
