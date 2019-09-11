/*
包含n个生成action对象的工厂函数模块
action对象：{
    type：要执行的操作类型
    data：要操作的数据
}
 */
import {SAVE_USER} from './action-types'
export const  saveUser=(user)=>({
    type:SAVE_USER,
    data:user
});
