<template>
    <el-card class="box-card">
        <el-form ref="form" label-width="70px" :model="form" :rules="rules" :inline="true">
            <h3 class="login_title">系统登录</h3>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登 录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    data() {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [{
                    required: true,
                    trigger: 'blur',
                    message: '请输入用户名'
                }],
                password: [{ 
                    required: true,
                    trigger: 'blur',
                    message: '请输入密码'
                }]
            }
        }
    },
    methods: {
        //登录按钮
        submit() {
            // //token信息
            // const token = Mock.Random.guid()
            // //将token信息存入cookie，用于不同页面间的通信
            // Cookie.set('token', token)

            //校验通过
            this.$refs.form.validate((valid) => {
                if(valid) {
                    getMenu(this.form).then(({data}) => {
                        if(data.code === 20000){
                            Cookie.set('token', data.data.token)

                            //获取菜单的数据，存入store
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            //跳转到首页
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .box-card {
        position: relative;
        box-sizing: border-box;
        width: 350px;
        margin: 180px auto;
        border-radius: 15px;
        .login_title {
            text-align: center;
            padding-bottom: 40px;
        };
        .el-button {
            margin-left: 122px;
        }
    }
</style>