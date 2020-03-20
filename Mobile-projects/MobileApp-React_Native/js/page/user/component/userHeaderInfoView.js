import React, {Component,PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LoginPage from '../login.page';
import globalStyles from '../../../style/style';
import GenderIcon from '../../../commonComponent/genderIcon';
import UserService from '../service/user.service';
import ImageLoad from 'react-native-image-placeholder';
import CommonService from '../../../service/common.service';

export default class UserHeaderInfoView extends Component {

    constructor(props){
        super(props);
    }

    static propTypes = {
        userData: PropTypes.object
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.profileBox}>
                    <View style={{flex: 1, marginRight: 10}}>
                        <Text style={[styles.alias, globalStyles.font]}>{this.props.userData.alias}</Text>
                        <Text numberOfLines={2} style={[styles.description, globalStyles.fontLight]}>{this.props.userData.description}</Text>
                    </View>
                    <View>
                        <Image style={styles.avatar} source={{uri: CommonService.host + this.props.userData.img}}/>
                        <GenderIcon genderStyle={{position: 'absolute', top: 59, right: 20}} gender={this.props.userData.gender}/>
                    </View>
                </View>
                <View style={styles.labelContainer}>
                    <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../../res/icon/faculty.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{this.props.userData.major}</Text></View>
                    <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../../res/icon/grade.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{CommonService.pipeOfUserEnrolmentYear(this.props.userData.enroll_year)}</Text></View>
                    <View style={styles.labelBox}><Image style={styles.labelIcon} source={require('../../../../res/icon/degree.png')}/><Text style={[styles.labelText,globalStyles.fontLight]}>{this.props.userData.degree}</Text></View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    profileBox: {
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
        backgroundColor:'#484848'
    },
    loginText:{
        lineHeight:34,
        fontSize:18,
        textAlign:'center',
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
        marginRight:10,
        marginTop:6
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

        borderColor:"#ebebeb",
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10
    }
    ,
    labelBox:{
        flexDirection:'row',
    },
    labelIcon:{
        width:20,
        height:20,
        tintColor:'#484848'
    },
    labelText:{
        marginTop:2,
        marginLeft:8,
        color:'#484848'
    }

})
