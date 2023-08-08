import Cookie from 'js-cookie'
export default{
    state: {
        isCollapse: false, // 用于控制菜单的展开和收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',//查element ui的图标
                url: 'Home.vue'
            }
        ],//面包屑数据
        //store中的数据，刷新后就不见了
        menu: []
    },
    mutations: {
        //修改菜单展开收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state, val){
            //判断添加的路径是否已存在
            const index = state.tabsList.findIndex(item => (item.name === val.name))
            if(index === -1){
                state.tabsList.push(val)
            }
            else{
                state.tabsList.splice(index + 1, (state.tabsList.length - index))
            }
        },
        //设置menu的数据
        setMenu(state, val){
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        addMenu(state, router){
            //判断当前缓存中是否有数据
            if(!Cookie.get('menu')) {return}
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // console.log(menuArray, 'menuArray')
            menuArray.forEach(item => {
                router.addRoute('Main', item)//路由的动态添加
            })
        }
    }
}