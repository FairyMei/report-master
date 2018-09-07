<template>
  <div id="evaluation_2">
    <div id="box2">
      <div id="header">
        <ul id="nav">

          <el-select v-model="value" placeholder="请选择" >

            <el-option style="display: flex;flex-direction:column"
                       v-for="item in options"

                       :label="item.userName"
                       :value="item.uid"
            >
              <!--:key="item.uid"-->
            </el-option>

          </el-select>
          <el-button type="primary" @click="selectBtn">选择</el-button>

          <h2 id="text">
            <el-dropdown @command="handleCommand" @click="dialogTableVisible = true">
					  <span class="el-dropdown-link">
					    日报绩效排行榜<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="日报考评统计表">日报绩效排行榜</el-dropdown-item>
                <br/>
                <el-dropdown-item command="月报考评统计表">月报绩效排行榜</el-dropdown-item>
                <br/>
                <el-dropdown-item command="周报考评统计表">周报绩效排行榜</el-dropdown-item>
                <br/>
                <el-dropdown-item command="季报考评统计表">季报绩效排行榜</el-dropdown-item>
                <br/>
                <el-dropdown-item command="半报考评统计表">半年报绩效排行榜</el-dropdown-item>
                <br/>
                <el-dropdown-item command="年报考评统计表">年报绩效排行榜</el-dropdown-item>
                <br/>

              </el-dropdown-menu>
            </el-dropdown>
          </h2>

          <div class="block">
            <i class="el-icon-caret-left" @click="monthDown"></i>
            <i class="el-icon-caret-left" @click="down"></i>
            <p class="time">{{time}}</p>
            <i class="el-icon-caret-right" @click="up"></i>
            <i class="el-icon-caret-right" @click="monthUp"></i>
            <el-button type="primary">日报统计</el-button>
          </div>
        </ul>

        <el-dialog :title="dialogTitleType"  :visible.sync="dialogTableVisible" class="statistics">
          <el-button class="export" type="primary" @click="exportContent">导出</el-button>
          <el-table :data="gridData">
            <!--<el-table-column property="rankinga" label="公司排名" width="150></el-table-column>-->

            <el-table-column  type="index" label="公司排名" style="width: 80px" >
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.type!=='0'?'以考评':'-'}}</span>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column prop="name" label="姓名"  style="width:100px">
            </el-table-column>
            <el-table-column prop="bumen" label="所在部门" style="width:120px">
            </el-table-column>
            <el-table-column prop="number" label="日报数量" style="width:100px">
            </el-table-column>
            <el-table-column prop="accumulation" label="日报累积分" style="width:100px">
            </el-table-column>
            <el-table-column prop="average" label="日报平均分" style="width:100px">
            </el-table-column>

            <!--<el-table-column property="date" label="日期" width="150"></el-table-column>-->
            <!--<el-table-column property="name" label="姓名" width="200"></el-table-column>-->
            <!--<el-table-column property="address" label="地址"></el-table-column>-->
          </el-table>
          <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" @click="dialogvisible">确 定</el-button>-->
          <!--</span>-->
<!-- @current-change="handleCurrentChange"-->
          <el-pagination class="elpagination"
            background
            layout="prev, pager, next"
            :total="10"
            page-size="20"
          >
          </el-pagination>

        </el-dialog>
      </div>


      <div class="tabBox" style="width: 98%;margin: 1%;">
        <el-table :data="tableData" >
          <el-table-column type="index" prop="ranking" label="公司排名">
          </el-table-column>
          <el-table-column prop="userName" label="姓名">
          </el-table-column>
          <el-table-column prop="otherCases" label="考评分">
            <!--finalScore-->
          </el-table-column>
          <el-table-column prop="name" label="所在部门">
          </el-table-column>
          <el-table-column prop="assessor" label="考评人">
          </el-table-column>
          <el-table-column prop="reportDate" label="考评时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

    </div>

    <team-sidebar v-if="isShow" :closeSidebar="handleClick" :tabledata2="row" ></team-sidebar>
  </div>
</template>

