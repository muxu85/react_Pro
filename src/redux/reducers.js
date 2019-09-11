/*
包含n个 根据prevState和action来生成的newState函数模块
 */

import {combineReducers} from "redux";

import {SAVE_USER} from "./action-types";
import {getItem,setItem} from '../utils/storage'

//初始化数据
const initUser={
    user:getItem('user')||{},
    token:getItem('token')||''
};


function user(prevState=initUser, action) {
    switch (action.type) {
        case SAVE_USER:
            //进行持久化存储
            setItem('user',action.data);
            setItem('token',action.data.token);
        return action.data;
        default:return prevState;
    }
}
export default combineReducers({
    user
})

