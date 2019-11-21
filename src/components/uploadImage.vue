<template>
  <div class="uploadImage">
    <div class="block" @click="dialogTableVisible=true">
      <span class="demonstration">点击图标选择图片</span>
      <br />
      <el-image style="margin-top:60px">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>

    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogTableVisible">
      <!-- tab标签 -->
      <el-tabs type="border-card">
        <el-tab-pane label="素材库">

          <!-- 单选按钮组 -->
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="上传图片"></el-tab-pane>

        <!-- button组 -->
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogTableVisible=false">取消</el-button>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false,
      radio1: '全部'
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
