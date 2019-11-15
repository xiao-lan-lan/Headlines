<template>
  <div class="airticle">
    <!-- 筛选部分 -->
    <el-card class="box-card" shadow="never">
      全部图文
      <div class="line"></div>
      <el-form ref="form" label-width="80px" class="airForm">
        <el-form-item label="文章状态">
          <el-radio-group v-model="radio">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">草稿</el-radio>
            <el-radio :label="9">待审核</el-radio>
            <el-radio :label="12">审核通过</el-radio>
            <el-radio :label="15">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择频道" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- / 筛选部分 -->

    <!-- 内容部分 -->
    <el-card class="box-card" shadow="never" style="margin-top:15px">
      共找到59938条符合条件的内容
      <div class="line"></div>
      <el-table :data="airticleData" style="width: 100%" class="airtable">
        <el-table-column prop="date" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="50px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="airticleStatus[scope.row.status].type">{{airticleStatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="时间" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <el-button type="primary" plain size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- / 内容部分 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 3,
      value1: '',
      form: {
        name: '',
        region: ''
      },
      airticleStatus: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }],
      // 文章列表设置初始数据，图片会报错
      airticleData: [
        // {
        //   pubdate: '',
        //   title: '',
        //   cover: {
        //     images: []
        //   }
        // }
      ]
    }
  },
  methods: {
    loadAirticle: function () {
      this.$axios({
        method: 'GET',
        url: '/articles'
      })
        .then(res => {
          console.log(res.data)
          res.data.data.results.forEach(item => {
            if (!item.cover.images.length) {
              item.cover.images[0] = 'http://img5.imgtn.bdimg.com/it/u=3323289422,2847919939&fm=26&gp=0.jpg'
            }
          })
          this.airticleData = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadAirticle()
  }
}
</script>

<style lang='less' scoped>
.airticle {
  .line {
    width: 100%;
    border-bottom: 1px dashed #ccc;
    margin-top: 16px;
    margin-bottom: 5px;
  }
}
</style>
