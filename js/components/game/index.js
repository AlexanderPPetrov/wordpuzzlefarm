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

import {View, BackHandler, Alert, Image, StatusBar} from "react-native"
import LettersContainer from "./lettersContainer"
import WordsMenu from "./WordsMenu"
import Banner from "./banner"
const background = require("../../../img/background_01.jpg");
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const gridSize = 14;
const letterSize = Math.floor(window.width / gridSize);
const words = ['donkey','cat','dogge', 'elephant', 'giraffe', 'dog'];
class Game extends Component {

    constructor(props){
        super(props)
        this.state = {
            wordsData:{}
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.handleBackButton();
            return true;
        });

        const crossWord = CrossWord.generate(words)
        this.setState({
            wordsData: crossWord.wordsInGridData,
            grid: crossWord.grid
        })
        this.refs.wordMenu.setLetterSize(letterSize);
        this.refs.wordMenu.setWordsData(crossWord.wordsInGridData)
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit',
            'Are you sure you want to exit?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false }
        )
    }

    highlightDropZone = (wordContainer, word) => {
        this.refs[wordContainer].highlight(true, word)
    }

    clearHighlights = (highLightedZone) => {
        this.refs[highLightedZone].highlight(false)
    }

    dropWord = (wordContainer, word) => {
        this.refs[wordContainer].fillWord(word)
    }

    renderLettersContainers = (lettersGrid, wordsData) => {
        if(!lettersGrid){
            return null;
        }
        let startX = lettersGrid.length,
            startY = lettersGrid.length,
            endX = 0,
            endY = 0;

        for (let i = 0; i < lettersGrid.length; i++) {
            for (let j = 0; j < lettersGrid[i].length; j++) {
                if (lettersGrid[i][j] != '') {
                    startX = Math.min(startX, j);
                    startY = Math.min(startY, i);
                    endX = Math.max(endX, j);
                    endY = Math.max(endY, i);
                }
            }
        }

        let words = []

        for (let [k, v] of Object.entries(wordsData)) {
            words.push(this.getWordContainer(startX, startY, k, v, endX, endY))
        }

        return words

    }

    getWordContainer = (startX, startY, word, wordData, endX, endY) => {

        return <LettersContainer ref={word} key={word}
                                 startX={startX}
                                 startY={startY}
                                 endX={endX}
                                 endY={endY}
                                 word={word}
                                 wordData={wordData}
                                 letterSize={letterSize}
                                 gridSize={gridSize}/>

    }

    render() {
        return (
                <Container>
                    <StatusBar hidden={true} />
                        <Image source={background} style={{flex:1, resizeMode:'cover', flex:1, alignSelf:'stretch',width:window.width}}/>
                        <View pointerEvents={'none'} style={{
                            backgroundColor:'rgba(0,20,50,0.25)',
                            position:'absolute',
                            width:window.width,
                            height:window.width

                        }}/>
                        {this.renderLettersContainers(this.state.grid, this.state.wordsData)}
                        <WordsMenu ref="wordMenu" highlightDropZone={this.highlightDropZone} dropWord={this.dropWord} clearHighlights={this.clearHighlights}/>
                        <Banner/>
                </Container>


        );
    }
}

export default Game;
