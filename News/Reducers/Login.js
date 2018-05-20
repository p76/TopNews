'use strict';
import * as types from '../Constants/LoginTypes';

const initialState = {
  status: '点击登录',
  isSuccess: false,
  user: null,
}

export default function loginIn(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_IN_INIT:
      return {
        ...state,
        status: 'init',
        isSuccess: false,
        user: null
      }
      break;
    case types.LOGIN_IN_DOING:
      return {
        ...state,
        status: 'doing',
        isSuccess: false,
        user: null
      }
      break;
    case types.LOGGED_OUT:
      return {
        ...state,
        isSuccess: false,
        user: null,
        status: null,
        sex:null
      };
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        status: 'done',
        isSuccess: action.isSuccess,
        user: action.user
      }
      break;
    default:
      console.log(state);
      return state;
  }
}
