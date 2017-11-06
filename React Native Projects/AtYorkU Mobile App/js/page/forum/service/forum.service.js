import {AsyncStorage} from 'react-native';
import CommonService from '../../../service/common.service'

export default class ForumService {


    //--------------------------------------------------------------
    //------------------------ category ----------------------------
    //--------------------------------------------------------------
    /**
     * Get categories
     * @returns {Promise.<TResult>|*}
     */
    static getCategories() {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumClassListWithJson`;
        return fetch(url).then(response => response.json());
    }

    /**
     * Save categories data to local sotrage
     * @param data : json
     */
    static saveCategoriesToLocalStorage(data) {
        AsyncStorage.setItem('forumCategories', JSON.stringify(data), (error) => {
            if (error) {
                Alert.alert('储存提示', '本地储存功能失败，请联系管理员微信号:jiyu55')
            }
        })
    }

    /**
     * Get categories from local storage
     * @returns {Promise.<TResult>}
     */
    static getCategoriesFromLocalStorage() {
        return AsyncStorage.getItem('forumCategories').then(result => JSON.parse(result));
    }

    //--------------------------------------------------------------
    //------------------------ forum -------------------------------
    //--------------------------------------------------------------
    /**
     * Get forums
     * @param categoryId : number
     * @param page : number
     * @returns {Promise.<TResult>|*}
     */
    static getForums(categoryId, page) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumListWithJson&pageSize=20&forum_class_id=${categoryId}&page=${page}`;
        return fetch(url).then(response => response.json());
    }

    /**
     * Add a forum
     * @param forum_class_id : number
     * @param content : string
     * @param price : number
     * @param category : string
     * @param img1 : string
     * @param progressCallback : func
     * @param resolveCallback : func
     * @param rejectCallback : func
     */
    static addForum(forum_class_id, content, price, category, img1, progressCallback, resolveCallback, rejectCallback) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=addForumWithJson`;
        let optionalData = {
            flag: 'add',
            forum_class_id: forum_class_id,
            content: content,
            price: price,
            category: category
        };
        CommonService.uploadFile(url, 'img1', img1, optionalData, progressCallback, resolveCallback, rejectCallback);
    }

    /**
     * Delete a forum
     * @param id : number
     * @returns {Promise.<TResult>}
     */
    static deleteForum(id) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=deleteForumWithJson`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `id=${id}`
        }
        return fetch(url, options).then().then(response => response.json());
    }

    //--------------------------------------------------------------
    //------------------------ comments ----------------------------
    //--------------------------------------------------------------
    /**
     * Get comments
     * @param forumId
     * @param page
     * @returns {Promise.<TResult>|*}
     */
    static getComments(forumId, page) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getForumCommentListWithJson&forum_id=${forumId}&pageSize=10&page=${page}`;
        //alert(url);
        return fetch(url).then(response => response.json());

    }

    /**
     * add a comment
     * @param content : string
     * @param forumId : number
     * @param ownerUserId : number
     * @param receiveUserId : number
     * @returns {Promise.<TResult>}
     */
    static addComment(content, forumId, ownerUserId, receiveUserId) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=addCommentWithJson`;
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `content_comment=${content}&forum_id=${forumId}&ownerUserId=${ownerUserId}&receiveUserId=${receiveUserId}`
        }
        return fetch(url, options).then().then(response => response.json());
    }

    /**
     * delete a comment
     * @param id : number
     * @returns {Promise.<TResult>|*|Promise.<*>}
     */
    static deleteComment(id) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=deleteCommentWithJson&id=${id}`;
        return fetch(url).then(response => response.json());
    }
    //--------------------------------------------------------------
    //------------------------- report -----------------------------
    //--------------------------------------------------------------

    static getAmountOfReports() {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=getAmountOfReport`;
        return fetch(url).then(response => response.json());
    }

    static reportForum(forumId) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=reportForumWithJson&forumId=${forumId}`;
        return fetch(url).then(response => response.json());
    }

    static reportComment(commentId) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=reportForumCommentWithJson&forumCommentId=${commentId}`;
        return fetch(url).then(response => response.json());
    }

    static getReports() {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=reportForumRestoreWithJson&forumId=${forumId}`;
        return fetch(url).then(response => response.json());
    }

    static commentPass() {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=reportForumCommentRestoreWithJson&forumCommentId=${commentId}`;
        return fetch(url).then(response => response.json());
    }




    //--------------------------------------------------------------
    //----------------------- view count ---------------------------
    //--------------------------------------------------------------
    /**
     * Add once view number
     * @param forumId : number
     * @returns {*}
     */
    static addOnceView(forumId) {
        let url = `${CommonService.host}/admin/forum/forumController.php?action=countViewOfForumByIdWithJson&id=${forumId}`;
        return fetch(url);
    }




}