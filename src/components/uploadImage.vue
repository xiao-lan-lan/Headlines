<template>
  <div class="uploadImage">
    <div class="block">
      <span class="demonstration">点击图标选择图片</span>
      <br />
      <el-image style="margin-top:60px">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false
    }
  }
}
</script>

<style lang='less' scoped>
.uploadImage {
  .block {
    border: 1px solid #ccc;
    height: 200px;
    width: 200px;
    text-align: center;
    background-color: #eee;
    margin-left: 80px;
    margin-bottom: 30px;
    padding-top: 8px;
  }
}
</style>
