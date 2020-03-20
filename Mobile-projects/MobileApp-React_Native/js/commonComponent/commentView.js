import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, LayoutAnimation} from 'react-native';


export default class CommentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardHeight: 0,
            commentBoxHeight: 0,
            placeholder:"回复楼主",
            value: "",
            receiverID:null
        }
    }

    static propTypes = {
        submit: PropTypes.func,
    }

    render() {
        return (
            <View style={[styles.commentBox, {
                height: this.state.commentBoxHeight,
                marginBottom: this.state.keyboardHeight
            }]}>
                <TextInput
                    ref="textInputRefer"
                    style={styles.commentInput}
                    selectionColor={"#484848"}
                    multiline={true}
                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                    onChangeText={(text)=>this.setState({value:text})}
                    onBlur={this.onBlur}
                    onContentSizeChange={this.onContentSizeChange}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                />
                <TouchableOpacity style={styles.commentButton} onPress={()=>{this.submit()}}>
                    <Text style={styles.commentButtonText}>发送</Text>
                </TouchableOpacity>
            </View>
        )
    }

    submit(){
        //console.log(this.state.receiverID)
        this.refs.textInputRefer.blur();
        this.props.submit();
    }

    getFocus(){
        this.refs.textInputRefer.focus();
    }

    onBlur =()=>{
        if(this.state.value===""){
            this.setState({placeholder:"回复楼主",receiverID:null})
        }
    }

    onContentSizeChange = (event) => {
        this.setState({commentBoxHeight: Math.min(80, event.nativeEvent.contentSize.height + 24)})
    }



    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardWillHideListener.remove();
    }

    keyboardWillShow = (e) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })

    }

    keyboardWillHide = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

}

const styles = StyleSheet.create({
    commentBox: {
        height: 40,
        backgroundColor: "#f4f4f4",
        borderTopWidth: 1,
        borderTopColor: "#e8e8e8",
        flexDirection: "row"
    },
    commentInput: {
        fontSize: 14,
        backgroundColor: "#fff",
        color: "#484848",
        borderRadius: 4,
        paddingHorizontal:10,
        paddingTop:5,
        flex: 1,
        marginRight: 10,
        position: "absolute",
        left: 10,
        top: 5,
        bottom: 5,
        right: 60,
    },
    commentButton: {
        backgroundColor: "#e5e5e5",
        width: 50,
        height: 28,
        borderRadius: 4,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        top: 5,
        right: 10
    },
    commentButtonText: {
        color: "#666"
    }
});