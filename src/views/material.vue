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

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: []
    }
  },
  methods: {
    loadMaterial () {
      this.$axios({
        method: 'GET',
        url: '/user/images'
      })
        .then(res => {
          console.log(res.data)
          this.images = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadMaterial()
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
