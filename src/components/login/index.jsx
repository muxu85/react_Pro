import React, {Component} from 'react';
import {Form, Icon, Input, Button,message} from 'antd';
import axios from 'axios';
import {connect} from 'react-redux';
import {saveUser} from '@redux/action-creators';

import logo from './logo.png'
import './index.less'

@connect(null,{saveUser})
@Form.create()
//j经form.create包装过的组件自带this.props,form属性
class Login extends Component {

    //自定义表单检验方法
    validator = (rule, value, callback) => {
        const name = rule.field === 'username' ? '用户名':'密码';
        if (!value){
            return  callback(`请输入${name}`);
        }
        if (value.length<3){
            return callback(`${name}的长度必须大于3位`);
        }
        if (value.length>13){
            return callback(`${name}长度必须小于13位`);
        }
        //正则表达式进行校验
        const reg=/^[a-zA_Z0-9_]{3,13}$/;
        if (!reg.test(value)){
            return callback(`${name}只能包含英文、数字和下划线`)
        }
        //callback必须调用
        callback();
    };

    //登录函数
    login=(e)=>{
        //禁止浏览器默认行为
        e.preventDefault();
        //校验表单
        this.props.form.validateFields((error,values)=>{
            //判断校验是否成功
            if (!error){
                //校验通过
                //获取表单数据
                const {username,password}=values;

                //发送请求
                // axios.post('http://localhost:5000/api/login',{username,password})
                //使用代理服务器，指向代理服务器端口：3000
                axios.post('/api/login',{username,password})
                //axios返回一个promise对象
                    //请求成功
                    // .then((response)=>{
                    //     //通过status值判断是否登录成功
                    //    if (response.data.status===0) {
                    //        message.success('登录成功！')
                    //        //跳转页面之前进行--》存储用户数据,利用storage
                    //        this.prop.saveUser(response.data.data);
                    //        //登录成功-->跳转到home页面
                    //         this.props.history.replace('/');

                //简写：进行解构赋值{data}=response.data
                    .then(({data})=>{
                        //通过status值判断是否登录成功
                        if (data.status===0) {
                            message.success('登录成功！')
                            //跳转页面之前进行--》存储用户数据,利用redux
                            //又因为redux是内存存储，一关网页就会关掉，所以进行持久化存储
                            this.props.saveUser(data.data);
                            //登录成功-->跳转到home页面
                            this.props.history.replace('/');
                       }else{
                           //登录失败,返回msg信息
                           console.log(data);
                           message.error(data.msg);
                       }
                    })
                    //请求失败
                    .catch((error)=>{
                        //请求失败，登录也就失败
                        message.error('登录失败,发生了未知错误,请联系管理员');
                    })
                    .finally(()=>{
                        //清空数据,重置resetFields
                        //不管成功或失败都会触发
                        this.props.form.resetFields(['password']);
                    })
            }
        })
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login}>
                        {/*输入用户名*/}
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    //第一种检验方法：简单校验
                                    // {required: true, message: '请输入您的用户名'},
                                    //第二种校验方法
                                    {validator:this.validator}
                                ]
                            })(
                                <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
                            )}
                        </Form.Item>
                        {/*输入密码*/}
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    // {required: true, message: '请输入密码'}
                                    {validator: this.validator}
                                ]
                            })(
                                <Input prefix={<Icon type="lock"/>} placeholder="密码" type="password"/>
                            )}
                        </Form.Item>
                        {/*进行提交：login*/}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    };
}

export default Login