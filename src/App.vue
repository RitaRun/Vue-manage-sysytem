<template>
  <div id="app">
    <!-- <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row> -->
    <!-- 主路由出口：根节点，路由匹配到的组件渲染到这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style lang="less">
 html,body,h3,p {//去掉默认样式
  margin: 0;
  padding: 0;
 }
</style>