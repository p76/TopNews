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
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#1a191f',
        height: 50,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 10,
    },

});
module.exports = styles;

