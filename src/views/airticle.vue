<template>
  <div class="airticle">
    <!-- 筛选部分 -->
    <el-card class="box-card" shadow="never">
      全部图文
      <div class="line"></div>
      <el-form ref="form" label-width="80px" class="airForm">
        <el-form-item label="文章状态">
          <el-radio-group v-model="status" @change="onRadiochange">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <!-- <el-radio :label="4">已删除</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">

          <!-- 抽取的频道组件 -->
          <!-- <category v-model="channel_id"></category> -->
          <category :value="channel_id" @input="channel_id=$event"></category>

          <!-- <el-select placeholder="请选择" v-model="channel_id" @change="onCategoryChange">
            <template>
              <el-option :value="null">所有频道</el-option>
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </template>
          </el-select> -->

        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="onDateChange"
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
      <el-table
        :data="airticleData"
        style="width: 100%"
        class="airtable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="date" label="头像" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="80px" v-if="scope.row.cover.images[0]" />
            <img src="../assets/img/avatar.jpg" alt v-else width="80px" />
          </template>
        </el-table-column>

        <el-table-column prop="title" label="标题" width="180" align="center"></el-table-column>

        <!-- 表格里只能渲染普通文本，如何需要使用其他标签，需要用template包裹，template绑定slot-scope="scope" scope.row为遍历项-->
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="airticleStatus[scope.row.status].type"
            >{{airticleStatus[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="pubdate" label="时间" align="center"></el-table-column>

        <el-table-column prop="id" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
              @click="onEdit(scope.row.id)"
            >修改</el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              icon="el-icon-delete"
              @click="onDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        style="margin-top:25px;text-align:center"
        @current-change="onChangePage"
      ></el-pagination>
    </el-card>
    <!-- / 内容部分 -->
  </div>
</template>

<script>
// 引入抽取的频道组件
import category from '../components/category.vue'

export default {
  name: 'airticle',
  components: {
    category
  },
  data () {
    return {
      // 文章状态
      status: null,

      // 日期范围
      rangeDate: '',
      begin_pubdate: '',
      end_pubdate: '',

      // 文章总数
      total_count: 0,

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

      // // 文章类别
      // category: [],

      // // 频道
      channel_id: null,

      // 当前页
      currentPage: 1,

      // 加载状态
      loading: true
    }
  },
  methods: {
    // 渲染文章列表
    loadAirticle: function (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: page,
          status: this.status,
          channel_id: this.channel_id,
          begin_pubdate: this.rangeDate[0],
          end_pubdate: this.rangeDate[1]
        }
      })
        .then(res => {
          console.log(res.data)
          this.airticleData = res.data.data.results
          this.total_count = res.data.data.total_count
        })
        .catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading = false
        })
    },

    // 渲染文章类别
    // loadCategory: function () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     console.log(res.data)
    //     this.category = res.data.data.channels
    //   })
    // },

    // 分页器切换渲染
    onChangePage: function (page) {
      console.log(page)
      this.loadAirticle(page)
      this.currentPage = page
    },

    // 单选切换筛选
    onRadiochange: function () {
      this.loadAirticle(this.currentPage)
    },

    // 频道切换渲染
    // onCategoryChange: function () {
    //   console.log(this.channel_id)
    //   this.loadAirticle(this.currentPage)
    // },

    // 日期筛选切换
    onDateChange: function () {
      this.loadAirticle(this.currentPage)
    },

    // 删除
    onDelete: function (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$axios({
          method: 'DELETE',
          url: `/articles/${id}`
        })
          .then(res => {
            console.log(res)
            this.loadAirticle(this.currentPage)
          })
          .catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改
    onEdit: function (id) {
      console.log(id)
      this.$router.push(`/publish/${id}`)
    }
  },
  created () {
    this.loadAirticle(1)
    // this.loadCategory()
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
