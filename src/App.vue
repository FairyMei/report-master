<template>
  <div id="app">
    <div style="height: 1%;width: 100%;background: #5d9cf8;position: fixed;top: 0;left: 0;z-index:9"></div>
    <lf class="left" v-on:bool="bool"></lf>
    <!--<rg class="right"></rg>-->
    <router-view class="view" ></router-view>
    <div id="black_box" v-if="bool2" ></div>
    <div id="modal" ref="mdl">
      <div id="close_mdl" @click="close">
        <!--<i class="el-icon-caret-right" ></i>-->
        |||
      </div>
      <div id="body">
        <div id="header" >
          <div>
            <button class="btn" ref="a">日报内容</button>
            <button class="btn" id="blue">日报考核</button>
          </div>
          <p >admin日报考评 {{time}}</p>
          <button class="btn" style="margin-right: 5px;width: 55px;color: white;background: #1E90FF;border: none;">保存</button>
        </div>
        <el-table  :data="tableData"  :header-cell-style="getRowClass" >
          <el-table-column prop="date" label="考评指标" >
          </el-table-column>
          <el-table-column prop="state" label="权重">
            1
          </el-table-column>
          <el-table-column prop="name" label="评价">
            1
          </el-table-column>
          <el-table-column prop="branch" label="打分" >
            <input type="" name="" value="545" />
          </el-table-column>

          <el-table-column fixed="right"  label="操作">
            <template slot-scope="scope">
              <input type="" name=""  value="" />
              <el-button @click="handleClick(scope.row)" type="text" size="small">申诉</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import left from './left.vue'
  import right from './right.vue'
  import axios from 'axios'
  export default {
    name: 'App',
    data(){


      return {
        tableData: [],
        bool2:false,
        time:""
      }
    },
    components:{
      "lf":left,
      "rg":right
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
      // var url='../../static/json/evluathion_1.json'
      // axios.get(url).then((response)=>{
      //
      //   this.tableData=response.data
      // })
      // axios.get("https://www.easy-mock.com/mock/5b46c7ba54fc6458161b1afb/tableData/getData").then((response)=>{
      //   console.log(response);
      //   this.tableData=response.data
      // })
      var time=new Date()
      var year=time.getFullYear()
      var month=time.getMonth()+1
      var day=time.getDate()
      var week =time.getDay()
      this.time=year+"-"+month+"-"+day
      this.time+=this.getWeek(this.time)
    }
  }

</script>

<style scoped="scoped">
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
    opacity: 0.3;
    z-index:98;
  }
  #modal{
    box-shadow:0px 2px 4px 1px #9a9a9a;
    width: 60%;
    height: 100%;
    background: white;
    z-index: 99;
    position: fixed;
    top: 0;
    right: -100%;
    transition: all .5s;
  }
  html,body,#app {height: 100%;}
  .view{
    float: right;

  }
  .left{
    position: fixed;
    top: 1%;
    left: 0;
  }
  .right{

  }
  @media only screen and (max-width:1000px ) {
    #modal{
      width: 100%;
    }


  }
</style>
