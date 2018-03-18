
import React from "react";

import { StyleProvider,Root } from "native-base";
import { StackNavigator } from "react-navigation";
import Home from "./components/home/";
import Game from "./components/game/index";

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

const AppNavigator = StackNavigator(
    {
        Home: {screen: Home},
        Game: { screen: Game }

    },
    {
        initialRouteName: "Game",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <StyleProvider style={getTheme(material)}>
            <AppNavigator />
        </StyleProvider>

    </Root>;
