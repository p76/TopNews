'use strict';
import * as types from '../Constants/LoginTypes';

// 模拟服务器返回的用户信息
let user = {
  'name': '不知道',
  'age': '24',
  'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
  'sex': 0 //0女1男
}

export function doLogin() {
  return dispatch => {
    dispatch(isLogining());
    // 模拟用户登录
    let result = fetch('https://github.com/')
      .then((res) => {
        dispatch(loginSuccess(true, user));
      }).catch((e) => {
        dispatch(loginSuccess(false, null));
      });
  }
}

function isLogining() {
  return {
    type: types.LOGIN_IN_DOING
  }
}

function loginSuccess(isSuccess, user) {
  return {
    type: types.LOGIN_IN_DONE,
    isSuccess: isSuccess,
    user: user
  }
}

export function logOut() {
  return {
    type: types.LOGGED_OUT
  }
}
