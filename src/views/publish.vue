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
          <el-input type="textarea" v-model="articleform.content"></el-input>
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
          <el-select v-model="articleform.channel_id" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
export default {
  name: 'publistArticle',
  data () {
    return {
      articleform: {
        title: '',
        content: '',
        cover: {
          type: 0
        },
        channel_id: ''
      }
    }
  },
  methods: {
    onSubmit (draft) {
      console.log(draft)
    }
  }
}
</script>

<style>
</style>
