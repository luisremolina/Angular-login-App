import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string) {
    if (value.length > 50) {
      console.log("es mas de 50 pai: " + value.length)
      return value.slice(0, 70);
    }else{
      console.log("no es mas de 50: "+ value.length);
    }
  }

}
