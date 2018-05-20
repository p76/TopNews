'use strict'
//全局路由
//系统组件
import React, { Component } from 'react';
import { Navigator, Portal, Actions } from 'c2-mobile';
import { Provider } from 'react-redux';


import HomePage from './HomePage/HomePage';//首页
import ContentPage from './ContentPage/ContentPage';//详情页
import Comment from './Comment/Comment';//评论
import Editor from './Editor/Editor';//主编个人信息
import EditorDetails from './EditorDetails/EditorDetails';//主编列表
import Message from './Message/Message';//我的消息
import Settings from './Settings/Settings';//我的设置
import Login from './Login/Login';//我的设置
import configureStore from './Store/store';//我的设置
import SelfPage from './SelfPage/SelfPage';//个人主页

const store = configureStore();//获取store  
//创建全局路由
export default class NavigatorDemo extends Component {
    _console(store) {
        console.log(store);
        Actions.pop();
        return true;
    }
    render() {
        return (
            <Provider store={store}>
                <Navigator.Router backAndroidHandler={this._console} >
                    <Navigator.Modal hideNavBar>
                        <Navigator.Stack key="launch" initial>
                            <Navigator.Scene key="Login" component={Login} title="登陆" hideNavBar={true} />
                            <Navigator.Scene key="HomePage" component={HomePage} title="今日头条" hideNavBar={true} />
                            <Navigator.Scene key="ContentPage" component={ContentPage} title="新闻详情" hideNavBar={true} />
                            <Navigator.Scene key="Comment" component={Comment} title="评论详情" hideNavBar={true} />
                            <Navigator.Scene key="Editor" component={Editor} title="主编资料" hideNavBar={false} />
                            <Navigator.Scene key="EditorDetails" component={EditorDetails} title="主编列表" hideNavBar={true} />
                            <Navigator.Scene key="Message" component={Message} title="我的消息" hideNavBar={true} />
                            <Navigator.Scene key="Settings" component={Settings} title="我的设置" hideNavBar={true} />
                            <Navigator.Scene key="SelfPage" component={SelfPage} title="个人主页" hideNavBar={true} />
                        </Navigator.Stack>
                    </Navigator.Modal>
                </Navigator.Router>
            </Provider>
        )
    }
}