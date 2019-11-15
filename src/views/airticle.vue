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
          <el-select placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
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
    <el-card class="box-card" shadow="never">
      共找到59938条符合条件的内容
      <div class="line"></div>
      <el-table :data="tableData" style="width: 100%" class="airtable">
        <el-table-column prop="date" label="头像" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="标题" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
        <el-table-column prop="address" label="时间" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <el-button type="primary" plain size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- / 内容部分 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 3,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
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
