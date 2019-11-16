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
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <template>
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </template>
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
      共找到 {{total_count}} 条符合条件的内容
      <div class="line"></div>

      <!-- 表格数据 -->
      <el-table :data="airticleData" style="width: 100%" class="airtable">
        <el-table-column prop="date" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="80px" v-if="scope.row.cover.images[0]" />
            <img src="../assets/img/avatar.jpg" alt v-else width="80px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="airticleStatus[scope.row.status].type"
            >{{airticleStatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="时间" align="center"></el-table-column>
        <el-table-column prop="id" label="操作" align="center">
          <el-button type="primary" plain size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        background layout="prev, pager, next"
        :total="total_count"
        style="margin-top:25px;text-align:center"
        @current-change="onChangePage"
      ></el-pagination>
    </el-card>
    <!-- / 内容部分 -->
  </div>
</template>

<script>
export default {
  name: 'airticle',
  data () {
    return {
      radio: 3,
      value1: '',
      // 文章总数
      total_count: 0,
      form: {
        name: '',
        region: ''
      },
      // 文章状态
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
        }
      ],
      // 文章列表
      airticleData: [
        // {
        //   pubdate: '',
        //   title: '',
        //   cover: {
        //     images: []
        //   }
        // }
      ],
      // 文章类别
      category: [],
      // 筛选表单
      filterForm: {
        // 频道
        channel_id: ''
      }
    }
  },
  methods: {

    // 渲染文章列表
    loadAirticle: function (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: page
        }
      })
        .then(res => {
          console.log(res.data)
          this.airticleData = res.data.data.results
          this.total_count = res.data.data.total_count
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 渲染文章类别
    loadCategory: function () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        console.log(res.data)
        this.category = res.data.data.channels
      })
    },

    // 分页器切换渲染
    onChangePage: function (page) {
      console.log(page)
      this.loadAirticle(page)
    }
  },
  created () {
    this.loadAirticle(1)
    this.loadCategory()
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
