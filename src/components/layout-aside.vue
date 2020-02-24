<template>
  <div class="home-aside">
    <!-- logo图片 -->
    <div class="logo">
      <a href>
        <img src="../assets/img/logo.png" alt />
      </a>
    </div>
    <!-- 导航 -->
    <el-menu
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/airticle">内容管理</el-menu-item>
        <el-menu-item index="/comment">评论列表</el-menu-item>
        <el-menu-item index="/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/graphicdata">图文数据</el-menu-item>
        <el-menu-item index="3-2">粉丝概况</el-menu-item>
        <el-menu-item index="3-3">粉丝画像</el-menu-item>
        <el-menu-item index="3-4">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/user">
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
  position: fixed;
  .logo {
    text-align: center;
    padding: 20px 0;
    background-color: #2e2f32;
    img {
      width: 120px;
      height: 60px;
    }
  }
  .el-menu {
    border-right: none;
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
