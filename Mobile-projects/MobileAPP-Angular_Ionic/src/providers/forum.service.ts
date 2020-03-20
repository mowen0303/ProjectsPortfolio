import {Injectable, NgZone} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {CommonToolService} from "./common-tool.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import {UserInterface} from "../models/user.interface";
import {FileTransfer, FileTransferObject, FileUploadResult} from "@ionic-native/file-transfer";
import {ForumCategoryInterface} from "../models/forum-category.interface";
import {LoadingController} from "ionic-angular";


@Injectable()
export class ForumService {

  private header: Headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});

  constructor(private http: Http,
              private commonTool: CommonToolService,
              private fileTransfer: FileTransfer,
              private ngZone: NgZone,
              private loadingCtrl: LoadingController) {

  }


  //------------------- ForumInterface Category ----------------

  /**
   * Get forum category list
   * @returns {Observable<any>}
   */
  getForumCategories(): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=getForumClassListWithJson`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Set forum category data to local storage
   * @param {Object} forumCategoryData
   */
  setForumCategoryToLocalStorage(forumCategoryData: object): void {
    localStorage.setItem('forumCategory', JSON.stringify(forumCategoryData));
  }

  /**
   * Get user information from local storage
   * @returns {UserInterface}
   */
  getForumCategoryFromLocalStorage(): ForumCategoryInterface[] {
    return JSON.parse(localStorage.getItem('forumCategory')) as ForumCategoryInterface[];
  }

  //------------------- ForumInterface ----------------
  /**
   * Get forum list from local storage
   * @param {number} categoryId
   * @param {number} page
   * @returns {Observable<any>}
   */
  getForums(categoryId: number, page: number) {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=getForumListWithJson&forum_class_id=${categoryId}&pageSize=15&page=${page}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Set forum list to local storage
   * @param {Object} forumData
   * @param {number} categoryId
   */
  setForumsToLocalStorage(forumData: object, categoryId: number): void {
    localStorage.setItem(`forum${categoryId}`, JSON.stringify(forumData));
  }

  /**
   * add a forum
   * @param forum_class_id
   * @param content
   * @param price
   * @param category
   * @param img1
   * @returns {Promise<FileUploadResult>}
   */
  addForm(forum_class_id, content, price, category, img1): Promise<FileUploadResult> {
    let uploadFilePercent: number = 0;
    let loadingCtrl = this.loadingCtrl.create({content: `发布中: ${uploadFilePercent}%`});
    loadingCtrl.present();
    let fileTransferObj: FileTransferObject = this.fileTransfer.create();
    fileTransferObj.onProgress((e) => {
      this.ngZone.run(() => {
        uploadFilePercent = (e.lengthComputable) ? Math.floor(e.loaded / e.total * 100) : -1;
        loadingCtrl.setContent(`发布中: ${uploadFilePercent}%`);
      })
    });

    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=addForumWithJson`;
    let fileKey = 'img1';
    if (img1 == 'assets/img/add.png') {
      fileKey = 'noImg';
      img1 = 'data:image/jpeg;base64,';
    }

    let result: Promise<FileUploadResult> = fileTransferObj.upload(img1, url, {
      chunkedMode: false,
      fileKey: fileKey,
      params: {flag: 'add', forum_class_id: forum_class_id, content: content, price: price, category: category}
    });

    result.then(() => {
      loadingCtrl.dismiss();
    })

    return result;
  }

  /**
   * Delete a forum
   * @param {number} id
   * @returns {Observable<any>}
   */
  deleteForum(id: number): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=deleteForumWithJson`;
    let data = `id=${id}`;
    return this.http.post(url, data, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }


  //------------------- ForumInterface comment ----------------
  /**
   * Get forum comments
   * @param {number} forumId
   * @param {number} page
   * @returns {Observable<any>}
   */
  getComments(forumId, page: number): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=getForumCommentListWithJson&forum_id=${forumId}&pageSize=20&page=${page}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }


  /**
   *
   * @param {string} content
   * @param {string} forumId
   * @param {string} ownerUserId
   * @param {string} receiveUserId
   * @returns {Observable<any>}
   */
  addComment(content: string, forumId: string, ownerUserId: string, receiveUserId: string) {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=addCommentWithJson`;
    let data = `content_comment=${content}&forum_id=${forumId}&ownerUserId=${ownerUserId}&receiveUserId=${receiveUserId}`;
    return this.http.post(url, data, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Delete comment
   * @param commentId
   * @returns {Observable<any>}
   */
  deleteComment(commentId): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=deleteCommentWithJson&id=${commentId}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());

  }


  //------------------- Report ----------------
  /**
   * Get amount of reports
   * @param forumId
   * @returns {Observable<any>}
   */
  getAmountOfReports(): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=getAmountOfReport`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Report a forum
   * @param forumId
   * @returns {Observable<any>}
   */
  reportForum(forumId): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=reportForumWithJson&forumId=${forumId}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Report a comment
   * @param commentId
   * @returns {Observable<any>}
   */
  reportComment(commentId): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=reportForumCommentWithJson&forumCommentId=${commentId}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }


  getReports(): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=getReportedListWithJson&page=1`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  forumPass(forumId): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=reportForumRestoreWithJson&forumId=${forumId}`;
    console.log(url);
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  commentPass(commentId): Observable<any> {
    let url = `${this.commonTool.host}/admin/forum/forumController.php?action=reportForumCommentRestoreWithJson&forumCommentId=${commentId}`;
    return this.http.get(url, {
      headers: this.header,
      withCredentials: true
    }).timeoutWith(this.commonTool.timeout, Observable.throw(new Error('请求超时'))).map(response => response.json());
  }


}
