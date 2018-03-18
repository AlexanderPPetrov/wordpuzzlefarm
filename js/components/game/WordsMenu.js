import { TabNavigator } from 'react-navigation';
import React, {Component} from "react";
import {
    Text,
    Content,
    Button,
    Card,
    CardItem,
    Body,
    List,
    ListItem,
    Right
} from "native-base";

import { View, Image} from "react-native";
import Draggable from "./Draggable";

import styles from './styles';

import {Grid, Row, Col} from "react-native-easy-grid";
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

let mainMenuInstance = null;
class WordsMenu extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            wordsData:{},
            size:0
        }
        mainMenuInstance = this;
    }
    static navigationOptions = {
        tabBarLabel: 'Profile'
    };

    componentDidMount(){

    }

    setLetterSize = (size) => {
        this.setState({
            size
        })
    }

    setWordsData = (wordsData) => {
        this.setState({
            wordsData
        })
    }

    removeDraggable = (word) => {
        delete this.state.wordsData[word]
        this.setState({
            wordsData: this.state.wordsData
        })
    }

    getContainerSize = (word) => {

        console.log(this.state.size*word.length)
        let containerStyle = {
            width: this.state.size*word.length*0.6 + this.state.size*0.6,
            height: this.state.size,
            backgroundColor:'rgba(255,255,255,0.6)',
            borderRadius:this.state.size*0.5,
            borderWidth:1,
            borderColor:'gray',
            flexDirection:'row',
            elevation: 2,
            paddingLeft:this.state.size*0.3,
            paddingRight:this.state.size*0.3
        }
        return containerStyle
    }


    getLetters = (word) => {
        let lettersArr = word.split('');
        const letters = lettersArr.map((letter, i) => {
            return <Text style={{
                width:this.state.size*0.6,
                lineHeight:this.state.size*0.85,
                fontSize: this.state.size/1.7,
                textAlign:'center'
            }} key={i} >{letter.toUpperCase()}</Text>
        })
        return letters;
    }

    getWords = () => {
        let wordsList = []
        for (let [k, v] of Object.entries(this.state.wordsData)) {
            wordsList.push(<Draggable key={k}
                                      reverse={false}
                                      wordData={v}
                                      word={k}
                                      renderComponent={
                                          <View style={this.getContainerSize(k)}>
                                             {this.getLetters(k)}
                                        </View>}
                                      highlightDropZone={this.props.highlightDropZone}
                                      dropWord={this.props.dropWord}
                                      clearHighlights={this.props.clearHighlights}
                                      removeDraggable={this.removeDraggable}
                                      offsetX={30}
                                      offsetY={window.width + 30*wordsList.length}
                                      renderSize={40} renderText='B'/>)
        }
        return wordsList
    }


    render() {
        return (
                this.getWords()

        );
    }
}


export default WordsMenu;