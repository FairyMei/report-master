<template>
  <div id="evaluation_1">
    <div id="box2">


      <div id="header">
        <ul id="nav" >
          <!--<router-link :to="item.url" v-for="(item,i) in nav">-->
            <li  v-for="(item,i) in nav" :class="i==0? 'blue':''" @click="status(i)" ref='myli'>{{item.name}}</li>
          <!--</router-link>-->
        </ul>
        <!--{{tableDate.finalScore==null?'':'tableDate.finalScore'}} v-model="zongfen"-->
        <!--({{leiji}}<span v-model="tableData.finalScore"></span>分 )-->
        <p id="text" v-show='showPage'>{{btnText}}  <em class="accumulative" ></em>  </p>
        <p class="text" v-show='showPage2'>{{btnText}}</p>
        <!--日期-->
        <div  v-show="showPage"  class="block">
          <i class="el-icon-caret-left" @click="down"></i>
          <p class="time">{{time}}</p>
          <i class="el-icon-caret-right" @click="up"></i>
        </div>
        <div  v-show="showPage2"  class="block">
          <i class="el-icon-caret-left" @click="down1"></i>
          <p class="time">{{time}}</p>
          <i class="el-icon-caret-right" @click="monthUp"></i>
        </div>



      </div>
      <div v-show="showPage" class="tabBox" style="width: 98%;margin: 1%;" >
        <el-table  :data="tableData"  :header-cell-style="getRowClass"  >
          <el-table-column prop="reportDate" label="日期" >
          </el-table-column>
          <el-table-column  label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.type!=='0'?'以考评':'-'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="attachmentPath" label="考评分">
          </el-table-column>
          <el-table-column prop="coordination" label="所在部门" >
          </el-table-column>
          <el-table-column prop="createUser" label="考评人" >
          </el-table-column>
          <el-table-column prop="reportDate" label="考评时间" >
          </el-table-column>
          <el-table-column fixed="right"  label="操作">
            <template slot-scope="scope" >
              <!--<router-link to="/">  id ='jjj'-->
              <el-button @click="handleClick(scope.row)" @click.stop type="text" size="small" >详情</el-button>
              <!--</router-link>-->
              <!--<xiangqingye class="xiangqingye" v-show="isShow"></xiangqingye>-->

              <el-button @click="dialogVisible = true;bomb" type="text" size="small" >申诉</el-button>
              <!--@click="appealhandleClick (scope.row)"-->

            </template>

          </el-table-column>

        </el-table>
      </div>
      <!--月报-->
   <div v-show="showPage2" class="tabBox" style="width: 98%;margin: 1%;" >
        <el-table  :data="monthDate"  :header-cell-style="getRowClass"  >
          <el-table-column prop="reportDate" label="日期" >
          </el-table-column>
          <el-table-column prop="type" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.type!=='0'?'以考评':'-'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="targetCompletion" label="本月目标完成情况">
          </el-table-column>
          <el-table-column prop="userName" label="创建人" >
          </el-table-column>
          <el-table-column prop="reportDate" label="创建时间" >
          </el-table-column>
          <el-table-column prop="createUser" label="修改人" >
          </el-table-column>
          <el-table-column fixed="right"  label="操作">
            <template slot-scope="scope" id ='jjj'>
              <!--<router-link to="/">-->
              <el-button @click="handleClick1(scope.row)" type="text" size="small" >详情</el-button>
              <!--</router-link>-->
              <!--<xiangqingye class="xiangqingye" v-show="isShow"></xiangqingye>-->

              <!--<el-button @click="dialogVisible = true;bomb" type="text" size="small" >申诉</el-button>-->
              <!--@click="appealhandleClick (scope.row)"-->

            </template>

          </el-table-column>

        </el-table>
      </div>

    </div>
    <el-dialog
      title="申诉"
      :visible.sync="dialogVisible"
      width="30%"  >
      <span>请输入标题</span>
      <el-input
        placeholder="请输入内容"
        v-model="dialogCentent"
        clearable>
      </el-input>
      <span>原因</span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="dialogTextarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure">确 定</el-button>
  </span>
    </el-dialog>

    <sidebar v-if="isShow" :closeSidebar="handleClick" :tabledata1="row" ></sidebar>
    <yuebaosidebar v-if="isShow1" :closeSidebar="handleClick1" :tabledata2="row1" ></yuebaosidebar>
    <!--@hidePanel="hidePanel"-->
  </div>
