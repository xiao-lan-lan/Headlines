<template>
  <div>
    <el-container>
      <el-aside style="width:199px;overflow-x:hidden">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-header>
          <home-header></home-header>
        </el-header>
        <el-main style="background-color:#f2f3f5">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import homeAside from '../components/home-aside.vue'
import homeHeader from '../components/home-header.vue'

export default {
  components: {
    'home-aside': homeAside,
    'home-header': homeHeader
  }
}
</script>

<style>
</style>
