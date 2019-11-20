<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号信息</span>
      </div>
      <el-form ref="form" :model="userForm" label-width="80px">
        <div class="username el-form-item">
            <div class="left" style="float:left">
                <img :src="userForm.photo" width="60px" height="60px" style="display:block;border-radius: 50%;margin-bottom:5px">
                <el-link type="primary">更换头像</el-link>
            </div>
          <div class="rightcontent" style="float:left">
            <h3>{{userForm.name}}</h3>
            <span style="margin-left:0;font-size:12px">{{userForm.intro}}</span>
          </div>
          <el-button type="primary" style="float:right">修改</el-button>
        </div>
        <el-form-item label="账号信息" class="userinfo">
          <div class="rightcontent">
            <div class="type">
              头条号类型
              <span>个人</span>
            </div>
            <div>
              头条号ID
              <span>{{userForm.id}}</span>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="登录方式" class="userinfo">
          <div class="rightcontent">
            <div>
              绑定手机
              <span>{{userForm.mobile}}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="邮箱" class="userinfo">
          <div class="rightcontent">
            <span style="margin-left:0">{{userForm.email}}</span>
            <el-button type="primary" style="float:right">修改邮箱</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        id: '',
        mobile: '',
        name: '',
        intro: '',
        photo: ''
      }
    }
  },
  methods: {
    // 获取用户信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      })
        .then(res => {
          console.log(res.data)
          this.userForm = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadUser()
  }
}
</script>

<style lang='less' scoped>
.user {
  .userinfo,.username {
    margin-top: 25px;
    border-top: 1px solid #ccc;
    padding-top: 25px;
    .rightcontent {
      margin-left: 30px;
      h3 {
          margin: 0;
      }
      .type {
          border-bottom: 1px solid #ccc;
          margin-bottom: 15px;
          padding-bottom: 15px;
      }
      span {
        margin-left: 30px;
      }
    }
  }
}
</style>
