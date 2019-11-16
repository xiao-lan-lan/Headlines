<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="articleform" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleform.title" placeholder="文章名称"></el-input>
        </el-form-item>

        <el-form-item label="内容">
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

        <el-form-item label="频道">
          <el-select placeholder="请选择" v-model="articleform.channel_id">
            <template>
              <el-option :value="null">所有频道</el-option>
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
export default {
  name: 'publistArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      articleform: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      category: []
    }
  },
  methods: {
    onSubmit (draft) {
      console.log(draft)
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.articleform
      }).then(res => {
        console.log(res.status)
        if (res.status === 201) {
          this.$message({
            message: '恭喜你，发表成功',
            type: 'success'
          })
          this.$router.push('/airticle')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loadCategory: function () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        console.log(res.data)
        this.category = res.data.data.channels
      })
    }
  },
  created () {
    this.loadCategory()
  }
}
</script>

<style lang='less' scoped>
  .richtext .ql-container.ql-snow {
    height: 30px;
  }
</style>
