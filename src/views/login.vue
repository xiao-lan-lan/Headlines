<template>
  <div class="login">
    <!-- 卡片div -->
    <el-card class="login-card">
      <!-- logo图片 -->
      <div class="logo-img">
        <img src="../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form class="demo-ruleForm" style="margin-top:18px">
        <!-- 表单每一项 -->
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item style="margin-bottom:10px">
          <el-input placeholder="验证码" style="width:220px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item style="margin-bottom:10px">
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
    height: 310px;
    .logo-img {
      text-align: center;
      img {
        height: 34px;
      }
    }
  }
}
</style>
