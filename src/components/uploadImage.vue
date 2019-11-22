<template>
  <div class="uploadImage">
    <div class="block" @click="uploadimage">
      <span class="demonstration">点击图标选择图片</span>
      <img v-if="this.value" :src="this.value" class="avatar" width="180px" height="150px" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>

    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogTableVisible">
      <!-- tab标签 -->
      <el-tabs type="border-card">
        <!-- 素材库 -->
        <el-tab-pane label="素材库">
          <!-- 单选按钮组 -->
          <el-radio-group v-model="radio1">
            <el-radio-button label="全部" @click.native="loadMaterial(1)"></el-radio-button>
            <el-radio-button label="收藏" @click.native="loadMaterial(1,20,true)"></el-radio-button>
          </el-radio-group>

          <!-- 图片素材 -->
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="image in images"
              :key="image.id"
              style="position:relative"
              @click.native="Imgitem=image"
            >
              <img :src="image.url" width="100px" height="100px" />
              <i :class="{'el-icon-check':true, 'img-item':image==Imgitem}"></i>
            </el-col>
          </el-row>

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
        </el-tab-pane>

        <!-- 上传图片 -->
        <el-tab-pane label="上传图片">
          <div class="block">
            <span class="demonstration">点击图标选择图片</span>
            <img v-if="PreviewImg" :src="PreviewImg" class="avatar" width="180px" height="150px" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadImgHeader"
            name='image'
            :file-list="fileList"
            :auto-upload="false"
            :on-success="onPreviewImg"
          >
            <el-button slot="trigger" size="small" type="primary">点击选择图片</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >开始上传</el-button>
          </el-upload>
        </el-tab-pane>

        <!-- button组 -->
        <el-button type="primary" @click="onPreview">确定</el-button>
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
      images: [],
      Imgitem: '',
      fileList: [],
      uploadImgHeader: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      },
      PreviewImg: ''
    }
  },
  props: {
    value: {
      type: String
    }
  },
  methods: {
    uploadimage () {
      this.dialogTableVisible = true
      this.loadMaterial()
    },

    // 加载素材图片
    loadMaterial (page, perpage, collect) {
      console.log('999')
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

    // 素材库，预览图片
    onPreview () {
      this.dialogTableVisible = false
      this.$emit('input', this.Imgitem.url)
    },

    // 上传图片，点击发送请求
    submitUpload () {
      this.$refs.upload.submit()
    },

    // 上传图片，预览
    onPreviewImg (res, b, c) {
      console.log(res, b, c)
      this.PreviewImg = res.data.url
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
    // padding-top: 8px;
  }
  .el-row {
    margin: 20px 0 20px 20px;
    .el-icon-check {
      color: rgba(0, 0, 0, 0);
    }
    .img-item {
      font-size: 60px;
      position: absolute;
      left: 24px;
      top: 20px;
      color: greenyellow;
      font-weight: bold;
    }
  }
}
</style>
