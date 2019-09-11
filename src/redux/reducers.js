/*
包含n个 根据prevState和action来生成的newState函数模块
 */

import {combineReducers} from "redux";

import {SAVE_USER} from "./action-types";

const initUser={
    user:{},
    token:''
}

function user(prevState=initUser, action) {
    switch (action.type) {
        case SAVE_USER:
        return action.data;
        default:return prevState;
    }
}
export default combineReducers({
    user
})

