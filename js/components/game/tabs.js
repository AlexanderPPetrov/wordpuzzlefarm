import { TabNavigator } from 'react-navigation';
import React, {Component} from "react";
import {
    Text,
    Content,
    Button,
    Card
} from "native-base";

import { View, Image} from "react-native";

import WordsMenu from './WordsMenu';
import Statistics from './statistics';

import {Grid, Row, Col} from "react-native-easy-grid";

const avatar = require("../../../img/avatar.png");



const Tabs = TabNavigator({
    WordsMenu: {
        screen: Statistics,
    },
    Settings: {
        screen: Statistics,
    },
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#fff'
    },
    animationEnabled: false,
    swipeEnabled: false,
    indicatorStyle: {
        activeTintColor:'#fff'
    }

}, {
    swipeEnable: false // work
});

export default Tabs;