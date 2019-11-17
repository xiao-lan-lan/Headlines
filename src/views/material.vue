<template>
  <div>素材管理</div>
</template>

<script>
export default {
  methods: {
    loadMaterial () {
      this.$axios({
        method: 'GET',
        url: '/user/images'
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.loadMaterial()
  }
}
</script>

<style>

</style>
