import React, {Component} from "react";
import {RefreshControl, ScrollView} from "react-native";
import I18n from '../../../i18n/i18n';
import Api from '../../../Api';
import CategoryItem from './categoryitem';
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
    List,
    CardItem
} from "native-base";
import {Grid, Row, Col} from "react-native-easy-grid";

import styles from "./styles";

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            title:'',
            description:'',
            items:[],
            refreshing:false
        }
        console.log('constructor')
    }

    componentDidMount () {
        this.loadData()
    }

    changeState = (json) => {
        console.log(json)
        this.setState({
            title:json.title,
            description:json.description,
            items:json.movies,
            refreshing:false
        })
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.loadData();
    }

    loadData = () => {
        console.log('loadData')
        Api.get({
            url:'https://facebook.github.io/react-native/movies.json',
            success: this.changeState
        })
    }
    getItems = (items) => {
        if(items.length > 0){
            const cartList = items.map((item, index)=>{
                return (<CategoryItem
                    key={index}
                    title={item.title}
                    releaseYear={item.releaseYear}
                />)

            })
            return cartList
        }
        return <Text>There are no results</Text>
    }


    render() {
        return (

            <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}>

                <Container style={styles.container}>
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
                        <Title>{I18n.t('users')}</Title>
                        </Body>
                        <Right/>

                    </Header>
                    <Card>
                        <List>
                            {this.getItems(this.state.items)}
                        </List>
                    </Card>

                </Container>
            </ScrollView>

        );
    }
}

export default Users;
