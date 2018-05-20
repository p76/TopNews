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
} from 'react-native';
import React, { Component } from 'react';
import css from './HomePageCss';
import { connect } from 'react-redux';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class List extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: this._getData([])
        }
    }
    componentWillMount() {
        this._getDataSource()
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/themes";
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: this._getData(response.others),
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'white' }} onPress={() => Actions.HomePage({ id: rowData.id, status1: true, heading: rowData.name, user: this.props.user })}>
                <Text style={{ color: 'black', margin: 15, flex: 1 }}>{rowData.name}</Text>
                <VectorIcon name={'keyboard_arrow_right'} size={25} color={'rgb(119,136,153)'} style={{ justifyContent: 'flex-end', marginRight: 10, marginTop: 10 }} />
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
            <View style={css.standard}>
                <ListView style={css.standard}
                    ref={'listView'}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    // renderHeader={this._renderHeader}
                    onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                />
            </View >
        )
    }
}
function select(store) {
    return {
        status: store.ChangeModual.status,
    }
}

export default connect(select)(List);