import React, {Component} from 'react';
import {View, StyleSheet, ListView, Alert, Clipboard, FlatList} from 'react-native';
import ForumCell from './component/forum-cell.component'
import ForumService from './service/forum.service';
import CommentCell from './component/comment-cell.component'
import {LoadMore, LoadMiddle} from '../../commonComponent/loadingView';
import CommentView from "../../commonComponent/commentView";
import UserService from "../user/service/user.service";
import ActionSheet from 'react-native-actionsheet'


export default class ForumDetailPage extends Component {

    page = 1;
    userData = null;
    forumData = this.props.navigation.state.params.data;

    //action sheet option
    CANCEL_INDEX = 0;
    DESTRUCTIVE_INDEX = 3;
    sheetButtons1 = ['取消', '复制', '举报', '删除'];
    sheetButtons2 = ['取消', '复制', '举报'];
    title = null;
    selectedCommentData = null;


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            onEndReachedThreshold: 0,
            isPublishing: false,
            sheetButtons: this.sheetButtons2,
            data:[],
        }
    }

    static navigationOptions = {
        title: '帖子详情',
        headerStyle: {backgroundColor: '#0e7477'},
        headerTintColor: '#fff'
    }

    componentWillMount() {
        UserService.getUserDataFromLocalStorage().then(userData => {
            this.userData = userData;
        });
        console.log(this.forumData);
    }

    componentDidMount() {
        this.getComments();
        ForumService.addOnceView(this.forumData.id);
    }



    render() {

        return (
            <View style={styles.container}>
                <FlatList style={{flex:1}}
                          data={this.state.data}
                          extraData={this.state}
                          keyExtractor={(item, index) => item.id}
                          ListHeaderComponent={this.listHeaderComponent}
                          renderItem={this.renderItem}
                          ListFooterComponent={this.listFooterComponent}
                    onEndReached={() => this.getComments()}
                    onEndReachedThreshold={this.state.onEndReachedThreshold}
                />
                <CommentView submit={this.submit} ref='commentView'/>
                <LoadMiddle isLoading={this.state.isPublishing} text={"发布中..."}/>
                <ActionSheet
                    ref={o => this.ForumActionSheet = o}
                    title={this.title}
                    options={this.state.sheetButtons}
                    cancelButtonIndex={this.CANCEL_INDEX}
                    destructiveButtonIndex={this.DESTRUCTIVE_INDEX}
                    onPress={(index) => {
                        this.handleClickForumMoreButton(index)
                    }}
                />
                <ActionSheet
                    ref={o => this.CommentActionSheet = o}
                    title={this.title}
                    options={this.state.sheetButtons}
                    cancelButtonIndex={this.CANCEL_INDEX}
                    destructiveButtonIndex={this.DESTRUCTIVE_INDEX}
                    onPress={(index) => {
                        this.handleClickCommentMoreButton(index)
                    }}
                />
            </View>
        )
    }

    listHeaderComponent = ()=> {
        return <ForumCell data={this.forumData} onPressMoreButton={()=>{this.clickForumMoreButton()}} activeOpacity={1} isShowCompleteInfo={true} />
    }

    renderItem = (data) =>{
        return <CommentCell data={data.item} onPress={() => {this.clickComment(data.item)}} onPressMoreButton={() => {this.clickCommentMoreButton(data.item)}}/>
    }

    listFooterComponent = () => {
        return <LoadMore isLoading={this.state.isLoading}/>
    }


    submit = () => {
        if(this.userData === null){
            Alert.alert("提示","请先登录账号，再进行回复")
            return false;
        }
        this.setState({isPublishing: true});
        let receiverID = this.refs.commentView.state.receiverID === null ? this.forumData.user_id : this.refs.commentView.state.receiverID;
        ForumService.addComment(this.refs.commentView.state.value, this.forumData.id, this.userData.id, receiverID)
            .then(async json => {
                console.log(json);
                this.setState({isPublishing: false});
                if (json.code === 1) {
                    let data = this.state.data;
                    data.push(json.result);
                    console.log(data);
                    await this.setState({data:data});
                    this.refs.commentView.setState({value: ""});
                } else {
                    Alert.alert("提示", json.message);
                }

            })
            .catch(error => {
                this.setState({isPublishing: false});
                console.log(error);
                Alert.alert("提示", "网络环境异常");
            });
    }

    async clickForumMoreButton() {
        if (this.userData !== null && (this.forumData.user_id === this.userData.id || this.userData.is_admin === "1")) {
            await this.setState({sheetButtons: this.sheetButtons1});
        } else {
            await this.setState({sheetButtons: this.sheetButtons2});
        }
        this.ForumActionSheet.show();
    }

    handleClickForumMoreButton(index) {
        if (index === 1) {
            //copy
            Clipboard.setString(this.forumData.content);
        } else if (index === 2) {
            //report
            ForumService.reportForum(this.forumData.id)
                .then(json=>{
                    Alert.alert("提示",json.message);
                })
                .catch(error=>{
                    Alert.alert("提示","网络环境异常");
                })
        } else if (index === 3) {
            //delete
            ForumService.deleteForum(this.forumData.id).then(async json => {
                if(json.code===1){
                    this.props.navigation.state.params.rootPage.setState({tabViewPage:0});
                    this.props.navigation.state.params.rootPage.refs.forumListView0.refreshPage();
                    this.props.navigation.goBack();
                }else{
                    Alert.alert(json.message);
                }
            })
        }
    }

    async clickComment(commontData) {
        this.selectedCommentData = commontData;
        if(this.userData === null){
            Alert.alert("提示","请先登录账号，再进行回复")
            return false;
        }
        if (this.userData.id !== this.selectedCommentData.user_id) {
            this.refs.commentView.setState({
                placeholder: `@${this.selectedCommentData.alias}`,
                receiverID: this.selectedCommentData.user_id
            });
            this.refs.commentView.getFocus();
        }
    }

    async clickCommentMoreButton(commentData) {
        this.selectedCommentData = commentData;
        if (this.userData !== null && (commentData.user_id === this.userData.id || this.userData.is_admin === "1")) {
            await this.setState({sheetButtons: this.sheetButtons1});
        } else {
            await this.setState({sheetButtons: this.sheetButtons2});
        }
        this.CommentActionSheet.show();
    }

    handleClickCommentMoreButton(index) {
        if (index === 1) {
            //copy
            Clipboard.setString(this.selectedCommentData.content_comment);
        } else if (index === 2) {
            //report
            ForumService.reportComment(this.selectedCommentData.id)
                .then(json=>{
                    Alert.alert("提示",json.message);
                })
                .catch(error=>{
                    Alert.alert("提示","网络环境异常");
                })
        } else if (index === 3) {
            //delete
            ForumService.deleteComment(this.selectedCommentData.id).then(async json => {
                if(json.code===1){
                    let deletedIndex = this.state.data.indexOf(this.selectedCommentData);
                    let newData = this.state.data;
                    newData.splice(deletedIndex,1);
                    console.log(deletedIndex);
                    await this.setState({data:newData});
                }else{
                    Alert.alert(json.message);
                }
            })
        }
    }

    async getComments() {
        if (this.state.isLoading === true) {
            return false;
        }
        await this.setState({isLoading: true});
        ForumService.getComments(this.forumData.id, this.page)
            .then(async (json) => {
                if (json.code === 1) {
                    this.page++;
                    await this.setState({data:this.state.data.concat(json.secondResult)});
                    if (this.page > json.thirdResult.totalPage) {
                        await this.setState({onEndReachedThreshold: -10000})
                    }
                    console.log(this.state.data);
                } else {
                    await this.setState({onEndReachedThreshold: -10000})
                }
                await this.setState({isLoading: false})
            })
            .catch((error) => alert(error));
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    navigationBar: {
        backgroundColor: '#fff',
    },
    navBtnView: {
        flexDirection: 'row'
    },
    navBtnImg: {
        width: 18,
        height: 18,
        marginLeft: 5,
        marginRight: 5,
        tintColor: '#fff'
    }
});