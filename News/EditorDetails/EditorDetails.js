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
import css from './EditorDetailsCss';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class EditorDetails extends Component {
    constructor(props) {
        super(props);
        this._getData = this._getData.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: this._getData([])
        }
    }
    componentWillMount() {
        this.setState({
            dataSource: this._getData(this.props.element)
        })
    }
    // _getDataSource() {
    //     var url = "http://news-at.zhihu.com/api/4/editor/" + this.props.id + "/profile-page/android";
    //     return Fetch.getJson(url, {})
    //         .then((response) => {
    //             this.setState({
    //                 dataSource: response,
    //             })
    //             console.warn(JSON.stringify(response));
    //         }).catch((error) => {
    //             console.warn(JSON.stringify(error));
    //         });
    // }

    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: 'rgb(220,220,220)', borderBottomWidth: 1 }} onPress={() => Actions.Editor({ id: rowData.id })}>
                <View style={{ padding: 15 }}>
                    <Image source={{ uri: rowData.avatar }} style={{ width: 45, height: 45, borderRadius: 22, }} />
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={{ color: 'black', fontSize: 18 }}>{rowData.name}</Text>
                    <Text style={{ paddingTop: 8, fontSize: 13 }}>{rowData.bio}</Text>
                </View>

            </TouchableOpacity>
        )
    }
    _getData(data) {
        var sectionID = [];
        var rowID = [];
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };
        let dataSource = new ListView.DataSource({
            getRowData: getRowData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        return dataSource.cloneWithRows(data)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: width, height: 60, backgroundColor: 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 18 }} onPress={() => Actions.pop()}>
                        <VectorIcon name={'keyboard_backspace'} size={25} style={{ color: 'white', }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, flex: 1 }}>主编</Text>
                </View>
                <ListView
                    style={css.standard}
                    ref={'listView'}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                />
            </View >
        )
    }
}