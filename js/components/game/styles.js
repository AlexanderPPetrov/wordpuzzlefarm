const React = require("react-native");
const {StyleSheet} = React;

export default {

    infoContainer: {
        padding:10,
        borderColor: '#F5F5F5',
        borderWidth:1,
        height:'100%'
    },
    profileList: {
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
        paddingTop:10,
        paddingBottom:10
    },
    listLabel: {
        color:'#666'
    },
    name: {
        fontSize: 20,
        color:'#000'
    },
    listValue: {
        alignSelf: 'stretch',
        textAlign: 'right'
    },
    wordContainer: {
        position:'absolute'
    },
    letterContainer: {
        paddingLeft:0,
        paddingTop:0,
        paddingRight:0,
        paddingBottom:0,
        backgroundColor:'rgba(255,255,255,0.7)',
        borderRadius:2,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.6)'
    }

};
