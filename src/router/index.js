import Vue from "vue";
import VueRouter from "vue-router";
//1.定义路由组件，并导入
import Main from '../views/Main.vue';
// import Home from '../views/Home.vue';
// import Mall from '../views/Mall.vue';
// import User from '../views/User.vue';
// import PageOne from '../views/PageOne.vue';
// import PageTwo from '../views/PageTwo.vue';
import Login from '../views/Login.vue'
import Cookie from 'js-cookie'


Vue.use(VueRouter)

//2.定义路由，每个路由对应一个组件：如果是多个独立的组件，定义多个路由；如果是组件嵌套，使用嵌套路由（主路由+子路由）
const routes = [
    //系统内，主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',//重定向到首页
        name: 'Main',
        children: [
            // {path:'home', component:Home},//首页
            // {path:'mall', component:Mall},//商品管理
            // {path:'user', component:User},//用户管理
            // {path:'page1', component:PageOne},//其他-页面1
            // {path:'page2', component:PageTwo}//其他-页面2
        ]
    },
    //登录页面
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

//3.创建router实例
const router = new VueRouter({
    routes
})

//全局前置导航守卫
router.beforeEach((to, from, next) => {
    //判断token是否存在
    const token = Cookie.get('token')
    //token不存在，表明用户未登录，跳转至登录页
    if(!token && to.name !== 'login'){
        next({ name: 'login' })
        // router.push('login')
    }
    else if(token && to.name === 'login'){//token存在，表明用户已登录，跳转至首页
        next({ name: 'home' })
        // router.push('home')
    }
    else{
      next()
    }
  })

//4.对外暴露，将当前的router实例挂载到根节点上
export default router