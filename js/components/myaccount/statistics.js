import React, {Component} from "react";
import {
    Text,
    Content,
    Button,
    Card
} from "native-base";

import { View, Image} from "react-native";

import {Grid, Row, Col} from "react-native-easy-grid";


class Statistics extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Settings'
    
    };

    render() {
        return (
            <Content padder>
                <Text>Settings Screen</Text>
            </Content>
        );
    }
}


export default Statistics;