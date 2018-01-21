import { TabNavigator } from 'react-navigation';
import React, {Component} from "react";
import {
    Text,
    Content,
    Button,
    Card
} from "native-base";

import { View, Image} from "react-native";

import Profile from './profile';
import Statistics from './statistics';

import {Grid, Row, Col} from "react-native-easy-grid";

const avatar = require("../../../img/avatar.png");



const Tabs = TabNavigator({
    Profile: {
        screen: Profile,
    },
    Settings: {
        screen: Statistics,
    },
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#fff',
    },
    indicatorStyle: {
        activeTintColor:'#fff'
    }
});

export default Tabs;