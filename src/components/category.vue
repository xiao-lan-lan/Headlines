<template>
  <div class="category">
    <el-select
        placeholder="请选择"
        :value='value'
        @input="onInput">
      <template>
        <el-option :value="null">所有频道</el-option>
        <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id">
          <span style="float: left">{{ item.name }}</span>
          <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data: function () {
    return {
      // 文章类别
      category: []

      // 频道
    //   channel_id: null
    }
  },
  methods: {
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
    onInput: function (data) {
      console.log(data)
      this.$emit('input', data)
    }
  },
  created () {
    this.loadCategory()
  }
}
</script>

<style>
</style>
