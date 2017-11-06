import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ForumService} from "../../providers/forum.service";
import {ForumInterface} from "../../models/forum.interface";
import {ForumCommentInterface} from "../../models/forum-comment.interface";
import {CommonToolService} from "../../providers/common-tool.service";
import {ForumListPage} from "../forum-list/forum-list";

/**
 * Generated class for the ForumReportListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-report-list',
  templateUrl: 'forum-report-list.html',
})
export class ForumReportListPage {

  forums: ForumInterface[] = [];
  comments: ForumCommentInterface[] = [];
  common: CommonToolService;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private forumService: ForumService,
              private commonToolService: CommonToolService) {
    this.common = commonToolService;
  }

  ngOnInit() {
    this.getReports();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumReportListPage');
  }

  ionViewWillLeave(){
    let forumListPage:ForumListPage = this.navCtrl.getPrevious().instance as ForumListPage;
    forumListPage.doRefresh(true);
  }

  getReports() {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.forumService.getReports().subscribe(
      (data) => {
        if (data.code == 1) {
          this.forums = data.result;
          this.comments = data.secondResult;
        } else {
          this.commonToolService.toastMessage(data.message);
        }
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage('网路环境异常');
      }
    );
  }

  forumPass(forumId,index) {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.forumService.forumPass(forumId).subscribe(
      (data) => {
        if (data.code == 1) {
          this.forums.splice(index,1);
        } else {
          this.commonToolService.toastMessage(data.message);
        }
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage('网路环境异常');
      }
    );
  }

  doDeleteForum(forumId: number, index: number) {

    let loadingObj = this.loadingCtrl.create({content: '删除中...'});
    loadingObj.present();

    this.forumService.deleteForum(forumId).subscribe(
      (data) => {
        if (data.code == 1) {
          this.forums.splice(index, 1);
        }
        this.commonToolService.toastMessage(data.message);
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage("网络环境异常");
        loadingObj.dismiss();
      }
    );
  }


  commentPass(commentId,index) {
    let loadingObj = this.loadingCtrl.create({content: '加载中...'});
    loadingObj.present();
    this.forumService.commentPass(commentId).subscribe(
      (data) => {
        if (data.code == 1) {
          this.comments.splice(index,1);
        }
        this.commonToolService.toastMessage(data.message);
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage('网路环境异常');
      }
    );
  }

  doDeleteComment(commentId, index) {
    let loadingCtrl = this.loadingCtrl.create({content: '举报中...'});
    loadingCtrl.present();
    this.forumService.deleteComment(commentId).subscribe(
      (data) => {
        if (data.code == 1) {
          this.comments.splice(index, 1);
        }
        this.commonToolService.toastMessage(data.message);
        loadingCtrl.dismiss();
      },
      (error) => {
        this.commonToolService.toastMessage('网络环境异常');
        loadingCtrl.dismiss();
      }
    );
  }


}
