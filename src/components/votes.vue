<template>
  <div class="tit" >
    <div class="headers">
      <h4>全员日报情况:</h4>
    </div>
    <div style='display:flex;width:100%;height:300px;'>
                        <!--圆形图-->
      <div style='flex:1;width:100%;height:300px;'>
        <div id="cccc"></div>
      </div>
                        <!--柱形图-->
      <div style='flex:1; width: 50%;height:300px;'>
          <echt style="height: 300px"></echt>
      </div>
    </div>


    <div class="headers">
      <h4>日报差异列表:</h4>
    </div>
    <div>
      <el-table class="tab"
                :data="tableData"
                stripe
                style="width: 100%"
      >
        <el-table-column
          prop="date"

          width="180">
        </el-table-column>
        <el-table-column
          prop="name"

          width="180">

        </el-table-column>
        <el-table-column
          prop="address"
        >
        </el-table-column>
        <el-table-column
          prop="city"
        >
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import echt from '../components/echarts/echt_right'

  export default {
    data() {
      return {
        tableData: [{
          date: '刘峰',
          name: '2018年7月23日',
          address: ' 饿了么项目',
          city: '已提交',
        }, {
          date: '孙国胜',
          name: '2018年7月23日',
          city: '未提交',
          address: '饿了么项目'
        }, {
          date: '郭美杰',
          name: '2018年7月23日',
          city: '未提交',
          address: '饿了么项目'
        }, {
          date: '张志浩',
          name: '2018年7月23日',
          city: '未提交',
          address: '饿了么项目'
        }]
      }
    },
    components:{
      echt
    }
  }

  window.onload=function () {

    var dom = document.getElementById("cccc");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
      title : {
      },

      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          magicType : {
            show: true,
            type: ['pie', 'funnel']
          },
        }
      },
      calculable : true,
      series : [
        {
          name:'半径模式',
          type:'pie',
          radius : [20, 110],
          center : ['25%', '50%'],
          roseType : 'radius',
          color:['purple','orange'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          data:[
            {value:10, name:'rose1'},
            {value:5, name:'rose2'},
            {value:15, name:'rose3'},
            {value:25, name:'rose4'},
            {value:20, name:'rose5'},
            {value:35, name:'rose6'},
            {value:30, name:'rose7'},
            {value:40, name:'rose8'}
          ]
        },
      ]
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }



    var doms = document.getElementById("containers");
    var myCharts = echarts.init(doms);
    var apps = {};
    option = null;
    apps.title = '柱状图框选';

    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    for (var i = 0; i < 10; i++) {
      xAxisData.push('Class' + i);
      data1.push((Math.random() * 2).toFixed(2));
      data2.push(-Math.random().toFixed(2));
      data3.push((Math.random() * 5).toFixed(2));
      data4.push((Math.random() + 0.3).toFixed(2));
    }

    var itemStyle = {
      normal: {
      },
      emphasis: {
        barBorderWidth: 1,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
      }
    };

    option = {
      backgroundColor: '#eee',
      legend: {
        data: ['bar', 'bar2', 'bar3', 'bar4'],
        align: 'left',
        left: 10
      },
      brush: {
        toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        xAxisIndex: 0
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {}
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        name: 'X Axis',
        silent: false,
        axisLine: {onZero: true},
        splitLine: {show: false},
        splitArea: {show: false}
      },
      yAxis: {
        inverse: true,
        splitArea: {show: false}
      },
      grid: {
        left: 100
      },
      visualMap: {
        type: 'continuous',
        dimension: 1,
        text: ['High', 'Low'],
        inverse: true,
        itemHeight: 200,
        calculable: true,
        min: -2,
        max: 6,
        top: 60,
        left: 10,
        inRange: {
          colorLightness: [0.4, 0.8]
        },
        outOfRange: {
          color: '#bbb'
        },
        controller: {
          inRange: {
            color: '#2f4554'
          }
        }
      },
      series: [
        {
          name: 'bar',
          type: 'bar',
          stack: 'one',
          itemStyle: itemStyle,
          data: data1
        },
        {
          name: 'bar2',
          type: 'bar',
          stack: 'one',
          itemStyle: itemStyle,
          data: data2
        },
        {
          name: 'bar3',
          type: 'bar',
          stack: 'two',
          itemStyle: itemStyle,
          data: data3
        },
        {
          name: 'bar4',
          type: 'bar',
          stack: 'two',
          itemStyle: itemStyle,
          data: data4
        }
      ]
    };

    myCharts.on('brushSelected', renderBrushed);

    function renderBrushed(params) {
      var brushed = [];
      var brushComponent = params.batch[0];

      for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var rawIndices = brushComponent.selected[sIdx].dataIndex;
        brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
      }

      myCharts.setOption({
        title: {
          backgroundColor: '#333',
          text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
          bottom: 0,
          right: 0,
          width: 100,
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        }
      });
    };
    if (option && typeof option === "object") {
      myCharts.setOption(option, true);
    }

  }
</script>

<style scoped>
  template{
    position: relative;
  }
  .tit{
    width:84.5%;
    /*border:1px solid #61a0a8;*/
    position: absolute;
    left:15.5%;
  }
  .headers h4{
    line-height: 50px;
    margin-left:30px;
    color:#666;
  }

  .tab{
    border:1px solid #ccc;
    margin:5%;
    width:90% !important;
    height:30%;
    border-radius: 5px;
    margin:0 auto !important;
    text-align: center !important;
  }
#cccc{
  background: #ccc;
  width:50%;
  height:300px;
  position: absolute;
  padding-left:20%;
  margin-left: 4px;

}
  .el-table-column{
    border:1px solid red;
  }
 </style>
