import React from 'react'
import {AsyncStorage, Alert, DeviceEventEmitter} from 'react-native';

import CommonService from '../../../service/common.service';

export default class UserService {


    /**
     * Login
     * @param username : string
     * @param password : string
     * @returns {Promise.<TResult>|*}
     */
    static login(username, password) {
        let url = `${CommonService.host}/admin/login/loginController.php?action=userLogin`;

        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `username=${username}&password=${password}`
        }
        return fetch(url, options).then(response => response.json());
    }

    /**
     * logout
     * @returns {Promise.<TResult>|*}
     */
    static logout() {
        let url = `${CommonService.host}/admin/login/loginController.php?action=logoutWithJson`;
        return fetch(url).then(response => response.json());
    }


    /**
     * save user data to local storage
     * @param data : object
     */
    static setUserDataToLocalStorage(data) {
        AsyncStorage.setItem('userData', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '本地储存功能失败，请联系管理员微信号:jiyu55')
            }

        })
    }

    /**
     * get user data from local storage
     * @returns {Promise}
     */
    static getUserDataFromLocalStorage() {
        return AsyncStorage.getItem('userData').then(result=>JSON.parse(result));
    }

    /**
     * delete user data frm local storage
     */
    static removeUserDataFromLocalStorage() {
        AsyncStorage.removeItem('userData');
    }

    /**
     * Update avatar
     * @param imgData
     * @param progressCallback
     * @param resolveCallback
     * @param rejectCallback
     */
    static updateAvatar(imgData,progressCallback, resolveCallback, rejectCallback) {
        let url = `${CommonService.host}/admin/user/userController.php?action=userUpdateHeadImgWithJson`;
        console.log(CommonService.uploadFile(url,'file',imgData,false,progressCallback, resolveCallback, rejectCallback));
    }

    /**
     *
     * @param alias
     * @returns {Promise.<TResult>|*|Promise.<*>}
     */
    static updateAlias(alias) {
        let url = `${CommonService.host}/admin/user/userController.php?action=updateNicknameWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `alias=${alias}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateGender(gender) {
        let url = `${CommonService.host}/admin/user/userController.php?action=updateGenderWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `gender=${gender}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateMajor(major){
        let url = `${CommonService.host}/admin/user/userController.php?action=updateMajorWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `major=${major}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateWechat(wechat){
        let url = `${CommonService.host}/admin/user/userController.php?action=updateWechatWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `wechat=${wechat}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateDescription(description){
        let url = `${CommonService.host}/admin/user/userController.php?action=updateDescriptionWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `description=${description}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateEnrollYear(enrollYear){
        let url = `${CommonService.host}/admin/user/userController.php?action=updateEnrollYearWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `enrollYear=${enrollYear}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updateDegree(degree){
        let url = `${CommonService.host}/admin/user/userController.php?action=updateDegreeWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `degree=${degree}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static updatePassword(oldPassword, newPassword){
        let url = `${CommonService.host}/admin/user/userController.php?action=updatePasswordWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body:`oldPassword=${oldPassword}&newPassword=${newPassword}`
        }
        return fetch(url, options).then(response => response.json());
    }

    static register(username, password){
        let url = `${CommonService.host}/admin/user/userController.php?action=userRegisterWithJson`;
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body:`username=${username}&password=${password}`
        }
        return fetch(url, options).then(response => response.json());
    }


}