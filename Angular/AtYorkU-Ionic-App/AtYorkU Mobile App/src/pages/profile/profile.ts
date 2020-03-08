import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../providers/user.service";
import {UserInterface} from "../../models/user.interface";
import {CommonToolService} from "../../providers/common-tool.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: UserInterface;
  userImg: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService,
              private commonToolService: CommonToolService,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private file: File,
              private loadingCtrl: LoadingController,
              private appCtrl: App) {

    this.loadUserData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  public loadUserData() {
    this.user = this.userService.getUserFromLocalStorage();
    this.userImg = this.commonToolService.host + this.user.img;
  }

  public navigateToProfileUpdatePage(type: string) {
    this.navCtrl.push('ProfileUpdatePage', {'type': type});
  }

  //更改头像
  public changePhoto() {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          icon: 'camera',
          handler: () => {
            this.openCamera(1);
          }
        }, {
          text: '相册',
          icon: 'folder',
          handler: () => {
            this.openCamera(0);
          }
        }, {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }

  /**
   * 获取照片
   * @param {number} sourceType  //camera:1 , photo library:0
   */
  public openCamera(sourceType: number) {

    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetHeight: 200,
      targetWidth: 200,
      sourceType: sourceType
    }

    this.camera.getPicture(options).then((imageData) => {

      let loadingObj = this.loadingCtrl.create({content: '头像上传中...'});
      loadingObj.present();

      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      //upload img
      this.userService.updateProfilePhoto(base64Image).then(
        (data) => {
          let json = JSON.parse(data.response);
          if (json.code == 1) {
            this.userService.setUserToLocalStorage(json.result);
            this.userImg = base64Image;
          } else {
            this.commonToolService.alertMessage(json.message);
          }
          loadingObj.dismiss();
        },
        (err) => {
          loadingObj.dismiss();
          this.commonToolService.alertMessage("网络异常");
        }
      )

    }, (err) => {
      //this.commonToolService.alertMessage('没拍照片');
    });
  }

  /**
   * logout
   */
  public logout() {

    let loadingCtrl = this.loadingCtrl.create({content: '加载中...'});
    loadingCtrl.present();

    this.userService.logout().subscribe(
      (data) => {
        this.userService.removeUserFromLocalStorage();
        this.appCtrl.getRootNav().setRoot('TabsPage', {selectedIndex: 3})
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

}
