import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {CommonToolService} from "./common-tool.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import {UserInterface} from "../models/user.interface";
import {FileTransfer, FileTransferObject, FileUploadResult} from "@ionic-native/file-transfer";


@Injectable()
export class UserService {

  private header: Headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});

  constructor(private http: Http,
              private commonTool: CommonToolService,
              private fileTransfer: FileTransfer) {

  }

  /**
   * Login
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  login(username: string, password: string): Observable<any> {

    let url = `${this.commonTool.host}/admin/login/loginController.php?action=userLogin`;
    let data = `username=${username}&password=${password}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());

  }

  /**
   * Logout
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {

    let url = `${this.commonTool.host}/admin/login/loginController.php?action=logoutWithJson`;
    return this.http.get(url, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());

  }

  /**
   * Register
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  register(username: string, password: string): Observable<any> {

    let url = `${this.commonTool.host}/admin/user/userController.php?action=userRegisterWithJson`;
    let data = `username=${username}&password=${password}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());

  }

  /**
   * Update alias
   * @param {string} alias
   * @returns {Observable<any>}
   */
  updateAlias(alias: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateNicknameWithJson`;
    let data = `alias=${alias}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update gender
   * @param {number} gender
   * @returns {Observable<any>}
   */
  updateGender(gender: number): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateGenderWithJson`;
    let data = `gender=${gender}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update major
   * @param {string} major
   * @returns {Observable<any>}
   */
  updateMajor(major: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateMajorWithJson`;
    let data = `major=${major}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update wechat
   * @param {string} wechat
   * @returns {Observable<any>}
   */
  updateWechat(wechat: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateWechatWithJson`;
    let data = `wechat=${wechat}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update description
   * @param {string} description
   * @returns {Observable<any>}
   */
  updateDescription(description: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateDescriptionWithJson`;
    let data = `description=${description}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update enrollYear
   * @param {string} enrollYear
   * @returns {Observable<any>}
   */
  updateEnrollYear(enrollYear: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateEnrollYearWithJson`;
    let data = `enrollYear=${enrollYear}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }


  /**
   * Update profile photo
   * @param imgData
   * @returns {Promise<FileUploadResult>}
   */
  updateProfilePhoto(imgData): Promise<FileUploadResult> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=userUpdateHeadImgWithJson`;
    const fileTransferObj: FileTransferObject = this.fileTransfer.create();
    return fileTransferObj.upload(imgData, url, {
      chunkedMode: false,
      fileKey: 'file',
      fileName: 'photo.jpg'
    });
  }

  /**
   * Update Degree
   * @param {string} degree
   * @returns {Observable<any>}
   */
  updateDegree(degree: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updateDegreeWithJson`;
    let data = `degree=${degree}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Update Password
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Observable<any>}
   */
  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=updatePasswordWithJson`;
    let data = `oldPassword=${oldPassword}&newPassword=${newPassword}`;
    return this.http.post(url, data, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Verify user login status
   * @returns {Observable<any>}
   */
  isLogin(): Observable<any> {
    let url = `${this.commonTool.host}/admin/user/userController.php?action=userIsLoginWithJson`;
    return this.http.get(url, {headers: this.header, withCredentials: true}).timeoutWith(this.commonTool.timeout,Observable.throw(new Error('请求超时'))).map(response => response.json());
  }

  /**
   * Save user login information
   * @param {Object} userData
   */
  setUserToLocalStorage(userData: object) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  /**
   * Get user information
   * @returns {UserInterface}
   */
  getUserFromLocalStorage(): UserInterface {
    return JSON.parse(localStorage.getItem('user')) as UserInterface;
  }

  /**
   * Remove user from local storage
   */
  removeUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }


}
