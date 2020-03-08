import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import CommonService from '../../../service/common.service';
import ImageLoad from 'react-native-image-placeholder';
import ForumDetailPage from "../forum-detail.page";
import globalStyles from '../../../style/style'

export default class ForumCell extends Component {

    //numberOfLines
    static propTypes = {
        numberOfLines: PropTypes.number,
        isShowCompleteInfo:PropTypes.bool,
        activeOpacity:PropTypes.number,
        onPressMoreButton: PropTypes.func,
    }

    static defaultProps = {
        numberOfLines: 1000,
        isShowCompleteInfo:false,
        activeOpacity:0.8,
    }

    pressForum(){
        // this.props.navigation.navigate('LoginPage')
        if(this.props.isShowCompleteInfo === false){
            this.props.navigation.navigate('ForumDetailPage', {data: this.props.data, rootPage:this.props.rootPage});
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.pressForum()} activeOpacity={this.props.activeOpacity}>
                <View style={styles.cellBox}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            <ImageLoad
                                style={{height: 40, width: 40, borderRadius:20, overflow:'hidden'}}
                                source={{uri: CommonService.host + this.props.data.img}}
                                placeholderSource={require('../../../../res/images/transparence.png')}
                                isShowActivity={false}
                                borderRadius = {20}
                            />
                        </TouchableOpacity>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[globalStyles.font, {fontSize: 15, color: '#333',maxWidth:200}]} numberOfLines={1}>
                                    {this.props.data.alias}
                                </Text>
                            </View>
                            <Text style={[globalStyles.font, {color: '#999', fontSize: 12}]}>
                                {CommonService.pipeOfUserInfo(this.props.data.major, '专业')}
                                - {CommonService.pipeOfUserInfo(this.props.data.enroll_year, '年级')}
                                - {CommonService.pipeOfUserInfo(this.props.data.degree, '学历')}
                            </Text>
                        </View>
                    </View>
                    <Text style={[globalStyles.font, {fontSize: 17, marginTop: 15, marginBottom: 10, color: '#444'}]}
                          selectable={true} numberOfLines={this.props.numberOfLines}>{this.props.data.content}</Text>
                    {this.elementForImg1()}
                    <View style={{flexDirection:'row',height:38,borderTopWidth:1, borderTopColor:'#f8f8f8', paddingTop:8, marginTop:10}}>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/comments.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.comment_num}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/browse.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.count_view}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/clock.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.time}</Text></View>
                        <View style={styles.footerItem}><Image source={require('../../../../res/icon/tag.png')} style={styles.footerIcon}/><Text style={[styles.footerText,globalStyles.font]}>{this.props.data.classTitle}</Text></View>
                    </View>
                </View>
                {this.props.data.userTitle!=="普通用户"?<Image style={[styles.userIcon]} source={require("../../../../res/icon/admin.png")}/>:null}
                {this.props.data.sort>0&&this.props.isShowCompleteInfo===false?<Image style={styles.fixTopIcon} source={require("../../../../res/icon/fixtop.png")}/>:null}
                {this.props.isShowCompleteInfo===true?<TouchableOpacity style={styles.moreButton} onPress={this.props.onPressMoreButton}><Image source={require('../../../../res/icon/more.png')} style={[styles.moreButtonImage]}/></TouchableOpacity>:null}
            </TouchableOpacity>
        )
    }


    elementForImg1() {
        if (this.props.data.img1 !== "") {
            let width = Dimensions.get('window').width-32;
            let height = 0;
            if(this.props.isShowCompleteInfo === true){
                height = width/(this.props.data.img1Width/this.props.data.img1Height)
            }else{
                height = width/(16/7);
            }
            return (
                <View style={{flex:1}}>
                    <ImageLoad style={{flex:1, height:height,width:width, marginBottom:15}}
                               placeholderSource={require('../../../../res/images/transparence.png')}
                               loadingStyle={{size: 'small', color: '#ccc'}}
                               source={{uri: CommonService.host + this.props.data.img1}}/>
                </View>
            )
        }
    }


}

const styles = StyleSheet.create({
    cellBox: {
        padding: 16,
        paddingBottom:0,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    fixTopIcon:{
        position:'absolute',
        width:40,
        height:40,
        right:0,
        top:0,
        tintColor:"#e8837e"
    },
    userIcon: {
        height: 14,
        width: 14,
        margin: 3,
        marginLeft: 6,
        position:'absolute',
        left:7,
        top:42,
    },
    moreButton:{
        position:'absolute',
        top:0,
        right:0,
        padding:10,
    },
    moreButtonImage:{
        width:16,
        height:16,
        tintColor:'#888'
    },
    footerItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    footerText:{
        color:'#999',
        fontSize:13,
        textAlign:'center'
    },
    footerIcon:{
        height:15,
        width:15,
        tintColor:'#888',
        marginTop:3,
        marginRight:7
    }
});