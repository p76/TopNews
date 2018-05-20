'use strict'

import {
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';
import { Config } from 'c2-mobile';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let styles = StyleSheet.create({
    main: {
        backgroundColor: 'rgb(203,48,48)',
        flexDirection: 'row',
        alignItems: "center"
    },
    text: {
        color: 'white',
        paddingLeft: 30,
        fontSize: 18,
    },
    longtext: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 1
    },
    standard: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    tou: {
        backgroundColor: 'white',
        marginBottom: 1
    },
    render: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop:10
    },
    rendertext: {
        margin: 4,
        color: 'black',
        flex:1
    },
    con: {
        marginLeft: 44,
        color: 'black',
        paddingBottom:10,
        paddingRight:15
    },
    vec:{
        marginTop:7,
        color:'rgb(169,169,169)'
    }

});
module.exports = styles;

