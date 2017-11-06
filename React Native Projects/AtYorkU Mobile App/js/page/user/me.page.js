import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import UserInterface from './interface/user.Interface';
import UserInfoView from './component/userHeaderInfoView';
import globalStyle from '../../style/style';
import UserService from "./service/user.service";


export default class MePage extends Component {

    userData = new UserInterface();

    constructor(props) {
        super(props);
        this.state = {
            userData: this.getUserData(),
        }

    }

    static navigationOptions = {
        header: null,
    }


    render() {

        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    {this.elementUserHeader()}
                    <View style={styles.listContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigateToSettingPage}>
                            <Text style={[globalStyle.font, styles.labelText]}>消息</Text>
                            <Image style={styles.icon} source={require('../../../res/icon/message.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                            <Text style={[globalStyle.font, styles.labelText]}>我的发布</Text>
                            <Image style={styles.icon} source={require('../../../res/icon/myforum.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                            <Text style={[globalStyle.font, styles.labelText]}>收藏</Text>
                            <Image style={styles.icon} source={require('../../../res/icon/collection.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                            <Text style={[globalStyle.font, styles.labelText]}>点券</Text>
                            <Image style={styles.icon} source={require('../../../res/icon/credit.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigateToSettingPage}>
                            <Text style={[globalStyle.font, styles.labelText]}>个人设置</Text>
                            <Image style={styles.icon} source={require('../../../res/icon/setting.png')}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    elementUserHeader(){
        if(this.state.userData.id !==""){
            return <UserInfoView userData={this.state.userData} {...this.props}/>;
        }else{
            return (
                <View style={{flex:1}}>
                    <View style={styles.profileBox}>
                        <View style={{flex: 1, marginRight: 10}}>
                            <TouchableOpacity style={styles.loginButton} onPress={this.navigateToLoginPage}>
                                <Text style={[styles.loginText]}>登录 / 注册</Text>
                            </TouchableOpacity>
                            <Text numberOfLines={2} style={[styles.description, globalStyles.fontLight]}/>
                        </View>
                        <View>
                            <Image style={styles.avatar} source={require('../../../res/images/head-default.png')}/>
                        </View>
                    </View>
                    <View style={styles.labelContainer}>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/faculty.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}/></View>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/grade.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}/></View>
                        <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../res/icon/degree.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}/></View>
                    </View>
                </View>
            );
        }
    }

    navigateToLoginPage = ()=>{
        this.props.navigation.navigate('LoginPage',{parentPage:this})
    }

    navigateToSettingPage = ()=>{
        if(this.state.userData.id === ""){return false;}
        this.props.navigation.navigate('SettingPage',{parentPage:this, userData: this.state.userData});
    }

    //此处一定要async & await
    async getUserData(){
        await UserService.getUserDataFromLocalStorage()
            .then(async result=>{
                if(result!==null){
                    await this.setState({userData:result});
                }else{
                    await this.setState({userData:this.userData});
                }
            })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    listContainer:{
        marginTop:60
    },
    labelBox: {
        flexDirection: 'row',
    },
    labelIcon: {
        width: 20,
        height: 20,
        tintColor: '#484848'
    },
    labelText: {
        marginTop: 2,
        color: '#484848',
        fontSize:16,
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb'
    },
    icon:{
        width:22,
        height:22,
        tintColor:"#484848"
    },profileBox: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    loginButton:{
        borderRadius:20,
        width:140,
        marginTop:24,
        height:40,
        overflow:'hidden',
        backgroundColor:'#484848',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
    },
    loginText:{
        fontSize:16,
        fontWeight:'normal',
        color:'#fff'
    }
    ,
    alias: {
        color: "#484848",
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 6
    },
    description: {
        fontSize: 14,
        color:"#484848",
        marginRight:10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop:10,
        overflow:"hidden",
    },
    labelContainer:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        paddingBottom:10,
        borderTopWidth:1,
        borderColor:"#ebebeb",
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10
    }

})
