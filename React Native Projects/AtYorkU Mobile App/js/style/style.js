import {StyleSheet, Platform} from 'react-native';

export default globalStyles = StyleSheet.create({
    font:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFang SC' : 'normal',
    },
    fontLight:{
        fontFamily: (Platform.OS === 'ios') ? 'PingFangSC-Light' : 'normal',
    },
    inputBox: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height:40,
    },
    input: {
        padding: 0,
        color: "#484848",
        marginLeft: 14,
        flex: 1,
        height: 32,
    },
    listBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        minHeight:66,
        borderBottomWidth:1,
        borderColor:'#ebebeb',
    },
    listLabelRight: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',

    },
    listLabelRightIcon: {
        width:18,
        height:18,
        marginLeft:10,
        tintColor:"#ccc"
    },
    listLabelRightText:{
        fontSize:15,
        color:"#484848",
        maxWidth:220,
        textAlign:'right'
    },
    listLabelLeftText:{
        fontSize:17,
        color:"#484848",
    },
    headerLiteralButton:{
        marginRight:10
    }
});