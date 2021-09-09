import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(_minutes: number, format?: 'short' | 'long' ): string {
    let days: string = '', hours: string, minutes: string = '';
    const isShort: boolean = !!format && format === 'short';
    if (_minutes >= 1440)
      days = Math.floor(_minutes / 1440) + (isShort ? ':' : ' d ');    
    if (_minutes >= 60)
      hours = Math.floor((_minutes % 1440) / 60) + (isShort ? ':' : ' h ');
    else
      hours = isShort ? '00:' : '';
    if (_minutes >= 60 && _minutes % 60 > 0)
      minutes = (_minutes % 60) + (isShort ? ':' : ' m');
    else if (_minutes < 60)
      minutes = _minutes + (isShort ? ':' : ' m');    
    return `${days}${hours}${minutes}`;
  }
}
