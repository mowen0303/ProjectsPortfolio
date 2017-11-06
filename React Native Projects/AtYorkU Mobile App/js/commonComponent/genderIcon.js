import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet} from 'react-native';


export default class GenderIcon extends Component {

    constructor(props){
        super(props);
    }

    static propTypes = {
        gender: PropTypes.string,
        genderStyle: PropTypes.object
    }


    render() {
       return this.elementForGenderIcon();
    }

    elementForGenderIcon() {
        if (this.props.gender === '0') {
            return <Image style={[styles.userIcon,this.props.genderStyle]} source={require("../../res/icon/girl.png")}/>
        } else if (this.props.gender === '1') {
            return <Image style={[styles.userIcon,this.props.genderStyle]} source={require("../../res/icon/boy.png")}/>
        } else if (this.props.gender === '2'){
            return <Image style={[styles.userIcon,this.props.genderStyle]} source={require("../../res/icon/neutral.png")}/>
        }else{
            return false;
        }

    }
}

const styles = StyleSheet.create({

    userIcon: {
        height: 15,
        width: 15,
        margin: 3,
        marginLeft: 6
    }
});