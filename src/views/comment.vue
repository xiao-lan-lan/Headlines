<template>
  <div class="comment">
    <el-card>
      <!-- 评论数据表格 -->
      <el-table :data="commentData" border style="width: 100%">
        <el-table-column prop="title" label="标题" width="350"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.comment_status" type="success">正常</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="150" align="center"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-link type="primary" class="edit">修改</el-link>
            <el-link type="danger">关闭评论</el-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total_count"
      ></el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      commentData: [],
      comment_status: true,
      total_count: '',
      current_page: ''
    }
  },
  methods: {
    // 渲染评论列表
    loadComments (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: page,
          per_page: 10,
          response_type: 'comment'
        }
      })
        .then(res => {
          console.log(res.data)
          this.commentData = res.data.data.results
          this.total_count = res.data.data.total_count
          res.data.data.results.forEach(item => {
            this.comment_status = item.comment_status
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleCurrentChange (page) {
      console.log(page)
      this.loadComments(page)
    }
  },
  created () {
    this.loadComments(1)
  }
}
</script>

<style lang='less' scoped>
.comment {
  .pagination {
    margin: 30px 0;
    text-align: center;
  }
  .edit {
    margin-right: 15px;
  }
}
</style>
