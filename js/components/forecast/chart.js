import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Card,
    CardItem,
    Right,
    Icon,
    Form,
    Text,
    Toast
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import styles from "./styles";
import Api from '../../../Api';
class Chart extends React.Component {


    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>{this.props.day}</Text>
                </CardItem>
                <CardItem>
                    <Grid>
                        <Row>
                            <Col>
                                <Text>Display Chart Here</Text>
                            </Col>
                        </Row>
                    </Grid>
                </CardItem>

            </Card>
        );
    }
}

export default Chart;
