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
import DatePicker from 'react-native-datepicker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './SettingsCss';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager, Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Settings extends Component {
    constructor(props) {
        super(props);
        this._getData = this._getData.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._prompt = this._prompt.bind(this);
        this.state = {
            dataSource: this._getData([]),
            birth: 1996
        }
    }
    componentWillMount() {
        this.setState({
            dataSource: this._getData([])
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
    _prompt() {
        var object = {
            title: '清除完毕',
            type: Toast.mode.C2MobileToastInfo,
            duration: 1000,
        }
        Toast.show(object);
    }
    _select(num) {
        if (num == 1) {
            this.setState({
                sex: '男',
                sexCode: '1',
                selectColor2: '#fff',
                selectColor: 'rgb(30,144,255)'
            })
        } else {
            this.setState({
                sex: '女',
                sexCode: '0',
                selectColor: '#fff',
                selectColor2: 'rgb(30,144,255)'
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'white', }}>
                <View style={{ width: width, height: 60, backgroundColor: this.props.status == 0 ? 'rgb(105,105,105)' : 'rgb(30,144,255)', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginHorizontal: 18 }} onPress={() => Actions.pop()}>
                        <VectorIcon name={'keyboard_backspace'} size={25} style={{ color: 'white', }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, flex: 1 }}>设置</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center', padding: 10, marginBottom: 1 }}>
                    <Text style={{ flex: 1, paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>头像</Text>

                    {this.props.isSuccess ? <Image source={{ uri: this.props.user.avatar }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        : <Image source={require('../HomePage/timg.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />}

                    <VectorIcon name={'keyboard_arrow_right'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center', padding: 10, marginBottom: 1 }}>
                    <Text style={{ flex: 1, paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>用户名</Text>

                    {this.props.isSuccess ? <Text style={{ paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>{this.props.user.name}</Text>
                        : null}

                    <VectorIcon name={'keyboard_arrow_right'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center', padding: 10, marginBottom: 10, justifyContent: 'flex-end' }}>
                    <Text style={{ paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>介绍</Text>
                    <TextInput
                        placeholder={'请输入…'}
                        placeholderTextColor={'#c0c4cc'}
                        maxLength={60}
                        underlineColorAndroid={'transparent'}
                        value={this.state.username}
                        style={{ padding: 0, flex: 1, textAlign: 'right', color: this.props.status == 0 ? 'white' : 'black' }}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <VectorIcon name={'keyboard_arrow_right'} size={25} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center', paddingLeft: 10, marginBottom: 1 }}>
                    <Text style={{ flex: 1, paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>性别</Text>
                    <View style={css.sexView}>
                        <TouchableOpacity style={css.sexSelect} onPress={() => this._select(2)}>
                            <View style={[css.sexIcon, { backgroundColor: this.state.selectColor2, borderColor: this.props.status == 0 ? 'white' : 'black' }]} />
                            <Text style={[css.sex, { color: this.props.status == 0 ? 'white' : 'black' }]}>女</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={css.sexSelect} onPress={() => this._select(1)}>
                            <View style={[css.sexIcon, { backgroundColor: this.state.selectColor, borderColor: this.props.status == 0 ? 'white' : 'black' }]} />
                            <Text style={[css.sex, { color: this.props.status == 0 ? 'white' : 'black' }]}>男</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', alignItems: 'center', paddingLeft: 10, marginBottom: 10 }}>
                    <Text style={{ flex: 1, paddingLeft: 2, color: this.props.status == 0 ? 'white' : 'black' }}>生日</Text>
                    <View style={css.data}>
                        <DatePicker
                            style={css.data2}
                            color={'bla'}
                            date={this.state.birth}
                            mode="date"
                            placeholder="请选择时间"
                            format="YYYY-MM-DD"
                            minDate="1918-01-01"
                            maxDate="2018-05-13"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                    // textAlign: 'right'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ birth: date }) }}
                        />
                    </View>
                    <VectorIcon name={'keyboard_arrow_right'} size={25} style={{ marginRight: 10 }} />
                </View>
                <TouchableOpacity style={{ backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', justifyContent: 'center', paddingVertical: 15, marginBottom: 1 }} onPress={() => this._prompt()}>
                    <Text style={{ paddingLeft: 10, color: this.props.status == 0 ? 'white' : 'black' }}>清除缓存</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: this.props.status == 0 ? 'rgb(128,128,128)' : 'white', paddingVertical: 15, flexDirection: 'row', marginBottom: 1 }}>
                    <Text style={{ paddingLeft: 10, color: this.props.status == 0 ? 'white' : 'black', flex: 1 }}>当前版本</Text>
                    <Text style={{ paddingRight: 18, color: this.props.status == 0 ? 'white' : 'black' }}>1.0.0</Text>
                </TouchableOpacity>
            </View >
        )
    }
}
function select(store) {
    return {
        isSuccess: store.loginIn.isSuccess,
        user: store.loginIn.user,
        status: store.ChangeModual.status,
    }
}

export default connect(select)(Settings);