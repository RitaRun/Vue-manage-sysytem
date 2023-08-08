import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { userName, password } = JSON.parse(config.body)
        if(userName === 'admin' && password === 'admin'){
            // console.log(userName, 'userName')
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',//查element ui的图标
                            url: 'Home.vue'
                        },
                        {
                            path: '/calendar',
                            name: 'calendar',
                            label: '日历',
                            icon: 'date',
                            url: 'Calendar.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user-solid',
                            url: 'User.vue'
                        },
                        {
                            label: '其他',
                            icon: 'more',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'PageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '听音乐',
                                    icon: 'setting',
                                    url: 'PageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                },
            }
        }
        else if(userName === 'xiaoxiao' && password === '123'){
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',//查element ui的图标
                            url: 'Home.vue'
                        },
                        {
                            path: '/calendar',
                            name: 'calendar',
                            label: '日历',
                            icon: 'date',
                            url: 'Calendar.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        }
        else{
            return {
                code: -999,
                data: {
                    message: '密码错误'
                    }
            }
        }
    }
}