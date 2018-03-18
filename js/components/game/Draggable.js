/**
 *    * https://github.com/tongyy/react-native-draggable
 *
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import {StatusBar} from 'react-native';

const Window = Dimensions.get('window');
let dropPositions = {}
let _previousLeft = 0;
let _previousTop = 0;
let chatSize = 40;
let highLightedZone = ''
export default class Draggable extends Component {
    static propTypes = {
        renderText: PropTypes.string,
        renderShape: PropTypes.string,
        renderComponent: PropTypes.element,
        renderSize: PropTypes.number,
        imageSource: PropTypes.number,
        offsetX: PropTypes.number,
        offsetY: PropTypes.number,
        renderColor: PropTypes.string,
        reverse: PropTypes.bool,
        pressDrag: PropTypes.func,
        pressDragRelease: PropTypes.func,
        longPressDrag: PropTypes.func,
        pressInDrag: PropTypes.func,
        pressOutDrag: PropTypes.func,
        z: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number

    };
    static defaultProps = {
        offsetX: 100,
        renderShape: 'circle',
        renderColor: 'yellowgreen',
        renderText: '＋',
        renderSize: 40,
        offsetY: 100,
        reverse: true,
    }

    static addDropPosition = (position) => {
        if(!dropPositions[position.letterCount]){
            dropPositions[position.letterCount] = [position]
        }else{
            dropPositions[position.letterCount].push(position)
        }
    }

    removeDropPosition = (letterCount, word) => {
        console.log(dropPositions[letterCount])
        dropPositions[letterCount] = dropPositions[letterCount].filter(dropZones => dropZones.word !== word);
        dropPositions[dropPositions[letterCount]]
    }

    componentWillMount() {
        // if(this.props.reverse == false)
        this.state.pan.addListener((c) => this.state._value = c);
    }

    componentWillUnmount() {
        this.state.pan.removeAllListeners();
    }

    constructor(props, defaultProps) {
        super(props, defaultProps);
        const {pressDragRelease, reverse} = props;
        this.state = {
            pan: new Animated.ValueXY(),
            _value: {x: 0, y: 0}
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderMove: (event, gestureState) => {
                this.state.pan.setValue({x: gestureState.dx, y: gestureState.dy});
                const dropZone = this.isDropZone(gestureState);
                if(dropZone){
                    if(dropZone !== highLightedZone){
                        this.props.highlightDropZone(dropZone, this.props.word)
                    }
                    highLightedZone = dropZone
                }else{
                    if(highLightedZone){
                        this.props.clearHighlights(highLightedZone)
                        highLightedZone = ''
                    }
                }

            },

            onPanResponderRelease: (e, gestureState) => {
                if (pressDragRelease)
                    pressDragRelease(e, gestureState);
                // this.state.pan.flattenOffset();

                //this.restrictMovement(gestureState.moveX, gestureState.moveY, gestureState.dx, gestureState.dy);
                if(highLightedZone){
                    this.props.clearHighlights(highLightedZone)
                }
                const dropZone = this.isDropZone(gestureState);
                if(dropZone){
                    this.props.dropWord(dropZone, this.props.word)
                    this.removeDropPosition(dropZone.length, dropZone)
                    this.props.removeDraggable(this.props.word)
                }else{
                    this.reversePosition();
                }


            }
        });
    }

    componentDidMount = () => {
        //console.log(this.props.word, this.props.wordData)
    }

    isDropZone(gesture){
        const availablePositions = dropPositions[this.props.word.length]

        for(let i = 0; i < availablePositions.length; i++){
            let dz = availablePositions[i];
            if(gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX > dz.x && gesture.moveX < dz.x + dz.width){
                console.log(availablePositions[i].word)
                return availablePositions[i].word
            }
        }
        return false
    }

    reversePosition = () => {
        Animated.spring(
            this.state.pan,
            {toValue:{x:0,y:0}}
        ).start();
    }

    restrictMovement = (moveX, moveY, dx, dy) => {
        const { offsetX, offsetY} = this.props;

        let shouldMove = false,
            x = this.state._value.x,
            y = this.state._value.y,
            offsetTop = StatusBar.currentHeight || 15;

        const minLeft = 0 - offsetX,
            minTop = offsetTop - offsetY,
            minRight = (Window.width - this.props.renderSize * 2) - offsetX,
            minBottom = (Window.height - this.props.renderSize * 2 - offsetTop) - offsetY

        if (this.state._value.x < minLeft) {
            x = minLeft;
            shouldMove = true;
        }
        if (this.state._value.y < minTop) {
            y = minTop;
            shouldMove = true;
        }
        if (this.state._value.x > minRight) {
            x = minRight
            shouldMove = true;
        }
        if (this.state._value.y > minBottom) {
            y = minBottom
            shouldMove = true;
        }
        _previousLeft = x;
        _previousTop = y;
        if (!shouldMove) return;

        this.state.pan.setValue({x: this.state._value.x + dx, y: this.state._value.y + dy});
        Animated.spring(
            this.state.pan,
            {toValue: {x, y}}
        ).start(()=>{

        });
    }

    _positionCss = () => {
        const { renderSize, offsetX, offsetY, x, y, z } = this.props;

        let css = Platform.select({
            ios: {
                zIndex: 999,
                position: 'absolute',
                top: offsetY,
                left: offsetX
            },
            android: {
                elevation:3,
                position: 'absolute',
                width: Window.width,
                height: Window.height,
                top: offsetY,
                left: offsetX
            },
        });
        return css
    }

    render() {
        const {pressDrag, longPressDrag, pressInDrag, pressOutDrag} = this.props;
        return (<View style={{marginLeft:15, marginBottom:5}}>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[this.state.pan.getLayout()]}>
                    <TouchableOpacity
                        // style={this._dragItemCss()}
                        onPress={pressDrag}
                        onLongPress={longPressDrag}
                        onPressIn={pressInDrag}
                        onPressOut={pressOutDrag}
                    >
                        {this.props.renderComponent}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}


