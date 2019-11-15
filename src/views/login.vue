<template>
  <div class="login">
    <!-- 卡片div -->
    <el-card class="login-card">
      <!-- logo图片 -->
      <div class="logo-img">
        <img src="../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form
        class="demo-ruleForm"
        style="margin-top:18px"
        :rules="rules"
        :model="loginForm"
        ref="loginForm"
      >
        <!-- 表单每一项 -->
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="验证码" style="width:220px" v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    function validator (rule, val, callback) {
      val ? callback() : callback(new Error('请同意协议哦！'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码', trigger: 'blur' }
        ],
        checked: [{ validator }]
      }
    }
  },
  methods: {
    // 点击登录验证
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        // valid是否验证成功
        if (valid) {
          // 调接口
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          })
            .then(res => {
              // 提示
              this.$message({
                message: '恭喜你，验证成功哦',
                type: 'success'
              })
              console.log(res.data)
              localStorage.setItem('user', res.data.data.token)
              this.$router.push('/home')
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '小可爱，你输入的不对哦',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped >
.login {
  background-image: url("../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 380px;
    height: 340px;
    .logo-img {
      text-align: center;
      img {
        height: 34px;
      }
    }
  }
}
</style>
