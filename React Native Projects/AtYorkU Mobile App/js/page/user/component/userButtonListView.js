import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import globalStyle from '../../../style/style';

export default class UserButtonListView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        pageObject:PropTypes.object,
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigationToSettingPage}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>消息</Text>
                    <Image style={styles.icon} source={require('../../../../res/icon/message.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>我的发布</Text>
                    <Image style={styles.icon} source={require('../../../../res/icon/myforum.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>收藏</Text>
                    <Image style={styles.icon} source={require('../../../../res/icon/collection.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>点券</Text>
                    <Image style={styles.icon} source={require('../../../../res/icon/credit.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.listBox} onPress={this.navigationToSettingPage}>
                    <Text style={[globalStyle.fontLight, styles.labelText]}>个人设置</Text>
                    <Image style={styles.icon} source={require('../../../../res/icon/setting.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    navigationToSettingPage = ()=>{
        this.props.navigation.navigate('SettingPage',{parentPage:this.props.pageObject});
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
        flex:1,
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb'
    },
    labelText:{
        fontSize:17,
        color:"#484848"
    }
    ,
    icon:{
        width:22,
        height:22,
        tintColor:"#484848"
    }
})
