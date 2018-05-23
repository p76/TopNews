/**
 * Sample C2 App
 * https://git.c2cloud.cn/c2/mobile-development-resources
 * @C2MOBILE
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import TopNews from './News';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);//让SQLite成为一个全局对象
AppRegistry.registerComponent('TopNews', () => TopNews);
