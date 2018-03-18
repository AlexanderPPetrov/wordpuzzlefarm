import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Card,
    Body,
    CardItem
} from "native-base";

import Tabs from './tabs';

import {Grid, Row, Col} from "react-native-easy-grid";
import CrossWord from '../../../CrossWord';
import styles from "./styles";
import Draggable from "./Draggable";

import {View, BackHandler, Alert, Image, StatusBar, TouchableWithoutFeedback} from "react-native"
const background = require("../../../img/background_01.jpg");
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const letterOffset = 1;
class MyAccount extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentWord:this.props.word.replace(/[^A-Z]/g, " "),
            highlighted: false,
            wordFilled: false,
            focused: false,
            zIndex:1
        }
    }
    componentDidMount = () => {

    }

    fillWord = (currentWord) => {

        this.setState({
            currentWord,
            wordFilled:true,
            zIndex:999
        })

    }

    onPress = () => {
        if(this.state.wordFilled) {
            this.state.focused = !this.state.focused
            this.setState({
                focused: this.state.focused
            })
        }
        console.log('focus')
    }

    highlight = (highlighted, word = this.props.word.replace(/[^A-Z]/g, " ")) => {
        if(this.state.wordFilled){
            this.setState({
                highlighted
            })
            return;
        }
        this.setState({
            highlighted,
            currentWord:word
        })
    }
    getContainerStyle = () => {

        let offsetX = Math.abs(this.props.startX - (this.props.endX + 1)),
            offsetY = Math.abs(this.props.startY - (this.props.endY + 1));

        offsetX = Math.round((this.props.gridSize - offsetX) * 0.5);
        offsetY = Math.round((this.props.gridSize - offsetY) * 0.5);

        let borderWidth = 4;


        let top = (this.props.wordData.y - this.props.startY + offsetY)*(this.props.letterSize + letterOffset);
        let left = (this.props.wordData.x - this.props.startX + offsetX)*(this.props.letterSize  + letterOffset);
        let width = this.props.letterSize + borderWidth*2;
        let height = this.props.letterSize + borderWidth*2;
        let flexDirection = 'row'
        let borderColor = 'transparent';
        let elevation = 0;
        if(this.props.wordData.direction == 'HORIZONTAL'){
            width = (this.props.letterSize + letterOffset)*this.props.word.length - letterOffset + borderWidth*2
           // left = left - 1;
           //  left = left - letterOffset
        }else{
            height = (this.props.letterSize+ letterOffset)*this.props.word.length - letterOffset + borderWidth*2
            flexDirection = 'column'
            // top = top - 1
        }
        if(this.state.highlighted){
            borderColor = 'rgba(220,255,0,0.5)';
            elevation = 2
        }


        let containerStyle = {
            width,
            height,
            top,
            left,
            flexDirection,
            borderWidth,
            borderRadius:2,
            borderColor,
            elevation,
            zIndex:this.state.zIndex
        }

        return containerStyle

    }

    getBackground = () => {
        let backgroundColor = 'rgba(255,255,255,0.7)';
        if(this.state.wordFilled){
            backgroundColor = 'rgba(255,255,255,1)'
        }

        if(this.state.focused) {
            backgroundColor = '#225d97'
        }
        return {backgroundColor}
    }

    getLetterStyle = () => {
        let color = '#333';
        if(this.state.focused){
            color = '#fff'
        }
        let style = {
            height:this.props.letterSize - 2,
            width:this.props.letterSize - 2,
            textAlign:'center',
            fontSize: Math.round(this.props.letterSize/2),
            color
        }
        return style
    }

    getLetters = () => {
        let lettersArr = this.state.currentWord.split('');
        const letters = lettersArr.map((letter, i) => {
            let marginBottom = letterOffset;
            let marginRight = letterOffset;
            if(this.props.wordData.direction == 'HORIZONTAL'){
                marginBottom = 0
            }else{
                marginRight = 0
            }
            if(i === lettersArr.length - 1){
                marginRight = 0
                marginBottom = 0;
            }
            return <Button onPress={this.onPress} style={[styles.letterContainer, {height:this.props.letterSize, width:this.props.letterSize, marginBottom, marginRight}, this.getBackground()]} key={i}>
                 <Text style={this.getLetterStyle()} >{letter.toUpperCase()}</Text>
            </Button>
        })
        return letters;
    }

    setDropZoneValues = (event) => {
        let dropZone = event.nativeEvent.layout
        dropZone.letterCount = this.props.word.length
        dropZone.word = this.props.word
        Draggable.addDropPosition(dropZone)
    }

    render() {
        return (
                <View onLayout={this.setDropZoneValues} style={[styles.wordContainer, this.getContainerStyle()]}>
                    {this.getLetters()}
                </View>


        );
    }
}

export default MyAccount;
