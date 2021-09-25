import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform( image:string) {
    if ( !image ) {
      return 'assets/img/default.jpg';
    }else{
      return image;
    }
  }

}