<script>
  import axios from 'axios'
  import TeamSidebar from './common/teamSidebar'
  export default {
    data: function () {
      return {
        isShow:false,
        row: {},
        //dialog
        cur:"",
        // url:"http://192.168.1.12",
        dialogTitleType:'',
        gridData: [],
      // {
      //   ranking: '1',
      //     name: '王小虎',
      //   bumen: '嘉仕',
      //   number:'1',
      //   accumulation:'98',
      //   average:'95'
      // }, {
      //   ranking: '2',
      //     name: '王小虎',
      //     bumen: '嘉仕',
      //     number:'1',
      //     accumulation:'98',
      //     average:'95'
      // }, {
      //   ranking: '3',
      //     name: '王小虎',
      //     bumen: '嘉仕',
      //     number:'1',
      //     accumulation:'98',
      //     average:'95'
      // }, {
      //   ranking: '4',
      //     name: '王小虎',
      //     bumen: '嘉仕',
      //     number:'1',
      //     accumulation:'98',
      //     average:'95'
      // }
        dialogTableVisible: false,
        tableData: [],
        options: [],
        value: '',
        time: '',
        value1: '',
      }
    },
    methods: {
      handleCommand(command) {
        console.log(command)
        // this.$alert(`<strong>日报</strong> `+`<i> 得分 </i>`,``, {
        //   dangerouslyUseHTMLString: true
        // });
        this.dialogTableVisible = true
        this.dialogTitleType=command
        console.log(this.dialogTitleType)

        if(command==="日报考评统计表"){
          console.log(2)
          var url='http://192.168.1.137:8085/springboot/dailyReport/selectReportByDate'
          // url=url+'dailyReport'
          console.log(this.value)
          this.$http.post(url,
            {
              uid:this.value,
              Date:this.time
              // uid:this.id,
              // Date:this.time
            },
            {
              emulateJSON:true
            })
            .then(res=>{
              // this.options=res.body.data
              this.tableData=res.body.data
              console.log(res.data)

            })
            .catch(err=>{

            })
        }
        if(command==="月报考评统计表"){
          console.log(3)
          var url='http://192.168.1.137:8085/springboot/monthlyReport/selectMothlyReportList'
          console.log(this.value)
          this.$http.post(url,
            {
              uid:this.value,
              Date:this.time
              // uid:this.id,
              // Date:this.time
            },
            {
              emulateJSON:true
            })
            .then(res=>{
              // this.options=res.body.data
              this.tableData=res.body.data
              console.log(res.data)

            })
            .catch(err=>{

            })
        }



      },
      handleClick(row) {

          if(this.tableData.type==0){

            alert("没有任何数据!")


          }else{
            this.isShow = !this.isShow
            this.row=row
            console.log(this.row)


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



          }
        // this.isShow = !this.isShow
        // this.row=row
        // console.log(this.row)

      },
      up() {
        this.addDate(this.time, +1, 0)

        var url='http://192.168.1.137:8085/springboot/selectTeamDaily'
        console.log(this.value)
        this.$http.post(url,
          {
            uid:this.value,
            Date:this.time
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.options=res.body.data
            this.tableData=res.body.data

          })
          .catch(err=>{

          })
      },
      down() {
        this.addDate(this.time, -1, 0)

        var url='http://192.168.1.137:8085/springboot/selectTeamDaily'
        console.log(this.value)
        this.$http.post(url,
          {
            uid:this.value,
            Date:this.time
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.options=res.body.data
            this.tableData=res.body.data
            console.log(res.data)

          })
          .catch(err=>{

          })
      },
      monthUp() {
        this.addDate1(this.time, 0, 1)

        var url='http://192.168.1.137:8085/springboot/selectTeamDaily'
        console.log(this.value)
        this.$http.post(url,
          {
            uid:this.value,
            Date:this.time
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.options=res.body.data
            this.tableData=res.body.data
            // console.log(res.data)

          })
          .catch(err=>{

          })
      },
      monthDown() {
        this.addDate1(this.time, 0, -1)

        var url='http://192.168.1.137:8085/springboot/selectTeamDaily'
        console.log(this.value)
        this.$http.post(url,
          {
            uid:this.value,
            Date:this.time
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.options=res.body.data
            this.tableData=res.body.data
            // console.log(res.data)

          })
          .catch(err=>{

          })
      },
      addDate(date, days, month) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        d.setMonth(d.getMonth() + month);
        var m = (d.getMonth() + 1);
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
      //人员查询
      selectBtn(){
        var url='http://192.168.1.137:8085/springboot/selectTeamDaily'
        console.log(this.value)
        this.$http.post(url,
          {
            uid:this.value,
            Date:this.time
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            // this.options=res.body.data
            this.tableData=res.body.data
            console.log(res.data)

          })
          .catch(err=>{

          })
      },
      //  导出日报
      exportContent(){
        var url='192.168.1.137:8085/springboot/exportDail'
        window.open(url)
      //  &uid=参数名字
      },



    //  分页的请求
    //   handleCurrentChange (val) {
    //     this.$route.query.page = val  // 其中val是当前的页数。
    //     // this.$router.replace()  // 这样页面就跳转到相应的路由了。
    //     // 此时的路由地址是：
    //   },
    //   fetchData () {
    //     this.loading = true
    //     this.page.cur = +this.$route.query.page || 1   // 这个就是当前要请求的页数
    //     this.paginationList()  // 向后台发数据请求的接口。
    //   },
    //   paginationList(){
    //     var url = '';
    //     this.$http.post(url,
    //       {
    //         // reportDate:this.time
    //         // page: this.page.cur,
    //         // reservationname: this.guestName,
    //         // reservationphone: this.phoneNum
    //       },
    //       {
    //         emulateJSON:true
    //       })
    //       .then(res=>{
    //         this.loading = false
    //         // 转化数据
    //         this.resolveData(data.data.orders)
    //         // 赋值总页数
    //         this.page.totalPage = data.data.count
    //
    //       })
    //       .catch(err=>{
    //
    //       })
    //   }



    //  查询团队报告绩效
      checkTeam(){
        var url = 'http://192.168.1.137:8085/springboot/selectTeamDaily';
        this.$http.post(url,
          {
            uid:'',
            Date:''
            // uid:this.id,
            // Date:this.time
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.options=res.body.data
            this.tableData=res.body.data
            console.log(res.data)

          })
          .catch(err=>{

          })
      }


    },

    //监听路由变化
    watch: {
      // 监听路由变化，随时获取新的列表信息
      '$route': 'fetchData'
    },

    created() {

      var time = new Date()
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var day = time.getDate()
      if(month<10){
        month='0'+month
      }
      if(day<10){
        day='0'+day
      }
      this.time=year+"-"+month+"-"+day;

      // this.fetchData()

      this. checkTeam()
    },
    components:{
      TeamSidebar
    },



  }
