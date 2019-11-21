<template>
  <div class="graphic">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详情分析</span>
      </div>

      <!-- 单选 -->
      <el-radio-group v-model="radio1">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="本周"></el-radio-button>
        <el-radio-button label="本月"></el-radio-button>
      </el-radio-group>

      <!-- 日期范围 -->
      <el-date-picker
        v-model="value2"
        type="daterange"
        style="margin-left:30px;margin-bottom:30px"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>

      <div ref="main" style="width: 1100px;height:400px;"></div>
      <div ref="left" style="width: 500px;height:400px; float:left; margin-right:30px"></div>
      <div ref="right" style="width: 500px;height:400px; float:left"></div>
    </el-card>
  </div>
</template>

<script>
// 引入 echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      radio1: '今日',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
    }
  },
  methods: {
    loadmain () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '头条粉丝',
          left: 'left',
          top: 10,
          textStyle: {
            color: '#000'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    loadleft () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.left)

      // 指定图表的配置项和数据
      var option = {
        title: {
          left: 'left',
          top: 10,
          text: '图文数据'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    loadright () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.right)

      // 指定图表的配置项和数据
      var option = {
        backgroundColor: '#2c343c',

        title: {
          text: '图文数据',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted () {
    this.loadmain()
    this.loadleft()
    this.loadright()
  }
}
</script>

<style>
</style>
