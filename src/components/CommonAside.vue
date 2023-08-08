<template>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        background-color="#2b3e56"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <h3>{{ !isCollapse ? '通用后台管理系统' : '后台'}} </h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>                                                                                                                                   
</template>
<!-- #303133 -->
<!-- scope只在当前组件生效 -->
<style lang="less" scoped>
.el-menu {
    border-right: none;
    height: 100vh;
    h3 {
        color: white;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        padding: 5px 16px;
    }
    .el-submenu {
        .el-menu-item {
            min-width: 160px;
        }
    }
}
</style>

<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        clickMenu(item){//点击菜单
            console.log(item, '侧边栏')
            //当前页面的路由与跳转的路由不一致且不是从home跳转到/时，才跳转，否则不跳转
            if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        menuData() {
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        }
    }
}
</script>