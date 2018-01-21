import { TabNavigator } from 'react-navigation';
import React, {Component} from "react";
import {
    Text,
    Content,
    Button,
    Card
} from "native-base";

import { Image} from "react-native";

import styles from './styles';

import {Grid, Row, Col} from "react-native-easy-grid";

const avatar = require("../../../img/avatar.png");

class ProfileScreen extends React.Component {
    
    static navigationOptions = {
        tabBarLabel: 'Profile'
    };

    render() {
        return (

        <Content padder>

            <Card>

                <Text>Profile Screen</Text>

                <Grid>
                    <Row style={{backgroundColor: 'green'}}>
                        <Col style={styles.imageContainer}>
                            <Image source={avatar} resizeMode="contain" style={styles.avatar}></Image>
                        </Col>
                        <Col>
                            <Text>Ivan Petrov</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={1}>
                            <Text>email:</Text>
                        </Col>
                        <Col size={2}>
                            <Text>ivan.petrov@abv.bg</Text>
                        </Col>
                    </Row>
                </Grid>


            </Card>


        </Content>

        );
    }
}

class SettingsScreen extends React.Component {
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

const Tabs = TabNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
}, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#fff',
    },
    indicatorStyle: {
        activeTintColor:'#fff'
    }
});

export default Tabs;