'use strict';

import { combineReducers } from 'redux';
import loginIn from './Login';
import ChangeModual from './Change';


const rootReducer = combineReducers({
  loginIn: loginIn,
  ChangeModual: ChangeModual,
});

export default rootReducer;
