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
        right: 5,
        justifyContent: 'center'
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
    standard: {
        flex: 1,
    },
    renderRow: {
        width: width - 10,
        height: height / 20,
        marginTop: 10
    },
    render: {
        alignItems: 'center',
        // borderRadius: 20,
    },
    renderview: {
        width: width - 10,
        height: height / 8,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row'
    },
    rendertext: {
        color: 'black',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 15,
        flex: 1
    },
    renderimg: {
        width: 60,
        height: 60,
        margin: 5
    },
    headimg: {
        height: 200,
        width: width
    },
    headtou: {
        position: 'absolute',
        height: 200,
        width: width,
        paddingHorizontal: 15
    },
    headtext: {
        color: 'white',
        marginTop: 130,
        fontSize: 20
    },
    rec: {
        paddingLeft: 10,
        paddingVertical: 10
    },
    rectou: {
        flexDirection: 'row',
        marginTop: 5
    },
    edt: {
        marginLeft: 10,
        alignItems: 'center'
    },
    edtimg: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    pic: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navitou: {
        flexDirection: 'row',
        paddingTop: 10
    },
    navitext: {
        color: 'white',
        marginLeft: 5,
        marginTop: 5
    },
    naviimg: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 10
    },
    navivec: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    naviset: {
        marginRight: 5,
        marginVertical: 8,
        marginLeft: 20
    },
    navitext2: {
        color: 'white',
        marginTop: 8
    },
    home: {
        flexDirection: 'row',
        padding: 10
    },
    hometext: {
        marginLeft: 15
    },
    change: {
        flexDirection: 'row',
        marginRight: 15
    },
    changemodual: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 2
    }

});
module.exports = styles;

