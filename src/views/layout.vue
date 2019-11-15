<template>
  <div>
    <el-container>
      <!-- 左侧导航 -->
      <el-aside style="width:199px;overflow-x:hidden">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main style="background-color:#f2f3f5">
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import layoutAside from '../components/layout-aside.vue'
import layoutHeader from '../components/layout-header.vue'

export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
