import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container} from "native-base";
import Login from "./login";
import styles from "./styles";


const logo = require("../../../img/oreo_logo.png");


class Home extends Component {

	render() {

		return (
			<Container style={styles.loginContainer}>
				<StatusBar barStyle="light-content" />
				<View style={styles.imageContainer}>
					<Image source={logo} resizeMode="contain" style={styles.logo}></Image>
				</View>
					<Login navigation={this.props.navigation}></Login>
			</Container>
		);
	}
}

export default Home;
