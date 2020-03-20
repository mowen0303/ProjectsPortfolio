import {Pipe, PipeTransform} from '@angular/core';

//
@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case "0": {
        return "女";
      }
      case "1": {
        return "男";
      }
      case "2": {
        return "不明";
      }
    }

  }
}

//
@Pipe({
  name: 'genderIcon',
})
export class GenderIconPipe implements PipeTransform {
  transform(value: string) {
    return 'gender-' + value;
  }
}

//
@Pipe({
  name: 'hostUrl',
})
export class HostUrlPipe implements PipeTransform {
  transform(value: string) {
    return 'http://www.atyorku.ca' + value;
  }
}

//
@Pipe({
  name: 'translateNull',
})
export class TranslateNullPipe implements PipeTransform {
  transform(value: string, suffix: string) {
    if (value == null || value == "" || value == " ") {
      return '未知'+suffix;
    } else {
      return value;
    }
  }
}

//
@Pipe({
  name:'commercialType',
})
export class CommercialTypePipe implements PipeTransform {
  transform(value:string){
    switch (value){
      case "buy": {
        return "购买";
      }
      case "sell": {
        return "出售";
      }
    }
    return "";
  }
}

//
@Pipe({
  name:'contentLength',
})
export class ContentLengthPipe implements PipeTransform {
  transform(value:string,length:number){
    if(value.length > length){
      return value.substr(0,length) + "..."
    } else {
      return value;
    }

  }
}
