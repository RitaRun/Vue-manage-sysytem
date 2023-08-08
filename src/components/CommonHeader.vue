<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="small"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" style="padding-left: 16px;">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }"><span @click="changeMenu(item)">{{ item.label }}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="logout">
                <span class="el-dropdown-link">
                    <img class="userImg" src="../assets/images/user.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        handleMenu(){
            //调用修改状态的方法
            this.$store.commit('collapseMenu')
        },
        changeMenu(item){//面包屑跳转页面
            console.log(item, '面包屑')
            const index = this.tags.findIndex(i => i.name === item.name)
            if(index !== -1){
                this.tags.splice(index+1, (this.tags.length - index))
            }
        },
        logout(command){
            if(command === 'out'){
                //清除cookie的token信息
                Cookie.remove('token')
                Cookie.remove('menu')

                //跳转到登录页面
                this.$router.push('login')
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
    .header-container {
        padding: 0 20px;
        background-color: #eeeeee;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .l-content {
            display: flex;
            align-items: center;
            .text {
            color: #666;
            font-size: 14px;
            margin-left: 10px;
            }
            /deep/.el-breadcrumb__item{
                .el-breadcrumb__inner {
                    &.is-link {
                        color: #666;
                    }
                }
                &:last-child {
                    .el-breadcrumb__inner {
                        color: #2b3f53;
                    }
                }
            }
        };
        .r-content {
            .userImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            }
        }
    }
</style>