</template>
<script>
  import axios from 'axios'
  import calendar from '../components/common/calendar'
  import sidebar from './common/sidebar'
  import yuebaosidebar from './common/yuebaosidebar'
  export default {
    data:function(){
      return {
        flag:true,
        showPage:true,
        showPage2:false,
        btnText:'我的日报考评分',
        // leiji:'累积',
        // zongfen:'',
        dialogVisible: false,
        tableData: [],
        //月报
        monthDate:[],
        row: {},
        row1: {},
        page:0,
        i:0,
        value4: '',
        time:"" ,
        nav:[
          {'name':'日报','show':"y"},
          {'name':'月报','show':"y"},
        ],
        isShow:false,
        isShow1:false,
        dialogTextarea: '',
        radio:'1',
        dialogCentent:'',
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

      num(i){
        this.arr[i].show='n'
      },
      status(i){
        //通过改变page隐藏其它元素
        this.page=i
        //取消之前的样式，切换样式
        for(let j=0;j<2;j++){
          this.$refs.myli[j].className="a"
        }
        this.$refs.myli[i].className="blue"
        // 判断是否是日报或者月报
        if(i==0){
          this.showPage=true
          this.showPage2=false

          var time=new Date()
          var year=time.getFullYear()
          var month=time.getMonth()+1
          var day=time.getDate()
          var week =time.getDay()//星期
          var week2=""
          if(week==1){
            week2="一"
          }else if(week==2){
            week2="二"
          }else if(week==3){
            week2="三"
          }else if(week==4){
            week2="四"
          }else if(week==5){
            week2="五"
          }else if(week==6){
            week2="六"
          }else if(week==7){
            week2="日"
          }
          // this.time=year+"-"+month+"-"+day+"<i>"+" (周"+week2+")"+"</i>"

          //同步判断月，日是否小与10
          if(month<10){
            month='0'+month
          }
          if(day<10){
            day='0'+day
          }
          this.time=year+"-"+month+"-"+day;

          this.btnText = "我的日报考评分"
            // this.leiji="累积"

          var url = 'http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate';
          this.$http.post(url,
            {
              reportDate:this.time
            },
            {
              emulateJSON:true
            })
            .then(res=>{

              this.tableData=[]
              if(res.body.data!==null){
                this.tableData.push(res.body.data);
              }
            })
            .catch(err=>{

            })

        }else {
          this.showPage=false
          this.showPage2=true

          var time=new Date()
          var year=time.getFullYear()
          var month=time.getMonth()+1
          var week =time.getDay()//星期
          var week2=""
          if(week==1){
            week2="一"
          }else if(week==2){
            week2="二"
          }else if(week==3){
            week2="三"
          }else if(week==4){
            week2="四"
          }else if(week==5){
            week2="五"
          }else if(week==6){
            week2="六"
          }else if(week==7){
            week2="日"
          }

          //同步判断月，日是否小与10
          if(month<10){
            month='0'+month
          }
          this.time=year+"-"+month
          //标题
          this.btnText = "我的月报考评分"


          console.log(this.monthDate);
          var url = 'http://192.168.1.137:8085/springboot/monthlyReport/selectMothlyReport';
          this.$http.post(url,
            {
              reportDate:this.time
            },
            {
              emulateJSON:true
            })
            .then(res=>{

              // this.monthDate.push(res.body.data);
              console.log(res.body)
              this.monthDate=[]
              if(res.body.data!==null){
                this.monthDate.push(res.body.data);
              }
            })
            .catch(err=>{
              console.log(ERROR);
            })


        }
        //
        // console.log(this.showPage)
        // console.log(this.showPage2)

      },
      handleClick(row) {
        if(this.tableData.type==0){

          alert("没有任何数据!")


          }else{
            this.isShow = !this.isShow
            this.row=row
            console.log(this.row)

          }

      },
      handleClick1(row1) {
        if(this.tableData.type==0){

          alert("没有任何数据!")


        }else{
          this.isShow1 = !this.isShow1
          this.row1=row1
          console.log(this.row1)
        }

      },
      // hidePanel(){
      //   this.isShow = false;
      // },
      // bool:function(boo){
      //   this.bool2=boo
      //   this.box_hide()
      //
      // },
      // box_hide(){
      //   if(this.bool2==true){
      //     this.$refs.mdl.style.right=0
      //   }else{
      //     this.$refs.mdl.style.right='-100%'
      //
      //   }
      // },
      up(){
        this.addDate(this.time,+1,0)

          var url = 'http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate';
          this.$http.post(url,
            {
              reportDate:this.time
            },
            {
              emulateJSON:true
            })
            .then(res=>{
              this.tableData=[]
              if(res.body.data!==null){
                this.tableData.push(res.body.data);
              }

            })
            .catch(err=>{

            })


        // }
        // this.checkDaily()

      },
      down(){
        this.tableData=[]
        // if(this.month<10){
        //   this.month='0'+this.month
        // }
        this.addDate(this.time,-1,0)
        // this.tableData=[]
        // var url='../../static/json/evluathion_1.json'
        // axios.get(url).then((response)=> {
        //   console.log(response.data);
        //   this.tableData = response.data;
        // })

        var url = 'http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate';
        this.$http.post(url,
          {
            reportDate:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            if(res.body.data!==null){
              this.tableData.push(res.body.data);
            }
            // if(){}
            console.log(this.tableData);

          })
          .catch(err=>{

          })

      },
      //月日期
      monthUp(){
        this.addDate1(this.time, 0, 1)

        var url = 'http://192.168.1.137:8085/springboot/monthlyReport/selectMothlyReport';
        this.$http.post(url,
          {
            reportDate:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.monthDate=[]
            if(res.body.data!==null){
              this.monthDate.push(res.body.data);

            }
            console.log(this.tableData);

          })
          .catch(err=>{

          })
      },
      down1(){

        this.addDate1(this.time,-1,0)

        var url = 'http://192.168.1.137:8085/springboot/monthlyReport/selectMothlyReport';
        this.$http.post(url,
          {
            reportDate:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.monthDate=[]
            if(res.body.data!==null){
              this.monthDate.push(res.body.data);
            }
            console.log(this.tableData);

          })
          .catch(err=>{

          })

      },
      addDate(date,days,month){
        var d=new Date(date);
        d.setDate(d.getDate()+days);
        d.setMonth(d.getMonth()+month);
        var m=(d.getMonth()+1);
        var da =d.getDate();
        if(m<10){
          m='0'+m
        }
        if(da<10){
          da='0'+da
        }
        this.time=d.getFullYear()+'-'+m+'-'+da;
      },
      addDate1(date,days,month){
        var d=new Date(date);
        d.setDate(d.getDate()+days);
        d.setMonth(d.getMonth()+month);
        var m=(d.getMonth()+1);

        if(m<10){
          m='0'+m
        }

        this.time=d.getFullYear()+'-'+m
      },
      //对话框确定按钮
      sure(){
        this.dialogVisible = false;

        console.log(this.DialogTextarea)

        // var url = '';
        // this.$http.post(url,
        //   {
        //
        //   },
        //   {
        //     emulateJSON:true
        //   })
        //   .then(res=>{
        //     // this.tableData=res.body.data
        //     // console.log(res.data)
        //
        //   })
        //   .catch(err=>{
        //
        //   })
      },
      //  查询日报请求方法
      checkDaily(){
          var url = 'http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate';
        this.$http.post(url,
          {
            reportDate:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{


          })
          .catch(err=>{

          })
      },

      // //  查询月报请求方法
      checkMonthy(){
        var url = 'http://192.168.1.137:8085/springboot/monthlyReport/selectMothlyReportList';
        this.$http.post(url,
          {

          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.tableData=res.body.data
            // console.log(res.data)

          })
          .catch(err=>{
            this.tableData=[]
            if(res.body.data!==null){
              this.tableData.push(res.body.data);
            }
          })
      },

      //申诉的发送请求
      bomb(){
        //ribao
        // var url = 'http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate';
        var url = '';
        this.$http.post(url,
          {
            // reportDate:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.tableData=res.body.data
            console.log(res.data)

          })
          .catch(err=>{

          })
      },
    },
    created: function() {
//       var url='../../static/json/evluathion_1.json'
//       axios.get(url).then((response)=>{
//         console.log(response.data);
//         this.tableData=response.data;
//
// //    时间
//         var time=new Date()
//         var year=time.getFullYear()
//         var month=time.getMonth()+1
//         var day=time.getDate()
//         this.time=year+"-"+month+"-"+day
//       })
      var time=new Date()
      var year=time.getFullYear()
      var month=time.getMonth()+1
      var day=time.getDate()
      var week =time.getDay()//星期
      var week2=""
      if(week==1){
        week2="一"
      }else if(week==2){
        week2="二"
      }else if(week==3){
        week2="三"
      }else if(week==4){
        week2="四"
      }else if(week==5){
        week2="五"
      }else if(week==6){
        week2="六"
      }else if(week==7){
        week2="日"
      }
      // this.time=year+"-"+month+"-"+day+"<i>"+" (周"+week2+")"+"</i>"

      //同步判断月，日是否小与10
      if(month<10){
        month='0'+month
      }
      if(day<10){
        day='0'+day
      }
      this.time=year+"-"+month+"-"+day;

    //  调用
      this. checkDaily();
      // this.checkMonthy()
    },

    // 组件
    components:{
      calendar,
      sidebar,
      yuebaosidebar
    },
//    弹出框

  }
</script>

<style scoped="scoped">

  /*日历  */

  .block{
    float: right;
    margin-top:-1.5%;
  }
  .el-icon-caret-left,.el-icon-caret-right{
    cursor:pointer;
    color: #1E90FF;
    font-size: 35px;
  }
  .el-icon-caret-left,.el-icon-caret-right,.time{
    float: left;
    line-height: 40px;
  }
  /*日报月报*/
  #nav li:nth-child(1){
    border-right: 1px solid #9a9a9a;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }


  #evaluation_1{
    height: auto;
    width:calc(100% - 212px);
    /*background: #ededee;*/
  }
  #box2{
    width:100%;
    z-index: 9;
  }
  #header{
    margin-top: 10px;
    box-shadow:5px 0px 4px 1px silver;
    margin-top:15px;
    width: 100%;
    height: 50px;
    background: white;
    position: relative;
  }
  ul{
    list-style: none;
  }
  li{
    float: left;
    padding-bottom: 5px;
  }
  /*累计多少分*/
  .accumulative{
    width: 100%;
    float: left;
    margin-top: -50px;
    margin-left: 100px;
  }

  .accumulative span{
    color: red;
  }
  a{
    color: inherit;
    text-decoration: inherit;
  }
  #nav{
    padding: 10px;
    font-size: 12px;
  }
  #nav li{
    border-left: 1px solid #9a9a9a;
    border-top: 1px solid #9a9a9a;
    border-bottom: 1px solid #9a9a9a;
    padding: 10px;
  }
  #nav li:nth-child(2){
    border-right: 1px solid #9a9a9a;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  #nav li:nth-child(1){
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  #nav .blue{
    background:#5e9ffc ;
    color: white;
    border-color: #5e9ffc;
  }
  #text, .text{
    width: 100px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 25px);
    font-weight: bold;
  }
  .card{
    width: 100%;
    height: 100%;
    background: white;
  }

  #circle{
    margin: 15px;
    width: 52px;
    height: 52px;
    text-align: center;
    line-height: 52px;
    color:white;
    font-size: 20px;
    font-family: "微软雅黑";
    background:#e37e1e ;
    border-radius: 50%;
  }
  #right{
    width: calc(100% - 130px);
    float: left;
    height: 100%;
  }
  #time{
    width: 100%;
    height: 70px;
    border-bottom: 2px solid #dcdcdc;
  }
  #time p{
    font-size: 25px;
    line-height: 70px;
    margin-left: 20px;
  }
  @media only screen and (max-width:1300px ) {
    #text, #circle {
      display: none;
    }

    #nav li {
      padding: 5px;
    }

    #right {
      width: 100%;
    }

  }


  .v-modal{

  }
  /*弹出框*/
  /*.xiangqingye {*/
  /*position: absolute;*/
  /*width: 500px;*/
  /*height: 500px;*/
  /*background: red;*/
  /*top: 10px;*/
  /*right: 150px;*/
  /*}*/
</style>
