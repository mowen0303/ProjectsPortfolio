import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {CommonToolService} from "../../providers/common-tool.service";
import {UserService} from "../../providers/user.service";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private commonToolService: CommonToolService,
    private userService: UserService,
  ) {

  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  navigateToLoginPage(){
    this.navCtrl.push('LoginPage');
  }

  alertMessage(){
    this.alertCtrl.create({
      title: 'name',
      inputs:[{
        name:'chanelName'
      }],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text:'add',
          handler: data => {console.log("111")}
        }
      ]
    }).present();
  }

  verify():void{
    this.userService.isLogin().subscribe(
      data => {
        //successfully getting data
        this.commonToolService.alertMessage(data.message);
      },
      error => {
        alert(error)
      });
  }



}
