import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserInterface} from "../../models/user.interface";
import {UserService} from "../../providers/user.service";
import {CommonToolService} from "../../providers/common-tool.service";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  userImg: string = "assets/img/head-default.png";
  user: UserInterface;
  gender: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService,
              private commonToolService: CommonToolService) {

  }

  ionViewWillEnter() {
    this.user = this.userService.getUserFromLocalStorage();
    if (this.user) {
      this.userImg = this.commonToolService.host + this.user.img;
      this.gender = `gender-${this.user.gender}`;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  navigateToProfilePage() {
    this.navCtrl.push('ProfilePage');
  }

  navigateToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

}
