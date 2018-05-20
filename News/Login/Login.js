/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image
} from 'react-native';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
import { connect } from 'react-redux';
import { doLogin } from '../Actions/loginActions'
import MainPage from '../HomePage/HomePage'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this._onChangeName = this._onChangeName.bind(this);
        this._onChangePswd = this._onChangePswd.bind(this);        

        this.state = {
            username: '',
            password: ''
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成，且成功登录
        if (nextProps.status === 'done' && nextProps.isSuccess) {
            // this.props.navigator.replace({
            //     id: 'MainPage',
            //     component: MainPage,
            //     passProps: {
            //         user: nextProps.user
            //     },
            // });
            Actions.HomePage({ user: nextProps.user });
            return false;
        }
        return true;
    }
    _onChangeName(text) {
        this.setState({
            username: text
        });
    }

    _onChangePswd(text) {
        this.setState({
            password: text
        });
    }
    _handleLogin() {
        this.props.dispatch(doLogin());
    }
    render() {
        let tips;
        if (this.props.status === 'init') {
            tips = '请点击登录';
        }
        else if (this.props.status === 'doing') {
            tips = '正在登录...';
        }
        else if (this.props.status === 'done' && !this.props.isSuccess) {
            tips = '登录失败, 请重新登录';
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Image source={require('./timgOSMUALVZ.jpg')} style={{ width: width, height: height, justifyContent: 'center',alignItems:'center' }}>
                    <Text>{tips}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <VectorIcon name={'user'} size={30} style={{ color: 'rgb(255,160,122)' }} />
                        <TextInput
                            ref="login_name"
                            placeholder='username'
                            style={styles.loginInput}
                            value={this.state.username}
                            onChangeText={this._onChangeName} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center', alignItems: 'center' }} >
                        <VectorIcon name={'lock2'} size={31} style={{ color: 'rgb(255,160,122)' }} />                        
                        <TextInput
                            ref="login_psw"
                            placeholder='password'
                            style={styles.loginInput}
                            secureTextEntry={true}
                            value={this.state.password}                            
                            onChangeText={this._onChangePswd} />
                    </View>
                    <TouchableOpacity onPress={this._handleLogin.bind(this)} style={{ width: width / 1.9, borderRadius: 20, borderColor: 'rgb(255,160,122)', borderWidth: 1, alignItems: 'center', marginTop: 80 ,justifyContent:'center'}}>
                        <Text style={{ color: 'rgb(255,160,122)', paddingVertical: 12 }}>登陆</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
}

function select(store) {
    return {
        status: store.loginIn.status,
        isSuccess: store.loginIn.isSuccess,
        user: store.loginIn.user
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginInput: {
        height: 40,
        borderColor: '#000',
        width: 200,
        fontSize: 16,
    },
});

export default connect(select)(LoginPage);
