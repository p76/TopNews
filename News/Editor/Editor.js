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
import css from './EditorCss';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Editor extends Component {
    constructor(props) {
        super(props);
        this._getDataSource = this._getDataSource.bind(this);
        this.state = {
            dataSource: ''
        }
    }
    componentWillMount() {
        // this._getDataSource()
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/editor/" + this.props.id + "/profile-page/android";
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: response,
                })
                console.warn(JSON.stringify(response));
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    // _renderRow(rowData: any, sectionID: string, rowID: string) {
    //     return (
    //         <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.HomePage({ id: rowData.id, status: true, heading: rowData.name })}>
    //             <Text style={{ color: 'black', margin: 15, flex: 1 }}>{rowData.name}</Text>
    //             <VectorIcon name={'keyboard_arrow_right'} size={25} color={'rgb(119,136,153)'} style={{ justifyContent: 'flex-end', marginRight: 10, marginTop: 10 }} />
    //         </TouchableOpacity>
    //     )
    // }
    // _getData(data) {
    //     var sectionID = [];
    //     var rowID = [];
    //     var getRowData = (dataBlob, sectionID, rowID) => {
    //         return dataBlob[sectionID][rowID];
    //     };
    //     let dataSource = new ListView.DataSource({
    //         getRowData: getRowData,
    //         rowHasChanged: (row1, row2) => row1 !== row2,
    //         sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    //     });
    //     return dataSource.cloneWithRows(data)
    // }

    render() {
        var HTML = "http://news-at.zhihu.com/api/4/editor/" + this.props.id + "/profile-page/android";
        return (
            <View style={{flex:1}}>
                <WebView
                    source={{uri:HTML,method: 'GET'}}                 
                    bounces={false}
                    scalesPageToFit={true}
                    style={{ width: width, height: height }}
                >
                </WebView>
            </View >
        )
    }
}