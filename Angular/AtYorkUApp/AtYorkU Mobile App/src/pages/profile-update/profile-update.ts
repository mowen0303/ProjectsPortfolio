import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {CommonToolService} from "../../providers/common-tool.service";
import {ProfilePage} from "../profile/profile";
import {UserInterface} from "../../models/user.interface";


@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  userLocalStorage: UserInterface;

  aliasBox: boolean = false;
  genderBox: boolean = false;
  descriptionBox: boolean = false;
  wechatBox: boolean = false;
  majorBox: boolean = false;
  enrollYearBox: boolean = false;
  enrollYearDate: string = '1998-11-04T11:06Z';
  degreeBox: boolean = false;
  passwordBox:boolean = false;

  oldPassword: string = "";
  newPassword: string = "";
  newPassword2: string = "";


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService,
              private commonToolService: CommonToolService,
              private loadingCtrl: LoadingController,
              private appCtrl: App) {

    this.userLocalStorage = this.userService.getUserFromLocalStorage();

    let type = navParams.get('type');

    switch (type) {
      case 'alias': {
        this.aliasBox = true;
        break;
      }
      case 'gender': {
        this.genderBox = true;
        break;
      }
      case 'major': {
        this.majorBox = true;
        break;
      }
      case 'wechat': {
        this.wechatBox = true;
        break;
      }
      case 'description': {
        this.descriptionBox = true;
        break;
      }
      case 'enrollYear': {
        this.enrollYearBox = true;
        let timeStaple: number = parseInt(this.userLocalStorage.enroll_year);
        let date = new Date(timeStaple * 1000);
        this.enrollYearDate = date.toISOString();
        break;
      }
      case 'degree': {
        this.degreeBox = true;
        break;
      }
      case 'password': {
        this.passwordBox = true;
          break;
        }


      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');
  }


  updateAlias() {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateAlias(this.userLocalStorage.alias).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }


  updateGender(gender: number) {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateGender(gender).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updateDescription() {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateDescription(this.userLocalStorage.description).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updateWechat() {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateMajor(this.userLocalStorage.major).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updateMajor() {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateMajor(this.userLocalStorage.major).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updateEnrollYear() {
    let dataStaple = (Date.parse(this.enrollYearDate) / 1000 - 2592000).toString(); //转时间戳(js时间戳 14位;php时间戳10位)
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateEnrollYear(dataStaple).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updateDegree(degree: string) {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updateDegree(degree).subscribe(
      (data) => {
        if (data.code == 1) {
          this.userService.setUserToLocalStorage(data.result);
          let page = this.navCtrl.getPrevious().instance as ProfilePage;
          page.loadUserData();
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

  updatePassword() {
    if(this.newPassword != this.newPassword2){
      this.commonToolService.alertMessage('新密码输入不一致');
      return;
    }
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.userService.updatePassword(this.oldPassword,this.newPassword).subscribe(
      (data) => {
        if (data.code == 1) {
          this.commonToolService.toastMessage(data.message);
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
      },
      () => {
        loadingObj.dismiss();
      }
    );
  }

}
