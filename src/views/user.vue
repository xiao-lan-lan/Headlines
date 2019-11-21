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
            <el-link type="primary" @click="dialogTableVisible = true">更换头像</el-link>

            <el-dialog title="上传头像" :visible.sync="dialogTableVisible">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action
                :http-request="onUploadimg"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <el-button type="primary" @click="submitUpload">确定</el-button>
              <el-button @click="dialogTableVisible = false">取消</el-button>
            </el-dialog>
          </div>

          <!-- 编辑状态 -->
          <div class="editname" v-if="editname">
            <el-form-item label="名称">
              <el-input v-model="userForm.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介" style="padding-left:60px">
              <el-input v-model="userForm.intro" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item style="padding-left:60px;margin-top:50px">
              <el-button type="primary" @click="onchangeName">保存</el-button>
              <el-button @click="editname=false">取消</el-button>
            </el-form-item>
          </div>

          <!-- 姓名 -->
          <div class="rightcontent" style="float:left" v-else>
            <h3>{{userForm.name}}</h3>
            <span style="margin-left:0;font-size:12px">{{userForm.intro}}</span>
          </div>

          <el-button type="primary" style="float:right" @click="onEditName" v-show="!editname">修改</el-button>
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
          <!-- 编辑状态 -->
          <div class="editemail" style="margin-left:30px" v-if="editemail">
            <el-form-item>
              <el-input v-model="userForm.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:20px">
              <el-button type="primary" @click="onchangeEmail">保存</el-button>
              <el-button @click="editemail=false">取消</el-button>
            </el-form-item>
          </div>

          <div class="rightcontent" v-else>
            <span style="margin-left:0">{{userForm.email}}</span>
            <el-button
              type="primary"
              style="float:right"
              v-show="!editemail"
              @click="onEditEmail"
            >修改邮箱</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 事件中转
import EventBus from '../components/EventsBus.vue'
export default {
  name: 'user',
  data () {
    return {
      userForm: {
        id: '',
        mobile: '',
        name: '',
        intro: '',
        photo: ''
      },
      editname: false,
      editemail: false,
      dialogTableVisible: false,
      imageUrl: ''
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
    },

    // 点击修改用户邮箱
    onEditEmail () {
      if (this.editname) {
        this.$message({
          message: '警告哦，请关掉其他正在编辑的内容',
          type: 'warning'
        })
      } else {
        this.editemail = true
      }
    },

    // 点击修改用户姓名
    onEditName () {
      if (this.editemail) {
        this.$message({
          message: '警告哦，请关掉其他正在编辑的内容',
          type: 'warning'
        })
      } else {
        this.editname = true
      }
    },

    // 保存修改用户姓名
    onchangeName () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.userForm.name,
          intro: this.userForm.intro
        }
      })
        .then(res => {
          console.log(res.data)
          this.editname = !this.editname
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          })
          // 通过中转通知，传递更新后的个人资料对象
          EventBus.$emit('updataUser', this.userForm)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('错了哦，修改失败')
        })
    },

    // 保存修改用户邮箱
    onchangeEmail () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          email: this.userForm.email
        }
      })
        .then(res => {
          console.log(res.data)
          this.editemail = !this.editemail
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('错了哦，修改失败')
        })
    },

    // 修改头像
    onUploadimg (params) {
      console.log(params, '111')
      console.log(this.$refs)
      var formData = new FormData()
      formData.append('photo', params.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      })
        .then(res => {
          console.log(res.data)
          this.imageUrl = res.data.data.photo
          this.userForm.photo = res.data.data.photo
          EventBus.$emit('updataUser', this.userForm)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击确定上传
    submitUpload () {
      // this.$refs.upload.submit()
      this.dialogTableVisible = false
      // this.loadUser()
    }
    // submitUpload2 () {
    //   // this.$refs.upload.submit()
    //   this.dialogTableVisible = false
    //   // this.loadUser()
    // }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
