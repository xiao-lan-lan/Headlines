<template>
  <div class="comment">
    <el-card>
      <!-- 评论数据表格 -->
      <el-table :data="commentData" border style="width: 100%">
        <el-table-column prop="title" label="标题" width="350"></el-table-column>

        <el-table-column prop="total_comment_count" label="总评论数" width="150" align="center"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" width="150" align="center"></el-table-column>

        <el-table-column label="评论状态" align="center">
          <!-- <template slot-scope="scope">
            <el-tag v-if="scope.row.comment_status" type="success">正常</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>-->

         <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#409eff"
              inactive-color="#dcdfe6"
              @change="onStatusChange(scope.row)"
            ></el-switch>
         </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template>
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
      total_count: 0,
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

    // 分页切换
    handleCurrentChange (page) {
      console.log(page)
      this.loadComments(page)
    },

    // 切换评论状态
    onStatusChange (item) {
      console.log(item)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id.toString()
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(res => {
        console.log(res.data)
        this.$message({
          message: `恭喜你，${item.comment_status ? '开启' : '关闭'}成功`,
          type: 'success',
          duration: 1000
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('错了哦，错误错误')
      })
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
