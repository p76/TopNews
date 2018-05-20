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
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
import css from './CommentCss';
import moment from 'moment';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Comment extends Component {

    constructor(props) {
        super(props);
        this._getDataSource = this._getDataSource.bind(this);
        this._getLongDataSource = this._getLongDataSource.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._LongrenderHeader = this._LongrenderHeader.bind(this);
        this._LongrenderRow = this._LongrenderRow.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this.state = {
            dataSource: this._getData([]),
            LongdataSource: this._getData([]),
            content: '',
            title: '',
        }
    }

    componentWillMount() {
        this._getDataSource();
        this._getLongDataSource()
    }
    _getLongDataSource() {
        var url = "http://news-at.zhihu.com/api/4/story/" + this.props.id + "/long-comments";
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    LongdataSource: this._getData(response.comments),
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/story/" + this.props.id + "/short-comments";
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: this._getData(response.comments),
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
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
    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={css.tou}>
                <View style={css.render}>
                    <Image source={{ uri: rowData.avatar }} style={css.image} />
                    <Text style={css.rendertext}>{rowData.author}</Text>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                        <VectorIcon name={'thumbs-up'} size={12} style={css.vec} />
                        <Text style={{ marginTop: 3, width: 20, marginLeft: 3, color: 'rgb(169,169,169)' }}>{rowData.likes}</Text>
                    </View>
                </View>
                <Text style={css.con}>{rowData.content}</Text>
                <Text style={[css.con, { marginLeft: width - 95, color: 'rgb(169,169,169)' }]}>{moment.unix(rowData.time).format("YYYY-MM-DD")}</Text>
            </TouchableOpacity>
        )
    }
    _LongrenderHeader() {
        return (
            <Text style={css.longtext}>{this.props.long}条长评论</Text>
        )
    }
    _renderHeader() {
        return (
            <Text style={css.longtext}>{this.props.short}条短评论</Text>
        )
    }
    _LongrenderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={css.tou}>
                <View style={css.render}>
                    <Image source={{ uri: rowData.avatar }} style={css.image} />
                    <Text style={css.rendertext}>{rowData.author}</Text>
                    <VectorIcon name={'thumbs-up'} size={12} style={css.vec} />
                    <Text style={{marginTop: 3, width: 20, marginLeft: 3, color: 'rgb(169,169,169)' }}>{rowData.likes}</Text>
                </View>
                <Text style={css.con}>{rowData.content}</Text>
                <Text style={[css.con, { marginLeft: width - 95, color: 'rgb(169,169,169)' }]}>{moment.unix(rowData.time).format("YYYY-MM-DD")}</Text>                
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: width, height: 60, backgroundColor: 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <VectorIcon name={'keyboard_backspace'} size={25} style={{ color: 'white', marginLeft: 18 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={css.text}>{this.props.comment}条评论</Text>
                    <TouchableOpacity style={{ marginLeft: width - 180 }}>
                        <VectorIcon name={'pencil'} size={20} style={{ color: 'white', }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <ListView
                        style={css.standard}
                        ref={'listView'}
                        dataSource={this.state.LongdataSource}
                        renderRow={this._LongrenderRow}
                        renderHeader={this._LongrenderHeader}
                        onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                    />
                    {this.props.long == 0 ? <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 1 }}>
                        <Text style={{ paddingVertical: 20, alignSelf: 'center', }}>敬请期待…</Text>
                    </View> : null}
                    <ListView
                        style={css.standard}
                        ref={'listView'}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderHeader={this._renderHeader}
                        onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                    />
                </ScrollView >
            </View>
        )
    }
}