<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>

      <!-- 按钮 -->
      <el-button-group>
        <el-button type="primary" plain @click="loadMaterial(1)">全部</el-button>
        <el-button type="primary" plain @click="loadMaterial(1,20,true)">收藏</el-button>
      </el-button-group>

      <!-- 上传图片 -->
      <el-button type="primary" style="float:right" @click="dialogTableVisible = true">上传图片</el-button>

      <el-dialog title="上传图片" :visible.sync="dialogTableVisible" center>
        <div class="block">
          <el-image>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <div slot="tip" class="el-upload__tip">用户图片</div>
          <el-button slot="trigger" size="small" type="primary">点击选择图片</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="primary"
            @click="submitUpload"
          >开始上传</el-button>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false" type="primary">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 图片 -->
      <div class="block">
        <el-image
          style="width: 150px; height: 150px"
          :src="image.url"
          fit="fit"
          v-for="image in images"
          :key="image.id"
        ></el-image>
      </div>

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
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      images: [],
      total_count: 0,
      dialogTableVisible: false,
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
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
    },

    // 上传图片
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  },
  created () {
    this.loadMaterial(1, 20)
  }
}
</script>

<style lang='less' scoped>
.material {
  .block {
    // margin: 30px 0 0 30px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      margin: 30px 30px;
      .edit {
        width: 150px;
        height: 30px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>
