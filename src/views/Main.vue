<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header><common-header></common-header></el-header>
                <el-main>
                    <!-- 子路由出口：主路由组件 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
</template>

<script>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    data() {
        return {
            
        }
    },
    components: {
        CommonAside,
        CommonHeader
    }
}
</script>

<style lang="less">
    .el-header {
        padding: 0;
    }
</style>