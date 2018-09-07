<template>
  <div>
    <div id="black_box"  v-if="bool2" ></div>
    <div id="modal" ref="mdl">
      <div id='right'></div>
      <div id = 'left'>
        <div id="close_mdl" @click="close" >
          <!--<i class="el-icon-caret-right" ></i>-->
          |||
        </div>
        <div id="body">
          <div id="header" >
            <div>
            </div>
            <p>日报考评详情</p>
            <button @click="close" class="btn" style="margin-right: 5px;width: 55px;color: white;background: #1E90FF;border: none;">关闭</button>
          </div>
          <table class="table table-bordered table-hover">
            <thead>
            <tr class="title" >
              <th>考评指标</th>
              <th>权重</th>
              <th>评价</th>
              <th>打分</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="items in tableData">
              <td> 今日工作记录<i class="el-icon-view view"></i> </td>
              <td>80%</td>
              <td>{{tabledata1.tmorrowPlan}}</td>
              <td>{{tabledata1.workScore}}</td>
            </tr>
            <tr  v-for="items in tableData">
              <td>明日计划 <i class="el-icon-view view"></i> </td>
              <td>20%</td>
              <td>{{tabledata1.tmorrowPlan}}</td>
              <td>{{tabledata1.tomPlansco}}</td>
            </tr>
            <tr>
              <td colspan="4" class="comprehensive">指标打分合计：<span class="score">
              {{score}} </span></td>
              <!--{{tabledata1.finalScore}}-->
            </tr>
            <tr>
              <td  colspan="4">
                <strong> <i class="el-icon-time"></i> 出勤率：</strong>
                <!--<span>100%</span>-->


                <el-radio-group v-model="tabledata1.attendance*1">
                  <el-radio disabled  :label="0.5">0.5天（请假）</el-radio>
                <el-radio disabled  :label="1">1天（正常上班）</el-radio>
                <el-radio  :label="1.5">1.5天（晚上加班）</el-radio>
                <!--:disabled="tabledata.flag==1?false:true" 判断是否禁用-->
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td  colspan="4" >
                <strong> <i class="el-icon-check check"></i>  最终得分：<span class="score">{{tabledata1.finalScore}}</span>  <em class="chuqinlv">（指标打分合计 + 加分 - 扣分）×出勤率</em> </strong>
                <br>
                <strong> <i class="el-icon-edit edit"></i>  评语： </strong>
                <el-input
                  type="textarea"
                  disabled
                  :autosize="{ minRows: 8, maxRows: 8}"
                  placeholder="请输入内容"
                  v-model="dialogTextarea">
                </el-input>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import right from '../../right.vue'
  import axios from 'axios'
  export default {
    name: 'App',
    props:{
      closeSidebar:{
        type:Function
      },
      tabledata1:{
        type:Object,
        default:{}
      },
    },
    data(){
      return {
        //评语
        dialogTextarea:this.tabledata1.comment,
        //function
        bool2:false,
        time:"",
        tableData:[
          {
          workScore: '',
            tomPlansco: '',
        },
        ],
        //  单选框
        radio: '',
      }
    },

    methods:{
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#f2f7fd'
        } else {
          return ''
        }
      },
      down(){
        alert(1)
      },
      close(){
        this.bool2=false
        this.box_hide()
        // this.$emit('hidePanel')
        this.closeSidebar()
        console.log()
      },
      box_hide(){
        if(this.bool2==true){
          this.$refs.mdl.style.right=0
        }else{
          this.$refs.mdl.style.right='-100%'
        }
      },
      getWeek(dateString){
        var date;
        var dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1),dateArray[2] );
        return " (周" + "日一二三四五六".charAt(date.getDay())+')'
      },
      bool:function(boo){
        this.bool2=boo
        this.box_hide()
      }
    },
    created(){
      console.log(this.tabledata1)
    },
    computed:{
      score(){
        return  this.tabledata1.workScore*1 + this.tabledata1.tomPlansco*1
      }
    }
  }

</script>

<style scoped>
  #close_mdl{
    width: 5%;
    height: 100%;
    float: left;
    color:#1E90FF;
    display: flex;
    align-items:center;
    font-size: 30px;
    box-sizing: border-box;
    justify-content:center;
  }
  #blue{
    background: #1E90FF;
    color: white;
    border: #1E90FF 1px solid;
  }
  #header p{
    float: right;
    line-height: 50px;
  }
  .btn{
    background: none;
    border:1px solid #9a9a9a;
    border-radius: 3px;
    height: 30px;
    width: 75px;
    margin-top: 10px;
    margin-left: 5px;

  }
  #header{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #9a9a9a;
    display: flex;
    justify-content:space-between;
  }
  #body{
    width: 95%;
    float: left;
  }
  #black_box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.4;
    z-index:99;
  }
  #left{
    width: 60%;
    height: 100%;
    float: right;
    background: #fff;
  }

  #modal{
    box-shadow:0px 2px 4px 1px #9a9a9a;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    transition: all .5s;
    background: rgba(0,0,0,.5);
  }
  html,body{height: 100%;}
  @media only screen and (max-width:1000px ) {
    #modal{
      width: 100%;
    }
  }
  /*表格*/
  .title{
    background-color: #f2f7fd;
  }
  /*指标综合打分*/
  .comprehensive{
    padding-right: 110px ;
    text-align: right;
  }
  /*icon 颜色样式*/
  .el-icon-time, .view, .check, .edit{
    color: #24a1ff;
    font-weight: bold;
  }
  .score{
    color: red;
  }
  .chuqinlv{
    color:#666;
    font-size: 10px;
  }
  .v-modal{
    z-index:-1 !important;
  }



</style>
