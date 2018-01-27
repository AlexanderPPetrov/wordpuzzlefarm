import React from "react";
import {DrawerNavigator} from "react-navigation";

import MyAccount from "./components/myaccount/";
import Users from "./components/users/";
import Forecast from "./components/forecast/";

import SideBar from "./components/sidebar";


const Drawer = DrawerNavigator(
    {
        MyAccount: {screen: MyAccount},
        Users: {screen: Users},
        Forecast: {screen:Forecast}

    },
    {
        initialRouteName: "MyAccount",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default Drawer;
