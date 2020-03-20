import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';

export class LoadMore extends Component {

    static propTypes = {
        isLoading: PropTypes.bool
    }

    static defaultProps = {
        isLoading: true,
    }
    render() {
        if (this.props.isLoading === true) {
            return (
                <View style={{
                    height: 100,
                    justifyContent: 'center',
                    flexDirection: 'row',}}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return false
        }
    }
}

export class LoadMiddle extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        text:PropTypes.string,
    }

    static defaultProps = {
        isLoading: false,
        text:"加载中...",
    }

    render() {
        if (this.props.isLoading === true) {
            return (
                <View style={{position:'absolute',
                    left:Dimensions.get('window').width/2-70,
                    top:Dimensions.get('window').height/2-140,
                    width:140,
                    height:90,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:10,
                    backgroundColor:'rgba(0,0,0,0.8)'
                }}>
                    <ActivityIndicator style={{marginTop:20}}/>
                    <Text style={{color:"#aaa",marginTop:10,fontSize:13}}>{this.props.text}</Text>
                </View>
            )
        } else {
            return false
        }
    }
}