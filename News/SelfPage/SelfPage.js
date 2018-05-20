'use strict'

import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Platform,
    Navigator,
    RefreshControl,
    ListView,
    FlatList,
    Dimensions,
    TextInput,
    Image,
    DrawerLayoutAndroid,
    WebView,
} from 'react-native';
import React, { Component } from 'react';
import css from './SelfPageCss';
import { connect } from 'react-redux';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
import { logOut } from '../Actions/loginActions'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class SelfPage extends Component {
    constructor(props) {
        super(props);
        this._handleLogin = this._handleLogin.bind(this);
        this.state = {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 登出完成，且成功登出
        if (nextProps.status == null && !nextProps.isSuccess) {
            // this.props.navigator.replace({
            //     id: 'MainPage',
            //     component: MainPage,
            //     passProps: {
            //         user: nextProps.user
            //     },
            // });
            Actions.Settings();
            return false;
        }
        return true;
    }
    _handleLogin() {
        this.props.dispatch(logOut());
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.props.statusChange == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center' }}>
                <View style={{ width: width, height: 60, backgroundColor: this.props.statusChange == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 18 }} onPress={() => Actions.pop()}>
                        <VectorIcon name={'keyboard_backspace'} size={25} style={{ color: 'white', }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, flex: 1 }}>个人主页</Text>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 40, flex: 1 }}>
                    <Image source={{ uri: this.props.user.avatar }} style={{ width: 80, height: 80, borderRadius: 40, borderColor:this.props.statusChange==0?'rgb(128,128,128)': 'rgb(30,144,255)', borderWidth: 1 }} />
                    <Text style={{ paddingTop: 12, fontSize: 18, color: this.props.statusChange==0?'white':'black' }}>{this.props.user.name}</Text>
                </View >
                <TouchableOpacity onPress={() => this._handleLogin()} style={{ width: width / 1.9, borderRadius: 20, borderColor: 'rgb(192,192,192)', borderWidth: 1, alignItems: 'center', marginBottom: 60,backgroundColor: this.props.statusChange == 0 ? 'rgb(128,128,128)' : 'white' }}>
                    <Text style={{ color: 'rgb(165,42,42)', paddingVertical: 12 }}>登出</Text>
                </TouchableOpacity>
            </View >
        )
    }
}
function select(store) {
    return {
        status: store.loginIn.status,
        isSuccess: store.loginIn.isSuccess,
        user: store.loginIn.user,
        statusChange: store.ChangeModual.status,
    }
}

export default connect(select)(SelfPage);