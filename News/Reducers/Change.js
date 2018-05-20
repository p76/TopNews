'use strict';
import * as types from '../Constants/ChangeTypes';

const initialState = {
    status: 1,
}

export default function ChangeModual(state = initialState,action) {
    switch (action.type) {
        case types.CHANGE_IN_DOING:
            return {
                ...state,
                status: 0,//黑夜
            }
            break;
        case types.MODUAL_IN_INIT:
            return {
                ...state,
                status: 1,//白天
            }
            break;
        default:
            console.log(state);
            return state;
    }
}
