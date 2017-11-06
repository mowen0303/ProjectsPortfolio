import React, {Component} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, CameraRoll} from 'react-native';
import globalStyles from '../../style/style';
import UserService from './service/user.service';
import {Button, Text} from 'native-base';
import UserInterface from './interface/user.Interface';
import CommonService from '../../service/common.service';
import ImagePicker from 'react-native-image-picker';
import {LoadMiddle} from "../../commonComponent/loadingView";


export default class SettingPage extends Component {



    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.navigation.state.params.userData,
            isLoading:false,
            isLoadingText:"",
        }
    }

    static navigationOptions = {
        headerStyle:{backgroundColor:"#fff"},
        title:'个人设置',
        headerTintColor:"#484848",
        headerBackTitle:null,
    }

    componentDidMount(){
        console.log(fetch("http://www.atyorku.ca"));
    }

    componentWillUnmount(){
        this.props.navigation.state.params.parentPage.getUserData();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.pickUpPhoto()}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>头像</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Image  style={styles.avatar} source={{uri: CommonService.host + this.state.userData.img}}/>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View activeOpacity={0.7} style={globalStyles.listBox}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>用户名</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{this.state.userData.name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('昵称',true)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>昵称</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{this.state.userData.alias}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('性别',false)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>性别</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{CommonService.pipeOfUserGender(this.state.userData.gender)}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('签名',true)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>签名</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{this.state.userData.description}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('专业',true)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>专业</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{this.state.userData.major}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('入学时间',true)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>入学时间</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{CommonService.pipeOfUserEnrolmentYear(this.state.userData.enroll_year)}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('学历',false)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>学历</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Text style={[globalStyles.fontLight, globalStyles.listLabelRightText]}>{this.state.userData.degree}</Text>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.navigationToProfileModifyPage('修改密码',true)}}>
                        <Text style={[globalStyles.font, globalStyles.listLabelLeftText]}>修改密码</Text>
                        <View style={globalStyles.listLabelRight}>
                            <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/rightarrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <Button onPress={this.logout} style={styles.logoutButton} block><Text>退出</Text></Button>
                </ScrollView>
                <LoadMiddle isLoading={this.state.isLoading} text={this.state.isLoadingText}/>
            </View>
        )
    }

    navigationToProfileModifyPage(title,isShowHeaderButton){
        this.props.navigation.navigate('ProfileModifyPage',{parentPage:this, userData:this.state.userData, title:title,showHeaderButton:isShowHeaderButton});
    }

    logout = () => {
        UserService.logout()
            .then(json => {
                if (json.code === 1) {
                    UserService.removeUserDataFromLocalStorage();
                    this.props.navigation.state.params.parentPage.setState({userData: new UserInterface()});
                    this.props.navigation.goBack();
                }
                console.log(json);
            })
            .catch(error => {

            })
    }

    pickUpPhoto(){
        let options = {
            title: '上传头像',
            allowsEditing:true,
            maxWidth:400,
            maxHeight:400,
            quality:0.8,
            takePhotoButtonTitle:"拍照",
            chooseFromLibraryButtonTitle:"打开相册",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                //success response
                await this.setState({isLoading:true});
                UserService.updateAvatar(response.uri,
                    async (progress)=>{
                        console.log(progress);
                        await this.setState({isLoadingText:"上传进度"+progress});
                    },
                    async (json)=>{
                        console.log(json);
                        if(json.code === 1){
                            UserService.setUserDataToLocalStorage(json.result);
                            await this.setState({userData:json.result});
                            this.setState({isLoading:false});
                        }else{
                            console.log(response.uri);
                            Alert.alert(json.message+":"+response.uri);
                        }
                    },
                    ()=>{
                        this.setState({isLoading:false});
                    });
                let userData = this.state.userData;
            }
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        paddingHorizontal:24,
        paddingTop:20
    },
    logoutButton:{
        backgroundColor:'#484848',
        marginTop:40,
        marginBottom:40
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:30,
        marginBottom:10
    }
});