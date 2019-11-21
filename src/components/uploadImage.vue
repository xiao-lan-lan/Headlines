<template>
  <div class="uploadImage">
    <div class="block" @click="uploadimage">
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
        <!-- 素材库 -->
        <el-tab-pane label="素材库">
          <!-- 单选按钮组 -->
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部" @click="loadMaterial(1)"></el-radio-button>
            <el-radio-button label="收藏" @click="loadMaterial(1,20,true)"></el-radio-button>
          </el-radio-group>

          <!-- 图片素材 -->
          <el-row :gutter="20">
            <el-col :span="6" v-for="image in images" :key="image.id">
              <img :src="image.url" width="100px" height="100px" />
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 上传图片 -->
        <el-tab-pane label="上传图片"></el-tab-pane>

        <!-- 分页器 -->
        <el-pagination
          @current-change="onPageChange"
          @size-change="onSizeChange"
          :current-page="1"
          :page-sizes="[20, 40, 60]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_count"
          style="text-align:center"
          background
        ></el-pagination>

        <!-- button组 -->
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogTableVisible=false">取消</el-button>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadimage',
  data () {
    return {
      dialogTableVisible: false,
      radio1: '全部',
      total_count: 0,
      images: []
    }
  },
  methods: {
    uploadimage () {
      this.dialogTableVisible = true
      this.loadMaterial()
    },

    // 加载素材图片
    loadMaterial (page, perpage, collect) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          page: page,
          per_page: perpage,
          collect: collect
        }
      })
        .then(res => {
          console.log(res.data)
          this.images = res.data.data.results
          this.total_count = res.data.data.total_count
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 分页器
    onPageChange (page) {
      console.log(page)
      this.loadMaterial(page, 20)
    },

    onSizeChange (pageSize) {
      console.log(pageSize)
      this.loadMaterial(1, pageSize)
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
    margin-right: 20px;
    // margin-bottom: 30px;
    padding-top: 8px;
  }
  .el-row {
    margin: 20px 0 20px 20px;
  }
}
</style>
