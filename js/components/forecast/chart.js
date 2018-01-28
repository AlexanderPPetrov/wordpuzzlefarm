import React, {Component} from "react";
import I18n from '../../../i18n/i18n';
import {View, Dimensions} from "react-native";
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
import {VictoryChart, VictoryAxis, VictoryArea, VictoryScatter} from 'victory-native'

const colors = ["#ff7200",  "#8bb3db"];

// axis: {stroke: colors[i]},
// ticks: {padding: tickPadding[i]},
// tickLabels: {fill: colors[i], textAnchor: anchors[i]}

const tempAxisStyle = {
    axis: {
        stroke: colors[0]
    },
    tickLabels: {
        fontSize: '12',
        fontFamily: 'Roboto',
        padding: 5,
        fill: '#bd4e00'
    },
    grid: {
        stroke: '#adcae7',
        strokeWidth: 1,
        strokeDasharray: '3, 3',
    }

}

const humidityAxisStyle = {
    axis: {
        stroke: colors[1]
    },
    tickLabels: {
        fontSize: '12',
        fontFamily: 'Roboto',
        padding: 5,
        fill: '#6685a4'
    },
    grid: {
        strokeWidth: 0
    },
    ticks: {
        padding: -40
    }

}

const timeAxisStyle = {
    grid: {
        stroke: '#adcae7',
        strokeWidth: 1,
        strokeDasharray: '3, 3',
    }
}


class Chart extends React.Component {


    constructor (props){
        super(props)
        this.state = {
            style: {
                data: { fill: "tomato" }
            }
        }
    }
    componentDidMount () {
        console.log(this.props.temp)
    }

    getHoursLabel = (dateText) => {
        let label = dateText.split(' ')[1];
        label = label.split(':');
        label = label[0] + ':' + label[1]
        return label;
    }

    getDegrees = (t) => {
        const value = Math.round(t);
        return value
    }

    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>{this.props.day}</Text>
                </CardItem>
                <CardItem pointerEvents="none" style={{paddingLeft:0}}>
                    <VictoryChart style={{paddingLeft:0}} domain={{y: [-5, 5]}} height={250}>
                        <VictoryAxis key={0} tickFormat={(x) => this.getHoursLabel(x)} offsetY={50}/>
                        <VictoryAxis dependentAxis
                                     key={1}
                                     crossAxis={false}
                                     style={tempAxisStyle}
                            // Use normalized tickValues (0 - 1)
                            // Re-scale ticks by multiplying by correct maxima
                        />


                        <VictoryArea
                            key={0}
                            data={this.props.temp}
                            interpolation="natural"
                            style={{
                                data: {
                                    stroke: colors[0],
                                    fill: colors[0],
                                    fillOpacity: 0.5
                                }
                            }}
                            y={(data) => data.y / this.props.maxTemp}
                            y0={() => -5}


                        />

                        <VictoryScatter data={this.props.temp}
                                        size={3}
                                        style={{
                                            data: {
                                                fill: '#fff',
                                                stroke: colors[0],
                                                strokeWidth: 1
                                            }
                                        }}
                                        y={(datum) => datum.y / this.props.maxTemp}
                        />


                    </VictoryChart>

                </CardItem>

            </Card>
        );
    }
}

export default Chart;
