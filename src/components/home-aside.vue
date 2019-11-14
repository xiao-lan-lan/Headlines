<template>
  <div class="home-aside">
    <!-- logo图片 -->
    <div class="logo">
      <a href>
        <img src="../assets/img/logo_admin.png" alt />
      </a>
    </div>
    <!-- 导航 -->
    <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="2-1">发布文章</el-menu-item>
        <el-menu-item index="2-2">内容管理</el-menu-item>
        <el-menu-item index="2-3">评论列表</el-menu-item>
        <el-menu-item index="2-4">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="3-1">图文数据</el-menu-item>
        <el-menu-item index="3-2">粉丝概况</el-menu-item>
        <el-menu-item index="3-3">粉丝画像</el-menu-item>
        <el-menu-item index="3-4">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.home-aside {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .logo {
    text-align: center;
    padding: 20px 0;
    background-color: #2e2f32;
    img {
      width: 120px;
    }
  }
  .el-submenu .el-menu-item:hover {
    background-color: #3296fa !important;
    color: #fff !important ;
  }
  .el-submenu .el-menu-item.is-active {
    background-color: #409eff !important;
    color: #fff !important;
  }
}
</style>
