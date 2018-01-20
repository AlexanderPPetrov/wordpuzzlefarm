const React = require("react-native");

const {StyleSheet} = React;

export default {
    balancePadding: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:20
    },
    safeBalanceContainer: {
        backgroundColor: "#fff",
    },
    balancesContainer: {
        backgroundColor: "#fce0d4",
    },

    balanceView: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },

    headerItem: {
        height:50,
        paddingLeft:10
    },
    headerIconContainer: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#ff8600',
        borderRadius: 30
    },
    headerIcon: {
        color:"#fff",
    },
    headerLabel: {
        color:"#617d8a",
        fontSize:14,
        marginLeft:7
    },
    headerButton: {
        height:30
    },

    accountValue: {
        textAlign:'right',
        color:'#617d8a'
    }

};
