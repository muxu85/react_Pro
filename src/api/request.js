//封装axios代码
import axios from 'axios'
import store from '@redux/store';
import {message} from "antd";

//创建axios实例
const instance=axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000,
    // headers:{}
});

//设置请求拦截器：发送请求之前触发函数
//作用：添加公共的请求参数
instance.interceptors.request.use(
    (config)=>{
        //==================================================
        //加上公共的请求头参数
        //config就是发送请求的配置信息（请求方法、请求头）
        //读取redux的数据，不用connect（因为返回值不是组件）
        //使用最原始的方法store.getState获取全部数据
       // config.headers.authorization=store.getState().user.token;
        //getState得到一个对象，对象保存n个reducers函数，里面有一个user对象，该对象中国有两项数据user和token
        //token:loaclstorage 和redux各有一份，要从redux中读取
        //因为redux是内存存储   localstorage是
        //=============================================================
        

        //api/login  不需要加上请求头参数
        // 因此要过滤掉login
        //判断地址不是login   或者 判断token  token有值，就设置，没值就不设置
        //对token进行判断
        const {token}=store.getState().user;
        if (token) {
            config.headers.authorization=token;
        }
        return config;
        //config就会以返回的token做某些功能，config继续发请求，这个请求就会多了一个参数authorization
    }
);

//响应拦截器，处理响应之前触发函数
//作用：统一处理错误响应，进行错误提示
//把响应成功的数据返回（需要的数据）
instance.interceptors.response.use(
    (response)=>{
        //请求成功
        //result就是响应体整体数据
        const result=response.data;
        if (result.status===0){
            //功能成功
            return result.data;
        } else{
            message.error(result.msg);
            //功能失败
            //触发失败的回调，返回失败的Promise
            //使后面的catch被触发
            return Promise.reject(result.msg);
            //保存失败的状态往下执行
            //
        }
    },
    (error)=>{
        //请求失败
        console.log('axios请求失败',error)
        message.error('q请求失败');
        return Promise.reject('登录失败,发生了未知错误,请联系管理员');
    }
);

export default instance