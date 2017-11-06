import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  InfiniteScroll, Content, IonicPage, LoadingController, NavController, NavParams,
  AlertController
} from 'ionic-angular';
import {ForumInterface} from "../../models/forum.interface";
import {CommonToolService} from "../../providers/common-tool.service";
import {ForumCommentInterface} from "../../models/forum-comment.interface";
import {ForumService} from "../../providers/forum.service";
import {ForumListPage} from "../forum-list/forum-list";
import {UserInterface} from "../../models/user.interface";
import {UserService} from "../../providers/user.service";

@IonicPage()
@Component({
  selector: 'page-forum-detail',
  templateUrl: 'forum-detail.html',
})

export class ForumDetailPage {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('footer') footer: ElementRef;
  @ViewChild(Content) content: Content;
  infiniteEnabled: boolean = false;

  forum: ForumInterface;
  common: CommonToolService;
  comments: ForumCommentInterface[] = [];
  page: number = 1;
  forumIndex: number;
  user: UserInterface;

  enabledAddButton: boolean;
  isLogin: boolean;

  //comment
  newComment: string = "";
  receiveUserId: string = "";
  newCommentPlaceHolder: string = "";
  focus = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private commonToolService: CommonToolService,
              private forumService: ForumService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private userService: UserService) {
    this.forum = navParams.get('forum');
    this.forumIndex = navParams.get('index');
    this.common = commonToolService;
    this.user = this.userService.getUserFromLocalStorage();
    if (this.user != null) {
      this.enabledAddButton = true;
      this.isLogin = true;
    } else {
      this.enabledAddButton = false;
      this.isLogin = false;
    }

  }

  ngOnInit() {
    if (parseInt(this.forum.comment_num) > 0) {
      this.getComments();
    }
  }

  ionViewDidLoad() {
    this.commonToolService.registerFooterKeyboardEvent(this.footer);
  }

  getComments() {
    let loadingCtrl = this.loadingCtrl.create({content: '评论加载中...'});
    loadingCtrl.present();
    this.forumService.getComments(this.forum.id, this.page).subscribe(
      (data) => {
        console.log(data);
        if (data.code == 1) {
          this.comments = data.secondResult;
          let thirdResult = data.thirdResult;
          if (thirdResult.totalPage > 1 && this.page < thirdResult.totalPage) {
            this.infiniteEnabled = true;
          }else{
            this.infiniteEnabled = false;
          }
        } else {
          this.commonToolService.alertMessage(data.message);
        }
        loadingCtrl.dismiss();
      },
      (error) => {
        this.commonToolService.alertMessage('网络环境异常');
        loadingCtrl.dismiss();
      }
    );
  }

  alertDeleteForum(forumId: number, index: number) {
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
          let page = this.navCtrl.getPrevious().instance as ForumListPage;
          page.forums.splice(this.forumIndex, 1);
          this.navCtrl.pop();
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

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.forumService.getComments(this.forum.id, ++this.page).subscribe(
      (data) => {
        if (data.code == 1) {
          for (let i = 0; i < data.secondResult.length; i++) {
            this.comments.push(data.secondResult[i]);
          }
        } else {
          this.commonToolService.toastMessage('已经最后一页了');
          infiniteScroll.enable(false);

        }
        infiniteScroll.complete();
      },
      (error) => {
        infiniteScroll.complete();
      }
    );
  }

  resizeTextarea() {
    // this.myInput.nativeElement.style.overflow = "hidden"; //导致不出现滚动条
    if (this.newComment == "") {
      this.newCommentPlaceHolder = "";
      this.receiveUserId = this.forum.user_id;
    }
    this.myInput.nativeElement.style.height = null;
    this.myInput.nativeElement.style.height = Math.min(this.myInput.nativeElement.scrollHeight, 80) + "px";
  }

  blurTextarea() {
    if (this.newComment == "") {
      this.newCommentPlaceHolder = "";
      this.receiveUserId = this.forum.user_id;
    }
  }

  addComment() {
    if (this.newComment.length <= 0) {
      this.commonToolService.toastMessage('说点什么吧!')
      return false;
    }
    this.enabledAddButton = false;
    let loadingObj = this.loadingCtrl.create({content: '发布中...'});
    loadingObj.present();

    this.forumService.addComment(this.newCommentPlaceHolder + '  ' + this.newComment, this.forum.id, this.forum.user_id, this.receiveUserId).subscribe(
      (data) => {
        if (data.code == 1) {
          let newCommentObj: ForumCommentInterface = data.result;
          this.comments.push(newCommentObj);
          this.newComment = "";
          this.resizeTextarea();
        } else {
          this.commonToolService.toastMessage(data.message);
        }
        this.enabledAddButton = true;
        loadingObj.dismiss();
      },
      (error) => {
        this.commonToolService.toastMessage('网络环境异常')
        this.enabledAddButton = true;
        loadingObj.dismiss();
      }
    )
  }

  reply(event: Event, receiveUserId, alias) {
    this.receiveUserId = receiveUserId;
    this.newCommentPlaceHolder = `@ ${alias}`;
    this.myInput.nativeElement.focus();
    this.myInput.nativeElement.focus();
    event.stopPropagation();
  }

  alertDeleteComment(commentId, index) {
    this.alertCtrl.create({
      title: '提示',
      message: '确认删除吗',
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
            this.doDeleteComment(commentId, index)
          }
        }
      ]
    }).present();
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

  alertReportForum(forumId) {
    this.alertCtrl.create({
      title: '提示',
      message: '确认举报吗此主题吗',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '举报',
          handler: () => {
            this.reportForum(forumId)
          }
        }
      ]
    }).present();
  }

  reportForum(forumId) {
    let loadingCtrl = this.loadingCtrl.create({content: '举报中...'});
    loadingCtrl.present();
    this.forumService.reportForum(forumId).subscribe(
      (data) => {
        this.commonToolService.toastMessage(data.message);
        loadingCtrl.dismiss();
      },
      (error) => {
        this.commonToolService.toastMessage('网络环境异常');
        loadingCtrl.dismiss();
      }
    );
  }

  alertReportComment(commentId) {
    this.alertCtrl.create({
      title: '提示',
      message: '确认举报此评论吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '举报',
          handler: () => {
            this.reportComment(commentId);
          }
        }
      ]
    }).present();
  }

  reportComment(commentId) {
    let loadingCtrl = this.loadingCtrl.create({content: '举报中...'});
    loadingCtrl.present();
    this.forumService.reportComment(commentId).subscribe(
      (data) => {
        this.commonToolService.toastMessage(data.message);
        loadingCtrl.dismiss();
      },
      (error) => {
        this.commonToolService.toastMessage('网络环境异常');
        loadingCtrl.dismiss();
      }
    );
  }

  checkLogin() {
    if (this.user == null) {
      this.navCtrl.push('LoginPage');
    }
  }


}
