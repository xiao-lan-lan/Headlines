<template>
  <div
    class="publish"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $route.params.id?'编辑文章':'发布文章' }}</span>
      </div>
      <el-form ref="form" :model="articleform" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleform.title" placeholder="文章名称"></el-input>
        </el-form-item>

        <el-form-item label="内容" class="content">
          <quillEditor v-model="articleform.content" class="richtext"></quillEditor>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="articleform.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 上传图片组件 -->
        <!-- :value="articleform.cover.images[item-1]"
        @input="articleform.cover.images[item-1]=$event" -->
        <el-form-item>
          <uploadImage
            v-for="item in articleform.cover.type"
            :key="item"
            style="float:left"
            v-model="articleform.cover.images[item-1]"
          ></uploadImage>
        </el-form-item>

        <el-form-item label="频道">
          <!-- 抽取频道组件 -->
          <category :value="articleform.channel_id" @input="articleform.channel_id=$event"></category>

          <!-- <el-select placeholder="请选择" v-model="articleform.channel_id">
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
          </el-select>-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本框
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

// 引入抽取的频道列表
import category from '../components/category.vue'

// 引入抽取上传图片组件
import uploadImage from '../components/uploadImage'
export default {
  name: 'publistArticle',
  components: {
    quillEditor,
    category,
    uploadImage
  },
  data () {
    return {
      articleform: {
        id: '',
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      // category: [],
      // dialogTableVisible: false,
      loading: true
    }
  },
  methods: {
    // 点击按钮
    onSubmit (draft) {
      console.log(draft)
      if (this.$route.params.id) {
        this.editArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },

    // 渲染文章类别
    // loadCategory: function () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     console.log(res.data)
    //     this.category = res.data.data.channels
    //   }).finally(() => {
    //     this.loading = false
    //   })
    // },

    // 渲染指定文章
    loadOneArticle: function () {
      const id = this.$route.params.id
      console.log(id)
      if (id) {
        this.$axios({
          method: 'GET',
          url: `/articles/${id}`
        })
          .then(res => {
            console.log(res.data)
            this.articleform = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },

    // 发表文章
    addArticle: function (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.articleform
      })
        .then(res => {
          console.log(res.status)
          if (res.status === 201) {
            this.$message({
              message: '恭喜你，发表成功',
              type: 'success'
            })
            this.$router.push('/airticle')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 编辑文章
    editArticle: function (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.id}`,
        params: {
          draft
        },
        data: this.articleform
      })
        .then(res => {
          console.log(res.status)
          if (res.status === 201) {
            this.$message({
              message: '恭喜你，编辑成功',
              type: 'success'
            })
            this.$router.push('/airticle')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // this.loadCategory()
    this.loadOneArticle()
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang='less' scoped>
.content {
  margin-bottom: 30px;
  height: 350px;
  .richtext {
    height: 260px;
  }
}
</style>
