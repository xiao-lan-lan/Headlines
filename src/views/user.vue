<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号信息</span>
      </div>
      <el-form ref="form" :model="userForm" label-width="80px">
        <!-- 头像 -->
        <div class="username el-form-item">
          <div class="left" style="float:left">
            <img
              :src="userForm.photo"
              width="60px"
              height="60px"
              style="display:block;border-radius: 50%;margin-bottom:5px"
            />
            <el-link type="primary">更换头像</el-link>
          </div>
          <!-- 姓名 -->
          <div class="rightcontent" style="float:left" v-if="editname">
            <h3>{{userForm.name}}</h3>
            <span style="margin-left:0;font-size:12px">{{userForm.intro}}</span>
          </div>

          <!-- 编辑状态 -->
          <div class="editname" v-else>
            <el-form-item label="名称">
              <el-input v-model="userForm.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介" style="padding-left:60px">
              <el-input v-model="userForm.intro" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item style="padding-left:60px;margin-top:50px">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </div>
          <el-button
            type="primary"
            style="float:right"
            @click="editname=!editname"
            v-show="editname"
          >修改</el-button>
        </div>

        <!-- 账号信息 -->
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

        <!-- 登录方式 -->
        <el-form-item label="登录方式" class="userinfo">
          <div class="rightcontent">
            <div>
              绑定手机
              <span>{{userForm.mobile}}</span>
            </div>
          </div>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" class="userinfo">
          <div class="rightcontent" v-if="editemail">
            <span style="margin-left:0">{{userForm.email}}</span>
            <el-button type="primary" style="float:right" v-show="editemail" @click="editemail=!editemail">修改邮箱</el-button>
          </div>
          <!-- 编辑状态 -->
          <div class="editemail" style="margin-left:30px" v-else>
            <el-form-item>
              <el-input v-model="userForm.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:20px">
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
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
      },
      editname: true,
      editemail: true
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
  .username {
    margin-left: 10px;
    .rightcontent {
      margin-left: 40px;
    }
  }
  .userinfo {
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
