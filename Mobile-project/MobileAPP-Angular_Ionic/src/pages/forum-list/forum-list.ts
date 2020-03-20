import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, FabContainer, InfiniteScroll, IonicPage, LoadingController, NavController,
  Refresher
} from 'ionic-angular';
import {ForumCategoryInterface} from "../../models/forum-category.interface";
import {ForumService} from "../../providers/forum.service";
import {CommonToolService} from "../../providers/common-tool.service";
import {ForumInterface} from "../../models/forum.interface";
import {UserInterface} from "../../models/user.interface";
import {UserService} from "../../providers/user.service";

@IonicPage()
@Component({
  selector: 'page-forum-list',
  templateUrl: 'forum-list.html',
})
export class ForumListPage {

  @ViewChild(Content) content: Content;

  page = 1;
  categoryId = 0;
  forumCategories: ForumCategoryInterface[] = [];
  forums: ForumInterface[] = [];
  common: CommonToolService;
  currentUser: UserInterface;
  activatedCategoryTbaIndex: number = 0;
  infiniteTextBox = false;
  selectedForumIndex: number = -1;
  amountOfReport: number = 0;

  constructor(private navCtrl: NavController,
              private forumService: ForumService,
              private commonToolService: CommonToolService,
              private loadingCtrl: LoadingController,
              private userService: UserService,
              private alertCtrl: AlertController) {
    this.common = commonToolService;
    this.currentUser = userService.getUserFromLocalStorage();
  }

  ngOnInit() {
    this.doRefresh(true);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForumListPage');
  }

  ionViewWillEnter(){

    if(parseInt(this.currentUser.is_admin) == 1){
      this.getAmountOfReports();
    }

  }


  navigateToForumAddPage() {
    let user = this.userService.getUserFromLocalStorage();
    if (user != null) {
      this.navCtrl.push('ForumAddPage');
    } else {
      this.navCtrl.push('LoginPage');
    }
  }

  navigateToReportList(){
    this.navCtrl.push('ForumReportListPage');
  }

  getCategories() {
    let fc = this.forumService.getForumCategoryFromLocalStorage();
    if (fc) {
      this.forumCategories = fc;
    }

    this.forumService.getForumCategories().subscribe(
      (data) => {
        if (data.code == 1) {
          this.forumCategories = data.result;
          this.forumService.setForumCategoryToLocalStorage(data.result);
        } else {
          this.commonToolService.alertMessage(data.message);
        }
      },
      (error) => {
        //this.commonToolService.alertMessage('网络环境异常');
      },
      () => {
      }
    )
  }


  getForums(loadingEnable: boolean, complete: () => void) {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    if (loadingEnable == true) {
      loadingObj.present();
    }
    this.forumService.getForums(this.categoryId, this.page).subscribe(
      (data) => {
        if (data.code == 1) {
          this.forums = data.result;
          this.forumService.setForumsToLocalStorage(data.result, this.categoryId);
          this.infiniteTextBox = true;
        }
        loadingObj.dismiss();
        complete();
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingObj.dismiss();
        complete();
      }
    );
  }

  getAmountOfReports() {
    this.forumService.getAmountOfReports().subscribe(
      (data) => {
        if (data.code == 1) {
          this.amountOfReport = parseInt(data.result);
        }
      }
    );
  }


  clickCategories(categoryId: number, activatedTabIndex: number) {
    this.page = 1;
    this.categoryId = categoryId;
    this.activatedCategoryTbaIndex = activatedTabIndex;
    this.getForums(true, () => {
      this.content.scrollTop = 0;
    });
  }

  doRefresh(showLoading: boolean, refresher?: Refresher) {
    this.page = 1;
    if (refresher != null) {
      this.getForums(showLoading, () => refresher.complete());
    } else {
      this.getForums(showLoading, () => {
      });
    }
    this.getCategories();
  }


  loadingMore() {
    this.infiniteTextBox = false;
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.forumService.getForums(this.categoryId, this.page += 1).subscribe(
      (data) => {
        if (data.code == 1) {
          // for (let i = 0; i < data.result.length; i++) {
          //   this.forums.push(data.result[i]);
          // }
          this.forums = data.result;
          this.content.scrollTop = 0;
          this.infiniteTextBox = true;
        } else {
          this.commonToolService.toastMessage("已经到最后一页了");
          this.infiniteTextBox = false;
        }
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage("网络环境异常");
        loadingObj.dismiss();
      }
    );
  }


  alertDelete(event: Event, forumId: number, index: number) {
    event.stopPropagation();
    this.alertCtrl.create({
      title: '提示',
      message: '确认删除吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '删除',
          handler: () => {
            this.doDeleteForum(forumId, index)
          }
        }
      ]
    }).present();
  }


  doDeleteForum(forumId: number, index: number) {

    let loadingObj = this.loadingCtrl.create({content: '删除中...'});
    loadingObj.present();

    this.forumService.deleteForum(forumId).subscribe(
      (data) => {
        if (data.code == 1) {
          this.forums.splice(index, 1);
        } else {
          this.commonToolService.alertMessage(data.message);
        }
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage("网络环境异常");
        loadingObj.dismiss();
      }
    );
  }


  clickFabOfRefresh(fab: FabContainer) {
    this.doRefresh(true);
    this.content.scrollTop = 0;
    fab.close();
  }

  clickFabOfLastPage(fab: FabContainer) {
    if (this.page == 1) {
      this.commonToolService.toastMessage('没有上一页啦');
    } else {
      this.page--;
      this.getForums(true, () => {
      })
    }
    fab.close();

  }

  navigateToForumDetail(event, forumId: number, index: number) {
    event.stopPropagation();
    this.selectedForumIndex = index;
    this.navCtrl.push('ForumDetailPage', {forum: this.forums[index], index: index});
    return;
  }


}
