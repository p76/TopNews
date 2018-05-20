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
} from 'react-native';
import React, { Component } from 'react';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar } from 'c2-mobile';
import HomePage from '../HomePage/HomePage';
import Video from '../Video/Video';
import Headlines from '../Headlines/Headlines';



export default class Tsd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabBar textColorSelected="rgb(203,48,48)" textColor="#888888" >
                    <TabBar.Item
                        icon="home"
                        selectedIcon="home"
                        title="首页"
                        badge={3}
                    >
                        <HomePage />
                    </TabBar.Item>
                    <TabBar.Item
                        icon="video_library"
                        selectedIcon="video_library"
                        title="视频"
                    >
                        <Video />
                    </TabBar.Item>
                    <TabBar.Item
                        icon="chat_bubble_outline"
                        selectedIcon="chat_bubble_outline"
                        title="微头条"
                        badge={3}
                    >
                        <Headlines />
                    </TabBar.Item>
                </TabBar>
            </View>
        )
    }
}