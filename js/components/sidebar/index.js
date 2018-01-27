import React, {Component} from "react";
import {Image} from "react-native";

import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables,
} from "native-base";

import styles from "./style";
import I18n from '../../../i18n/i18n';


const drawerImage = require("../../../img/oreo_logo.png");

const datas = [
    {
        name: I18n.t('myAccount'),
        route: "MyAccount",
        icon: "ios-person"
    },
    {
        name: I18n.t('users'),
        route: "Users",
        icon: "ios-people"
    },
    {
        name: I18n.t('forecast'),
        route: "Forecast",
        icon: "ios-analytics-outline"
    }
];


class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    iconStyle = (icon) => {
        console.log(icon)
        let marginLeft = 0,
            marginRight = 0
        if(icon == 'ios-person'){
            marginLeft = 4,
            marginRight = -4
        }
        return {
            color: "#777",
            fontSize: 26,
            width: 30,
            marginLeft: marginLeft,
            marginRight: marginRight
        }
    };

    render() {
        return (
            <Container>
                <Content bounces={false} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                    <View style={styles.imageContainer}>
                        <Image source={drawerImage} style={styles.drawerImage}></Image>
                    </View>
                    <List
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                                <Left>
                                    <Icon active name={data.icon} style={this.iconStyle(data.icon)}/>
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

export default SideBar;
