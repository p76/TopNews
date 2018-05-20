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
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ContentPage extends Component {

    constructor(props) {
        super(props);
        this._getDataSource = this._getDataSource.bind(this);
        this._getExtraSource = this._getExtraSource.bind(this);
        this._add = this._add.bind(this);
        this.state = {
            dataSource: this._getData([]),
            content: '',
            title: '',
            Image: '',
            source: '',
            comment: '',
            popularity: '',
            LongComment: '',
            ShortComment: '',
            status: true
        }
    }


    componentWillMount() {
        this._getDataSource();
        this._getExtraSource();
    }
    _getExtraSource() {
        var url = "http://news-at.zhihu.com/api/4/story-extra/" + this.props.id;
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    comment: response.comments,
                    popularity: response.popularity,
                    LongComment: response.long_comments,
                    ShortComment: response.short_comments
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/news/" + this.props.id;
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    content: response.share_url,
                    title: response.title,
                    Image: response.image,
                    source: response.image_source
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
    _add() {
        if (this.state.status) {
            this.setState({
                popularity: this.state.popularity + 1,
                status: false
            })
        } else {
            this.setState({
                popularity: this.state.popularity - 1,
                status: true
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: width, height: 60, backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <VectorIcon name={'keyboard_backspace'} size={25} style={{ color: 'white', marginLeft: 18 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: width - 230 }}>
                        <VectorIcon name={'share-alt'} size={20} style={{ color: 'white', }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <VectorIcon name={'star2'} size={20} style={{ color: 'white', marginLeft: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20 }} onPress={() => Actions.Comment({ id: this.props.id, long: this.state.LongComment, short: this.state.ShortComment, comment: this.state.comment })}>
                        <VectorIcon name={'comment2'} size={20} style={{ color: 'white' }} />
                        <Text style={{ color: 'white', marginLeft: 5 }}>{this.state.comment}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, marginTop: -1 }} onPress={() => this._add()}>
                        <VectorIcon name={'thumbs-up'} size={20} style={{ color: this.state.status ? 'white' : 'rgb(192,192,192)' }} />
                        <Text style={{ color: this.state.status ? 'white' : 'rgb(192,192,192)', marginLeft: 5 }}>{this.state.popularity}</Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ uri: this.state.content }}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    style={{backgroundColor:'rgb(105,105,105)'}}
                >
                </WebView>
            </View >
        )
    }
}
function select(store) {
    return {
        status: store.ChangeModual.status,
    }
}

export default connect(select)(ContentPage);