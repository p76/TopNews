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
    today: {
        color: 'white',
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    modul: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 5,
        alignItems: 'center',
        right:5,
        justifyContent:'center'
    },
    textinput: {
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        height: 35
    },
    flatlist: {
        paddingLeft: 10, 
        fontSize: 18, 
        color: 'black'
    },
    standard:{
        flex: 1 ,
        // backgroundColor:'#f2f2f2'
    },
    renderRow:{
        width:width-10,
        height:height/20,
        marginTop:10
    }

});
module.exports = styles;

