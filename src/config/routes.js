import Home from '../components/home';
import Login from '../components/login'

const routes=[
    {
        path:'/',//路由路径
        component:Home,//路由组件
        exact :true//是否全匹配路由路径
    },
    {
        path:'/login',
        component:Login,
        exact:true
    },
];

export default routes ;