</script>

<style scoped="scoped">


  .el-icon-caret-left, .el-icon-caret-right {
    cursor: pointer;
    color: #1E90FF;
    font-size: 35px;
  }

  .el-icon-caret-left, .el-icon-caret-right, .time {
    float: left;
    line-height: 40px;
  }

  /*.el-icon-caret-right:nth-of-type(2){
            margin-right: 30px;
        }*/
  #evaluation_2 {
    height: 100%;
    width: calc(100% - 212px);

  }

  #box2 {
    width: 100%;

    z-index: 9;
  }

  #header {
    margin-top: 10px;
    box-shadow: 5px 0px 4px 1px silver;

    width: 100%;
    height: 50px;
    background: white;
    position: relative;
  }

  .block {
    float: right;
  }

  #text {
    width: 140px;
    text-align: center;
    height: 50px;
    line-height: 50px;

    position: absolute;
    left: calc(50% - 70px);
    top: calc(0% - 25px);
    font-weight: bold;
  }

  ul {
    list-style: none;

  }

  li {
    float: left;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  #nav {
    padding: 8px;
    font-size: 12px;
    padding-left: 20px;
  }

  #nav li {
    border-left: 1px solid #9a9a9a;
    border-top: 1px solid #9a9a9a;
    border-bottom: 1px solid #9a9a9a;
    padding: 10px;
  }

  #nav li:nth-child(6) {
    border-right: 1px solid #9a9a9a;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #nav li:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  #nav .blue {
    background: #5e9ffc;
    color: white;
    border-color: #5e9ffc;
  }

  /*导出*/
  .statistics{

  }
  .export{
    position: absolute;
    top: 5%;
    right: 8%;
    /*width: 20px;*/
    /*text-align: center;*/
    /*height:20px;*/
    /*line-height: 4px;*/
  }
  /*分页*/
  /*.el-pagination{*/

  /*}*/
.elpagination{
  margin: 15px 260px 0px;
}
</style>
