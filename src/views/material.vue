<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>

      <!-- 按钮 -->
      <el-button-group>
        <el-button type="primary" plain @click="loadMaterial(1)" autofocus>全部</el-button>
        <el-button type="primary" plain @click="loadMaterial(1,20,true)">收藏</el-button>
      </el-button-group>

      <!-- 上传图片 -->
      <!-- 此组件默认发送请求，请求方式post，地址写在action,请求头要自己定义 -->
      <el-upload
        class="upload-demo"
        style="float:right"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :limit="3"
        name="image"
        :on-success="uploadsuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <!-- <el-button type="primary" style="float:right" @click="dialogTableVisible = true">上传图片</el-button>
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
      </el-dialog>-->

      <!-- 图片 -->
      <el-row :gutter="5" style="margin-left:30px">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="6"
          :xl="4"
          v-for="image in images"
          :key="image.id"
          class="image"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            style="width:180px;height:200px;background-color:#f4f5f6"
          >
            <el-image :src="image.url" fit="cover" style="width:180px;height:160px"></el-image>
            <div style="display:flex;justify-content:space-evenly;">
              <i
                :class="{'el-icon-star-on':image.is_collected,'el-icon-star-off':!image.is_collected}"
                @click="onCollect(image)"
              ></i>
              <i class="el-icon-delete" @click="onDelete(image)"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- <div class="block">
        <el-image
          style="width: 150px; height: 150px"
          :src="image.url"
          fit="fit"
          v-for="image in images"
          :key="image.id"
        ></el-image>
      </div>-->

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
      uploadHeaders: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
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

    // 收藏图片
    onCollect (image) {
      console.log(image)
      this.$axios({
        method: 'PUT',
        url: `/user/images/${image.id}`,
        data: {
          collect: !image.is_collected
        }
      })
        .then(res => {
          console.log(res.data)
          image.is_collected = res.data.data.collect
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
    },

    // 删除图片
    onDelete (image) {
      this.$axios({
        method: 'DELETE',
        url: `/user/images/${image.id}`
      })
        .then(res => {
          console.log(res)
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.loadMaterial(1, 20)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },

    // 图片上传成功钩子
    uploadsuccess () {
      this.$message({
        message: '恭喜你，上传成功',
        type: 'success'
      })
      this.loadMaterial(1, 20)
    }
  },
  created () {
    this.loadMaterial(1, 20)
  }
}
</script>

<style lang='less' scoped>
.material {
  .el-col {
    border-radius: 4px;
  }
  .image {
    margin-top: 40px;
    margin-bottom: 30px;
    i {
      font-size: 22px;
      margin-top: 5px;
    }
  }
  // .block {
  //   // margin: 30px 0 0 30px;
  //   .el-image {
  //     border-radius: 10px;
  //     overflow: hidden;
  //     margin: 30px 30px;
  //     .edit {
  //       width: 150px;
  //       height: 30px;
  //       background-color: #f4f5f6;
  //     }
  //   }
  // }
}
</style>
