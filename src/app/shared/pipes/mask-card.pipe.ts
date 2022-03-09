import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCard'
})
export class MaskCardPipe implements PipeTransform {

  transform(value: string): string {
    let maskValue: string;
    if (value.length === 15) {
      maskValue = `${value.slice(0,4)} ${value.slice(4, 11).replace(/./g, 'X')} ${value.slice(11,15)}`;
    } else {
      maskValue = `${value.slice(0,4)} ${value.slice(4, 12).replace(/./g, 'X')} ${value.slice(12,16)}`;
    }
    return maskValue;
  }

}
