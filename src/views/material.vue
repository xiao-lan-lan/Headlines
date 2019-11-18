<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>

      <!-- 按钮 -->
      <el-button-group>
        <el-button type="primary" plain>全部</el-button>
        <el-button type="primary" plain>收藏</el-button>
      </el-button-group>

      <el-button type="primary" style="float:right">上传图片</el-button>

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
        @current-change=onPageChange
        @size-change=onSizeChange
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
      total_count: 0
    }
  },
  methods: {

    // 加载素材图片
    loadMaterial (page, perpage) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          page: page,
          per_page: perpage
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
  },
  created () {
    this.loadMaterial(1, 20)
  }
}
</script>

<style lang='less' scoped>
.material {
  .block {
    margin: 30px 0 0 30px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      margin: 30px 40px;
      .edit {
        width: 150px;
        height: 30px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>
