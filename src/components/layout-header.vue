<template>
  <div>
    <el-row type="flex" class="row-bg header-row" justify="space-between" align="middle">
      <!-- 标题 -->
      <el-col :span="8" class="left">
        <i class="el-icon-s-fold" style="font-size:22px"></i>
        <span class="title">xxx科技股份有限公司</span>
      </el-col>
      <el-col :span="10" class="right">
        <!-- 搜索&消息 -->
        <el-tooltip class="item" effect="dark" content="搜索" placement="bottom" style="float:left">
          <el-input placeholder="请输入搜索文章的内容" class="search"></el-input>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom" style="float:left">
          <span>消息</span>
        </el-tooltip>
        <!-- 头像 -->
        <img :src="user.photo" height="50px" />
        <!-- 用户信息 -->
        <el-dropdown style="float:left">
          <span class="el-dropdown-link">
            {{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" @click.native="$router.push('/user')">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"><a href="https://github.com/xiao-lan-lan" target="_blank">Git地址</a></el-dropdown-item>
            <!-- 组件注册原生事件，需要加 .native 修饰符 -->
            <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventBus from './EventsBus.vue'
export default {
  name: 'layoutHeader',
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    // 用户退出
    onLogout: function () {
      this.$confirm('小可爱，确定要退出么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('user')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '再见喽'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '舍不得我嘛？'
          })
        })
    },

    // 渲染头像、名字
    loadUser: function () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        console.log(res.data)
        this.user = res.data.data
      })
    }
  },
  created () {
    this.loadUser()
    EventBus.$on('updataUser', (userobj) => {
      console.log(userobj)
      this.user = userobj
    })
  }
}
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
      width: 50px;
    }
  }
}

</style>
