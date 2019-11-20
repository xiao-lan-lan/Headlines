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

            <el-dialog
              title="上传头像"
              :visible.sync="dialogTableVisible"
            >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button type="primary">确定</el-button>
              <el-button>取消</el-button>
            </el-dialog>
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
              <el-button type="primary" @click="onchangeName">保存</el-button>
              <el-button @click="editname=true">取消</el-button>
            </el-form-item>
          </div>
          <el-button type="primary" style="float:right" @click="onEditName" v-show="editname">修改</el-button>
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
            <el-button
              type="primary"
              style="float:right"
              v-show="editemail"
              @click="onEditEmail"
            >修改邮箱</el-button>
          </div>
          <!-- 编辑状态 -->
          <div class="editemail" style="margin-left:30px" v-else>
            <el-form-item>
              <el-input v-model="userForm.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:20px">
              <el-button type="primary" @click="onchangeEmail">保存</el-button>
              <el-button @click="editemail=true">取消</el-button>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
      editname: true,
      editemail: true,
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

    // 点击修改用户姓名
    onEditEmail () {
      this.editemail = !this.editemail
      if (!this.editname && !this.editemail) {
        this.$message({
          message: '警告哦，请关掉其他正在编辑的内容',
          type: 'warning'
        })
      }
    },

    // 点击修改用户邮箱
    onEditName () {
      this.editname = !this.editname
      if (!this.editname && !this.editemail) {
        this.$message({
          message: '警告哦，请关掉其他正在编辑的内容',
          type: 'warning'
        })
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

    // 上传图片
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
