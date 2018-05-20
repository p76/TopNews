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
import List from './List';
import { connect } from 'react-redux';
import { ChangeBlack, ChangeWhite } from '../Actions/modual'
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class HomePage extends Component {

    constructor(props) {
        super(props);
        this._getDataSource = this._getDataSource.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._getData = this._getData.bind(this);
        this._onChange = this._onChange.bind(this);
        this._editor = this._editor.bind(this);
        this._openDrawer = this._openDrawer.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._picture = this._picture.bind(this);
        this._getEditors = this._getEditors.bind(this);

        this.state = {
            dataSource: this._getData([]),
            content: '',
            hotdataSource: [],
            data: '',
            log: 'add',
            Modual: 'moon-o',
            status: true,
            status1: true,
            recommenders: '',
            Top: '',
            readmodual: '夜间'
        }
    }

    componentWillMount() {
        if (this.props.id != null) {
            this._getEditors()
        } else {
            this._getDataSource();
        }
    }

    _getEditors() {
        var url = "http://news-at.zhihu.com/api/4/theme/" + this.props.id;
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: this._getData(response.stories),
                    recommenders: response.editors,
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/news/latest";
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: this._getData(response.stories),
                    content: response.stories[1].id,
                    Top: response.top_stories[0]
                })
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={[css.render, { backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(235,235,235)' }]} onPress={() => Actions.ContentPage({ id: rowData.id })}>
                <View style={[css.renderview, { backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white' }]}>
                    <Text style={css.rendertext}>{rowData.title}</Text>
                    {rowData.images ? <Image source={{ uri: rowData.images[0] }} style={css.renderimg} />
                        : null}
                </View>
            </TouchableOpacity>
        )
    }
    _renderHeader() {
        return (
            !this.props.status1 ?
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={css.headimg} source={{ uri: this.state.Top.image }} >
                    <TouchableOpacity style={css.headtou} activeOpacity={0.9} onPress={() => Actions.ContentPage({ id: this.state.Top.id })} >
                        <Text style={css.headtext}>{this.state.Top.title}</Text>
                    </TouchableOpacity>
                </Image>
                // </View>
                : this.state.recommenders ?
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={css.rec}>主编</Text>
                        <TouchableOpacity style={css.rectou} onPress={() => Actions.EditorDetails({ element: this.state.recommenders })}>
                            {this._editor()}
                        </TouchableOpacity>
                    </View>
                    : null
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
    _onChange() {
        if (this.state.status) {
            this.setState({
                log: 'remove2',
                status: false
            })
        } else {
            this.setState({
                log: 'add',
                status: true
            })
        }
    }
    _onChangeModual() {
        if (this.state.status1) {
            this.setState({
                Modual: 'sun-o',
                status1: false,
                readmodual: '白天'
            })
            this.props.dispatch(ChangeBlack());
        } else {
            this.setState({
                Modual: 'moon-o',
                status1: true,
                readmodual: '夜间'
            })
            this.props.dispatch(ChangeWhite());
        }
    }
    _openDrawer() {
        this.refs.drawerLayout.openDrawer()
    }
    _editor() {
        var arr = [];
        for (var i = 0; i < this.state.recommenders.length; i++) {
            arr.push(
                <View style={css.edt}>
                    <Image source={{ uri: this.state.recommenders[i].avatar }} style={css.edtimg} />
                </View>
            )
        }
        return arr;
    }
    _picture() {
        var img = [];
        for (var i = 0; i < this.state.Top.length; i++) {
            img.push(
                <View style={css.pic}>
                    <Image style={{ height: 200, width: width }} source={{ uri: this.state.Top[i].image }} />
                    <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                        <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.Top[i].image.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return img;
    }
    render() {
        var navigationView = (
            <View style={{ flex: 1 }}>
                {this.props.isSuccess ? <TouchableOpacity style={[css.navitou, { backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', }]} activeOpacity={0.9} onPress={() => Actions.SelfPage({ user: this.props.user })}>
                    <Image source={{ uri: this.props.user.avatar }} style={css.naviimg} />
                    <Text style={css.navitext}>{this.props.user.name}</Text>
                </TouchableOpacity>
                    : <TouchableOpacity style={[css.navitou, { backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', }]} activeOpacity={0.9} onPress={() => Actions.Login()}>
                        <Image source={require('./timg.jpg')} style={css.naviimg} />
                        <Text style={css.navitext}>请登陆</Text>
                    </TouchableOpacity>}
                <View style={[css.navitou, { backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)' }]}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.Message()}>
                        <VectorIcon name={'bell'} size={15} color={'white'} style={css.navivec} />
                        <Text style={css.navitext2}>我的消息</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.Settings()}>
                        <VectorIcon name={'settings'} size={18} color={'white'} style={css.naviset} />
                        <Text style={css.navitext2}>我的设置</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[css.home, { backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'rgb(220,220,220)' }]} onPress={() => Actions.HomePage({ status1: false })}>
                    <VectorIcon name={'home2'} size={20} color={this.props.status == 0 ? 'white' : 'rgb(30,144,255)'} />
                    <Text style={[css.hometext, { color: this.props.status == 0 ? 'white' : 'rgb(30,144,255)', }]}>首页</Text>
                </TouchableOpacity>
                <List user={this.props.user} />
            </View>
        );
        return (
            <View style={[css.standard, { backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(220,220,220)' }]}>
                <View style={{ width: width, height: 60, backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 18 }} onPress={() => this._openDrawer()}>
                        <VectorIcon name={'list2'} size={25} style={{ color: 'white', }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, flex: 1 }}>{this.props.heading ? this.props.heading : "首页"}</Text>
                    {this.props.heading ?
                        <TouchableOpacity style={css.change} onPress={() => this._onChange()}>
                            <VectorIcon name={this.state.log} size={25} style={{ color: 'white' }} />
                        </TouchableOpacity>
                        : <TouchableOpacity style={css.changemodual} onPress={() => this._onChangeModual()}>
                            <VectorIcon name={this.state.Modual} size={20} style={{ color: 'white' }} />
                            <Text style={{ color: 'white', marginLeft: 5 }}>{this.state.readmodual}</Text>
                        </TouchableOpacity>}
                </View>
                <DrawerLayoutAndroid
                    ref={'drawerLayout'}
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.left}
                    renderNavigationView={() => navigationView}>
                    {/* {!this.props.status1 ?
                        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 200, width: width }} source={{ uri: this.state.Top.image }} >
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.Top.title}</Text>
                            </TouchableOpacity>
                        </Image>
                        // </View>
                        : this.state.recommenders ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingLeft: 10, paddingVertical: 10 }}>主编</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5 }} onPress={() => Actions.EditorDetails({ element: this.state.recommenders })}>
                                    {this._editor()}
                                </TouchableOpacity>
                            </View>
                            : null} */}
                    <ListView
                        style={css.standard}
                        ref={'listView'}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderHeader={this._renderHeader}
                        onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                    />
                </DrawerLayoutAndroid>
            </View >
        )
    }
}

function select(store) {
    return {
        status: store.ChangeModual.status,
        isSuccess: store.loginIn.isSuccess,
        user: store.loginIn.user
    }
}

export default connect(select)(HomePage);
