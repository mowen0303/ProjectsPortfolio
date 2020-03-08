import {ElementRef, Injectable} from '@angular/core';
import {AlertController, ToastController} from "ionic-angular";
import {Keyboard} from "@ionic-native/keyboard";


@Injectable()
export class CommonToolService {

  public host: string = "http://www.atyorku.ca";
  public timeout: number = 10000;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private keyboard: Keyboard) {

  }

  alertMessage(message: string): void {
    this.alertCtrl.create({
      title: '系统提示',
      subTitle: message,
      buttons: ['确认']
    }).present();
  }

  toastMessage(message: string): void {
    this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  registerFooterKeyboardEvent(footer: ElementRef) {
    this.keyboard.disableScroll(true);
    this.keyboard.onKeyboardShow().subscribe(
      (data) => {
        footer.nativeElement.style.marginBottom = data.keyboardHeight + 'px';
      }
    );
    this.keyboard.onKeyboardHide().subscribe(
      (data) => {
        footer.nativeElement.style.marginBottom = 0 + 'px';
      }
    );
  }

}
