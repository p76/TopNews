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
        backgroundColor: '#f2f2f2'
    },
    renderRow: {
        width: width - 10,
        height: height / 20,
        marginTop: 10
    },
    data: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    data2: {
        width: 80
    },
    sexView: {
        height: 40,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',  
        justifyContent:'flex-end',
        marginRight:3 
    },
    sexSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 3
    },
    sexIcon: {
        width: 14,
        height: 14,
        borderWidth: 0.5,
        borderRadius: 14,
    },
    sex: {
        fontSize: Config.mhcBigFontSize,
        marginRight: 10
    },
});
module.exports = styles;

