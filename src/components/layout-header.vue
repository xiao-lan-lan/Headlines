<template>
  <div>
    <el-row type="flex" class="row-bg header-row" justify="space-between" align="middle">
      <el-col :span="8" class="left">
        <i class="el-icon-s-fold" style="font-size:22px"></i>
        <span class="title">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="8" class="right">
        <el-tooltip class="item" effect="dark" content="搜索" placement="bottom" style="float:left">
          <el-input placeholder="请输入搜索文章的内容" class="search"></el-input>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom" style="float:left">
          <span>消息</span>
        </el-tooltip>
        <img src="../assets/img/avatar.jpg" alt />
        <el-dropdown style="float:left">
          <span class="el-dropdown-link">
            小可爱
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">Git地址</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.header-row {
  .left {
    .title {
      margin-left: 10px;
      vertical-align: top;
    }
  }
  .right {
    line-height: 60px;

    .search {
      width: 160px;
      margin-right: 10px;
      ::placeholder {
        font-size: 12px;
      }
    }
    img {
      float: left;
      margin-top: 5px;
      border-radius: 50%;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
}
</style>
