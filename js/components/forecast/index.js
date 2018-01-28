import React, {Component} from "react";
import {Image, View, StatusBar} from "react-native";
import I18n from '../../../i18n/i18n';
import Api from '../../../Api';

import Chart from './chart';

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
import styles from "./styles";

const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


class Forecast extends Component {


    constructor(props) {
        super(props);
        this.state = {
            weatherData: []
        }
    }

    componentDidMount = () => {
        this.loadWeatherData()
    }

    loadWeatherData = () => {

        Api.get({
            url: 'http://api.openweathermap.org/data/2.5/forecast',
            data: {
                q: 'Plovdiv,BG',
                appid: 'cfed679d59a400ce311452d1f70e6c4d',
                units: 'metric'
            },
            success: this.dataLoaded
            // error: this.dataNotLoaded,
            // always: this.alwaysHandler
        })

    };

    alwaysHandler = () => {
        // console.log('I am always executed')
    }

    dataNotLoaded = () => {
        console.log('data was not loaded')
    };

    dataLoaded = (response) => {
        const days = 5;
        const dataLength = response.list.length;
        let chartData = [];
        for(let k = 0; k < days; k++){

            let data = response.list.slice(k*dataLength/days,(1 + k)*dataLength/days);
            let weatherDayData = this.prepareWeatherDataDay(data);
            chartData.push(weatherDayData)
        }
        this.setState({
            weatherData:chartData
        });

    };

    prepareWeatherDataDay = (data) => {

        let tempData = [];
        let humidityData = [];

        for(let i = 0; i < data.length; i++){
            let current = data[i];

            let temp = {
                x: current.dt_txt,
                y: current.main.temp
            }
            tempData.push(temp)

            let humidity = {
                x: current.dt_txt,
                y: current.main.humidity
            }
            humidityData.push(humidity)

        }

        const day = data[0].dt_txt.split(' ')[0];

        let chartData = {
            temp: tempData,
            maxTemp: this.defineMax(tempData),
            humidity: humidityData,
            maxHumidity: this.defineMax(humidityData),
            day:day
        }

        return chartData;

    };

    defineMax = (data) => {
        // find maxima for normalizing data
        const maxValue = Math.max(...data.map((d) => d.y))
        return maxValue;
    };


    getCharts = () => {
        if(this.state.weatherData.length > 0){
            const chartsList = this.state.weatherData.map((current, i)=> {
                return <Chart key={i} day={current.day} temp={current.temp} maxTemp={current.maxTemp}></Chart>
            })
            return chartsList
        }
        return null;
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{I18n.t('forecast')}</Title>
                    </Body>
                    <Right/>

                </Header>
                <Content padder>
                    {this.getCharts()}
                </Content>
            </Container>
        );
    }
}

export default Forecast;
