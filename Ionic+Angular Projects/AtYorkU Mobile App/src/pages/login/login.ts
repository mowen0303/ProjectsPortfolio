import {Component} from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {CommonToolService} from "../../providers/common-tool.service";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  title: string = "登录";
  showLoginPage: boolean = true;
  username: string = "";
  password: string = "";
  password2: string = "";


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService,
              private commonToolService: CommonToolService,
              private loadingCtrl: LoadingController,
              private viewCtrl: ViewController,
              private appCtrl: App,
              private iav: InAppBrowser,
              private keyboard:Keyboard) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.keyboard.disableScroll(true);
  }

  switchToRegisterPage(): void {
    this.title = "注册";
    this.showLoginPage = false;
  }

  switchToLoginPage() {
    this.title = "登录";
    this.showLoginPage = true;
  }

  /**
   * Login
   */
  login(): void {

    try {

      if (this.username == "") throw "用户名不能为空" + this.username;
      if (this.password == "") throw "密码不能为空";

      let loadingCtrl = this.loadingCtrl.create({content: '加载中...'});
      loadingCtrl.present();

      this.userService.login(this.username, this.password).subscribe(
        (data) => {
          //successfully getting data
          if (data.code == 1) {
            //console.log(data.result);
            this.userService.setUserToLocalStorage(data.result);
            this.appCtrl.getRootNav().setRoot('TabsPage', {selectedIndex: 3});
          } else {
            this.commonToolService.alertMessage(data.message);
          }
        },
        (error) => {
          console.log(error);
          this.commonToolService.alertMessage('网络环境异常');
          loadingCtrl.dismiss();
        },
        () => {
          loadingCtrl.dismiss();
        }
      );

    }
    catch (error) {
      this.commonToolService.alertMessage(error);
    }
  }


  /**
   * Register
   */
  register() {

    try {

      if (this.username == "") throw "请填写用户名";
      if (this.password == "") throw "请填写密码";
      if (this.password != this.password2) throw "两次密码输入不一致,请重新输入";

      let loadingCtrl = this.loadingCtrl.create({content: "加载中..."});
      loadingCtrl.present();

      this.userService.register(this.username, this.password).subscribe(
        (data) => {
          if (data.code == 1) {
            this.userService.setUserToLocalStorage(data.result);
            this.appCtrl.getRootNav().setRoot('TabsPage', {selectedIndex: 3});
            this.commonToolService.toastMessage(data.message);
            console.log(data.result);
          } else {
            this.commonToolService.alertMessage(data.message);
          }
        },
        (error) => {
          this.commonToolService.alertMessage('网络环境异常');
          loadingCtrl.dismiss();
        },
        () => {
          loadingCtrl.dismiss();
        }
      );

    }
    catch (error) {
      this.commonToolService.alertMessage(error);
    }

  }

}
