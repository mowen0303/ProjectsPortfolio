import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet,KeyboardAvoidingView, Alert, Platform, LayoutAnimation, TouchableOpacity,Text, Image, TextInput, Picker, DatePickerAndroid, DatePickerIOS} from 'react-native';
import globalStyles from '../../style/style';
import UserService from './service/user.service';
import {LoadMiddle} from "../../commonComponent/loadingView";
import CommonService from "../../service/common.service";



export default class ProfileModifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alias: this.props.navigation.state.params.userData.alias,
            description: this.props.navigation.state.params.userData.description,
            major: this.props.navigation.state.params.userData.major,
            enrollYear: this.props.navigation.state.params.userData.enroll_year,
            enrollYearTranslate: this.props.navigation.state.params.userData.enrollYearTranslate,
            degree: this.props.navigation.state.params.userData.degree,
            gender: this.props.navigation.state.params.userData.gender,
            oldPwd: "",
            newPwd: "",
            newPwd2: "",
            isLoading:false,
            datePickerBottom:-300,
        }
    }

    static navigationOptions = ({navigation})=>({
            headerStyle:{backgroundColor:"#fff"},
            title:navigation.state.params.title,
            headerTintColor:"#484848",
            headerRight:navigation.state.params.showHeaderButton?<TouchableOpacity style={globalStyles.headerLiteralButton} onPress={()=>{navigation.state.save()}}><Text>保存</Text></TouchableOpacity>:null
    });

    componentWillMount(){
        switch(this.props.navigation.state.params.title){
            case "昵称":
                this.props.navigation.state.save = this.updateAlias;
                break;
            case "签名":
                this.props.navigation.state.save = this.updateDescription;
                break;
            case "专业":
                this.props.navigation.state.save = this.updateMajor;
                break;
            case "入学时间":
                this.props.navigation.state.save = this.updateEnrollYear;
                break;
            case "学历":
                this.props.navigation.state.save = this.updateDegree;
                break;
            case "修改密码":
                this.props.navigation.state.save = this.updatePassword;
                break;
        }
    }

    render() {
        if(this.props.navigation.state.params.title === "昵称"){
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"昵称"}
                                value={this.state.alias}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({alias: text})}/>
                        </View>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "性别") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateGender('1')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>男</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('1',this.state.gender)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateGender('0')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>女</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('0',this.state.gender)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateGender('2')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>不明</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('2',this.state.gender)}
                            </View>
                        </TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "签名") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"签名"}
                                value={this.state.description}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({description: text})}/>
                        </View>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "专业") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"专业"}
                                value={this.state.major}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                onChangeText={(text) => this.setState({major: text})}/>
                        </View>
                    </ScrollView>
                </View>
            )
        } else if(this.props.navigation.state.params.title === "入学时间") {
            return (

                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.9} style={[globalStyles.inputBox]} onPress={()=>{this.openDataPicker()}}>
                            <Text style={[globalStyles.input, globalStyles.fontLight,{paddingBottom:0}]}>{CommonService.pipeOfUserEnrolmentYear(this.state.enrollYear)}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {this.elementDataPickerIOS()}
                </View>
            )
        } else if(this.props.navigation.state.params.title === "学历") {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateDegree('本科')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>本科</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('本科',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateDegree('研究生')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>研究生</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('研究生',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={globalStyles.listBox} onPress={()=>{this.updateDegree('博士')}}>
                            <Text style={[globalStyles.fontLight, styles.labelText]}>博士</Text>
                            <View style={globalStyles.listLabelRight}>
                                {this.elementSelectedIcon('博士',this.state.degree)}
                            </View>
                        </TouchableOpacity>
                        <LoadMiddle isLoading={this.state.isLoading}/>
                    </ScrollView>
                </View>
            )
        }  else if(this.props.navigation.state.params.title === "修改密码") {
            return (
                <View style={{flex:1}}>
                    <KeyboardAvoidingView style={styles.container} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"请输入现用密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({oldPwd: text})}/>
                        </View>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"新密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({newPwd: text})}/>
                        </View>
                        <View style={globalStyles.inputBox}>
                            <TextInput
                                ref="textInputRefer"
                                style={[globalStyles.input, globalStyles.fontLight]}
                                selectionColor={"#484848"}
                                placeholder={"确认新密码"}
                                clearButtonMode={'while-editing'}
                                underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({newPwd2: text})}/>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            )
        }

    }

    elementSelectedIcon(currentVal,targetVal){
        if(currentVal === targetVal){
            return <Image style={globalStyles.listLabelRightIcon} source={require('../../../res/icon/selected.png')}/>;
        }
    }
    updateAlias = ()=>{
        this.setState({isLoading:true});
        this.refs.textInputRefer.blur();
        let resultPromise = UserService.updateAlias(this.state.alias);
        this.handleUpdateResult(resultPromise);
    }
    updateGender(gender){
        this.setState({isLoading:true,gender:gender});
        let resultPromise = UserService.updateGender(gender);
        this.handleUpdateResult(resultPromise);

    }
    updateMajor=()=>{
        this.setState({isLoading:true});
        let resultPromise = UserService.updateMajor(this.state.major);
        this.handleUpdateResult(resultPromise);

    }
    updateWechat=()=>{
        this.setState({isLoading:true});
        let resultPromise = UserService.updateWechat(wechat);
        this.handleUpdateResult(resultPromise);

    }
    updateDescription=()=>{
        this.setState({isLoading:true});
        let resultPromise = UserService.updateDescription(this.state.description);
        this.handleUpdateResult(resultPromise);

    }
    openPicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({datePickerBottom:0})
    }

    closePicker(){
        LayoutAnimation.easeInEaseOut();
        this.setState({datePickerBottom:-250})
    }
    elementDataPickerIOS(){
        if (Platform.OS === 'ios'){
            return (
                <View style={{backgroundColor:'#eee',position:'absolute', left:0,right:0, bottom:this.state.datePickerBottom}}>
                    <View style={styles.doneBox}><TouchableOpacity onPress={()=>{this.closePicker()}} style={styles.doneBtn}><Text style={styles.doneText}>完成</Text></TouchableOpacity></View>
                    <DatePickerIOS date={new Date(this.state.enrollYear*1000)}
                                   mode="date"
                                   onDateChange={this.onDateChange}
                                   minimumDate = {new Date("1960/1/1")}
                                   maximumDate = {new Date()}/>
                </View>
            )
        }
    }
    onDateChange=(date)=>{
        this.setState({enrollYear:date.getTime()/1000});
    }
    async openDataPicker(){
        if (Platform.OS === 'ios') {
            this.openPicker();
        }else{
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date()
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    let time = `${year}/${month}/${day}`;
                    let dateObj = new Date(time);
                    this.setState({enrollYear:dateObj.getTime()/1000});
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }

    }
    updateEnrollYear=()=>{
        this.setState({isLoading:true});
        let resultPromise = UserService.updateEnrollYear(this.state.enrollYear);
        this.handleUpdateResult(resultPromise);
    }
    updateDegree(degree){
        this.setState({isLoading:true});
        let resultPromise = UserService.updateDegree(degree);
        this.handleUpdateResult(resultPromise);

    }
    updatePassword=()=>{
        this.setState({isLoading:true});
        if(this.state.newPwd ==="" || this.state.newPwd2==="" || this.state.oldPwd ===""){
            Alert.alert("请输入密码");
            return false;
        }
        if(this.state.newPwd !== this.state.newPwd2) {
            Alert.alert("两次新密码不一样");
            return false;
        }
        this.setState({isLoading:true});
        let resultPromise = UserService.updatePassword(this.state.oldPwd,this.state.newPwd);
        resultPromise.then(json=>{
            if(json.code===1){
                Alert.alert(json.message);
                this.props.navigation.goBack();
            }else{
                Alert.alert(json.message);
            }
            this.setState({isLoading:false});
        })
        .catch(error=>{
            console.log(error);
            this.setState({isLoading:false});
            Alert.alert("网路环境异常");
        })
    }




    handleUpdateResult(result){
        result.then(json=>{
            if(json.code===1){
                UserService.setUserDataToLocalStorage(json.result);
                this.props.navigation.state.params.parentPage.setState({userData:json.result});
                this.props.navigation.goBack();
            }else{
                Alert.alert(json.message);
            }
            this.setState({isLoading:false});
        })
        .catch(error=>{
            console.log(error);
            this.setState({isLoading:false});
            Alert.alert("网路环境异常");
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        paddingHorizontal:24,

    },
    button:{
        backgroundColor:"#484848",
        marginTop:20,
        paddingHorizontal:30,
        paddingVertical:12,
        borderRadius:6,
        marginHorizontal:70
    },
    buttonText:{
        color:"#fff",
        textAlign:'center'
    },
    doneBox:{
        height:40,
        justifyContent:'flex-end',
        flexDirection:'row',
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderTopColor:'#e4e4e4'
    },
    doneBtn:{
        width:80,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center",
    },
    doneText:{
        color:'#0e7477'
    }
})