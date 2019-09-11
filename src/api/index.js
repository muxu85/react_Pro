//封装发送请求函数
import axios from './request';
//请求登录
export const reqLogin=(username,password)=>{
    axios.post('/login',{username,password})
};