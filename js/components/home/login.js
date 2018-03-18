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
    Right,
    Icon,
    Form,
    Text,
    Toast
} from "native-base";

import styles from "./styles";
import Api from '../../../Api';
class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }


    login = () => {
        let loginData = {
            username: this.state.username,
            password: this.state.password,
        }

        Api.post({
            url:'login',
            data: loginData,
            success: this.loginSuccess
        })

    };

    loginSuccess = (response) => {
        console.log(response)
        this.props.navigation.navigate("Game")
    };

    render() {
        return (
            <View>
                <Form>
                    <Item style={styles.inputContainer}>
                        <Input placeholder={I18n.t('username')} value={this.state.username} onChangeText = {(newValue) => this.setState({username:newValue})}/>
                    </Item>
                    <Item style={styles.inputContainer}>
                        <Input secureTextEntry={true} placeholder={I18n.t('password')} value={this.state.password} onChangeText = {(newValue) => this.setState({password:newValue})}/>
                    </Item>
                </Form>
                <Button block style={styles.loginButton} onPress={() =>

                    /*this.login()*/
                     this.props.navigation.navigate("Game")

                }>
                    <Text>{I18n.t('login').toUpperCase()}</Text>
                </Button>
            </View>
        );
    }
}

export default Login;
