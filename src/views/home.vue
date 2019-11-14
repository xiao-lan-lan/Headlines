<template>
  <div>
    <el-container>
      <el-aside style="width:199px">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeAside from '../components/home-aside.vue'
export default {
  components: {
    'home-aside': homeAside
  }
}
</script>

<style>
</style>
