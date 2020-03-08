import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ForumCategoryInterface} from "../../models/forum-category.interface";
import {ForumService} from "../../providers/forum.service";
import {CommonToolService} from "../../providers/common-tool.service";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ForumListPage} from "../forum-list/forum-list";
import {Keyboard} from "@ionic-native/keyboard";


@IonicPage()
@Component({
  selector: 'page-forum-add',
  templateUrl: 'forum-add.html',
})
export class ForumAddPage {
  forumCategories: ForumCategoryInterface[] = [];
  selectedForumCategory: ForumCategoryInterface;
  content: string;
  price: number = 0;
  priceCategory: string = "";
  img1:string = 'assets/img/add.png';
  //button
  enabledAddButton:boolean = true;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              public forumService: ForumService,
              private loadingCtrl: LoadingController,
              private commonToolService: CommonToolService,
              private camera:Camera,
              private keyobard:Keyboard) {
    this.forumCategories = forumService.getForumCategoryFromLocalStorage();
    this.forumCategories.shift();
    this.selectedForumCategory = this.forumCategories[0];
    this.keyobard.disableScroll(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumAddPage');
  }


  selectPriceCategory(val: string) {
    this.priceCategory = val;
  }

  pickPhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1000,
      targetWidth: 1000,
      sourceType: 0
    }

    this.camera.getPicture(options).then((imgUrl) => {
      this.img1 = imgUrl;
    }, (err) => {
      //this.commonToolService.alertMessage('没拍照片');
    });
  }

  async addForum() {

    if(this.selectedForumCategory.type == 'commercial'){
      if(this.priceCategory == ""){
        this.commonToolService.alertMessage('请选择买/卖');
        return false;
      }
    }

    this.enabledAddButton = false;

    await this.forumService.addForm(this.selectedForumCategory.id,this.content,this.price,this.priceCategory,this.img1).then(
      (data) => {

        let json = JSON.parse(data.response);
        if (json.code == 1) {
          let page = this.navCtrl.getPrevious().instance as ForumListPage;
          page.doRefresh(true);
          this.navCtrl.pop();
        } else {
          this.commonToolService.alertMessage(json.message);
        }
      },
      (err) => {
        this.commonToolService.alertMessage("网络异常");
      }
    )
    this.enabledAddButton = true;
  }

}
