<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头部返回 -->
        <el-page-header @back="$router.push('/comment')" content="文章评论详情" class="back"></el-page-header>
        <!-- 标题 -->
        <div class="title">
          <h1>{{art_title}}</h1>
          <span>{{art_pubdate}}</span>
        </div>
      </div>

      <!-- 评论列表 -->
      <el-table :data="commentData" style="width: 100%">
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" width="80px" />
          </template>
        </el-table-column>
        <el-table-column prop="aut_name" label="昵称" align="center"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column label="数据显示" align="center">
          <template slot-scope="scope">
            <i class="el-icon-thumb" style="margin-right:20px">{{scope.row.like_count}}</i>
            <i class="el-icon-document">{{scope.row.reply_count}}</i>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="评论时间" align="center">
          <template slot-scope="scope">{{scope.row.pubdate | dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="onChangeTop(scope.row)">{{scope.row.is_top?'取消推荐':'推荐'}}</el-link>
            <el-link type="success" style="margin:0 10px">回复</el-link>
            <el-link
              type="warning"
              @click.native="onNoLike(scope.row)"
              v-if="scope.row.is_liking"
            >取消点赞</el-link>
            <el-link type="warning" @click.native="onLike(scope.row)" v-else>点赞</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row :gutter="20">
        <el-col :span="6">
            <div class="first">
                <img src="../assets/img/avatar.jpg" width="50px">
            </div>
            <div class="second">
                <div class="name">团团</div>
                <div class="info">圆圆</div>
                <div class="content">
                    <i class="el-icon-finished">0</i>
                    <i class="el-icon-document">1</i>
                </div>
            </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <div class="grid-content bg-purple">密码</div>
        </el-col>
      </el-row>-->
    </el-card>
  </div>
</template>

<script>
// 日期格式化库
import Vue from 'vue'
import moment from 'moment'
// 过滤器，格式化时间
Vue.filter('dataFormat', data => {
  return moment(data).format('YYYY-MM-DD HH:mm:SS')
})

export default {
  name: 'detail',
  data () {
    return {
      // 文章发表时间
      art_pubdate: '',

      // 文章标题
      art_title: '',

      commentData: [
        {
          aut_photo: '',
          aut_name: '',
          content: '',
          like_count: '',
          reply_count: '',
          pubdate: '',
          is_liking: 0,
          is_top: 0
        }
      ]
    }
  },
  props: {
    id: {
      type: String
    }
  },
  //   filters: {
  //     dataFormat: function (data) {
  //       return moment(data).format('YYYY-MM-DD HH:mm:SS')
  //     }
  //   },
  created () {
    this.loadArticlecomment()
  },
  methods: {
    // 加载评论列表
    loadArticlecomment: function () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.id
        }
      })
        .then(res => {
          console.log(res.data)
          this.commentData = res.data.data.results
          this.art_pubdate = moment(res.data.data.art_pubdate).format(
            'YYYY-MM-DD HH:mm:SS'
          )
          this.art_title = res.data.data.art_title
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点赞
    onLike: function (comment) {
      console.log(comment)
      this.$axios({
        method: 'POST',
        url: '/comment/likings',
        data: {
          target: comment.com_id
        }
      }).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你，点赞成功',
          type: 'success'
        })
        comment.is_liking = 1
        this.loadArticlecomment()
      })
    },

    // 取消点赞
    onNoLike: function (comment) {
      this.$axios({
        method: 'DELETE',
        url: `/comment/likings/${comment.com_id}`,
        data: {
          target: comment.com_id
        }
      }).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你，取消点赞成功',
          type: 'success'
        })
        comment.is_liking = 0
        this.loadArticlecomment()
      })
    },

    // 修改置顶状态
    onChangeTop: function (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          sticky: !comment.is_top
        }
      }).then(res => {
        console.log(res)
        comment.is_top = !comment.is_top
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.loadArticlecomment()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.detail {
  .back {
    color: #3296fa;
  }
  .title {
    margin-left: 30px;
    h1 {
      font-size: 30px;
      margin-bottom: 20px;
      font-weight: normal;
    }
  }
}
</style>
