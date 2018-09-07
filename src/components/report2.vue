<template>
  <div class="box">
    <div class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple select">
            <el-select v-model="userId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.uid"
                :label="item.userName"
                :value="item.uid">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" @click="select">选择</el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple fon">
            <h4 >团队日报</h4>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light select-date" >
            <div>
              <i class="el-icon-caret-left" @click="up"></i>
              <span>{{time2}}</span>
              <i class="el-icon-caret-right" @click="down"></i>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple date">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="date"
                @change="s1"
                format="yyyy - MM - dd "
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple-light">
            <i class="el-icon-question"></i>
          </div>
        </el-col>
      </el-row>
    </div>



    <div v-for="(item,index) in data1">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <el-row>
              <el-col :span="1">
                <div class="grid-content bg-purple">
                  <div class="circle">今日</div>
                </div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content bg-purple-light">
                  <span style="font-weight: bold">{{item.userName}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <!--<span>2018-<span style="color: #5f9824">04-19</span>(周四)</span>-->
                  <span>{{item.reportDate}}</span>
                </div>
              </el-col>
              <el-col :span="15">
                <div class="grid-content bg-purple-light bar-right">
                  <span v-text="state" :plain="true" class="btn" @click="evaluation"></span>
                  <!--<rounter-link :to="this.state='待考评'?'/report_1':''"></rounter-link>-->
                  <i class="el-icon-upload2"></i>
                </div>
              </el-col>
            </el-row>
          </template>
          <ul>
            <li class="li">
              <el-row>
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <img class="img" src="../../static/img/aa_03.png">
                  </div>
                </el-col>
                <el-col :span="22">
                  <div class="grid-content bg-purple-light">
                    <p class="name">今日工作记录</p>
                    <!--v-text="text(index)-->
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <p class="matter">{{item.todaysWorkRecord}}</p>
                  </div>
                </el-col>
              </el-row>
            </li>

            <li class="li">
              <el-row>
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <img class="img" src="../../static/img/aa_03.png">
                  </div>
                </el-col>
                <el-col :span="22">
                  <div class="grid-content bg-purple-light">
                    <p class="name">需协调事项</p>
                    <!--v-text="text(index)-->
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <p class="matter">{{item.coordination}}</p>
                  </div>
                </el-col>
              </el-row>
            </li>

            <li class="li">
              <el-row>
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <img class="img" src="../../static/img/aa_03.png">
                  </div>
                </el-col>
                <el-col :span="22">
                  <div class="grid-content bg-purple-light">
                    <p class="name">其他情况反馈</p>
                    <!--v-text="text(index)-->
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <p class="matter">{{item.otherCases}}</p>
                  </div>
                </el-col>
              </el-row>
            </li>

            <li class="li">
              <el-row>
                <el-col :span="1">
                  <div class="grid-content bg-purple">
                    <img class="img" src="../../static/img/aa_03.png">
                  </div>
                </el-col>
                <el-col :span="22">
                  <div class="grid-content bg-purple-light">
                    <p class="name">明日计划</p>
                    <!--v-text="text(index)-->
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <p class="matter">{{item.tmorrowPlan}}</p>
                  </div>
                </el-col>
              </el-row>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        // list:[
        //   {name:'今日工作记录',matter:"我今57275",src:'../../static/img/aa_03.png'},
        //   {name:'需协调事项',matter:"我27373",src:'../../static/img/aa_03.png'},
        //   {name:'其他情况反映',matter:"57777",src:'../../static/img/aa_03.png'},
        //   {name:'明日计划',matter:"我2737",src:'../../static/img/aa_03.png'},
        // ],
        options: [],
        value1: '',
        userId: '',//下拉选择人员id
        time:'',
        time2:'',
        state:'考评',
        review:'',
        data1:[]
      }
    },
    created(){
      this.getList()
    },
    mounted() {
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
      if (month<10){
        month='0'+month
      }
      if (day<10){
        day='0'+day
      }
      this.time=year+"-"+month+"-"+day+"<i>"+" (周"+week2+")"+"</i>"
      this.time2=year+"-"+month+"-"+day

    },
    methods:{
      down(){
        this.addDate(this.time2,+1,0)
      },
      up(){
        this.addDate(this.time2,-1,0)
        var url = 'http://192.168.1.137:8085/springboot/selectTeamDaily'
        this.$http.post(url,
          {
            uid:this.userId,
            Date:this.time2
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.data1=res.body.data
            this.options=res.body.data
            console.log(res)
          })
          .catch(err=>{

          })
      },
      addDate(date,davs,month){
        var d=new Date(date);
        d.setDate(d.getDate()+davs)
        d.setMonth(d.getMonth()+month)
        var m=(d.getMonth()+1)
        var da=d.getDate()
        if (m<10){
          m='0'+m
        }
        if (da<10){
          da='0'+da
        }
        // this.time2=d.getFullYear()+'-'+m+'-'+d.getDate()
        this.time2=d.getFullYear()+'-'+m+'-'+da
      },
      s1(){
        this.time2=this.value1;
      },
      evaluation(){
        if (this.state=="考评"){
          this.state="待考评"
        }else{
          this.$router.push("/guanli")
        }
      },
      select(){
        // var url = 'http://192.168.1.121:8085/selectTeamDaily';
        // this.$http.post(url,
        //   {
        //     id:this.userId,
        //     Date:this.time2
        //   },
        //   {
        //     emulateJSON:true
        //   })
        //   .then(res=>{
        //   this.data2=res.body.data
        //     console.log(res)
        //   })
        //   .catch(err=>{
        //   console.log(err)
        //   })
      },
      getList(){
        var url = 'http://192.168.1.137:8085/springboot/selectTeamDaily'
        this.$http.post(url,
          {
            uid:'',
            Date:''
          },
          {
            emulateJSON:true
          })
          .then(res=>{
            this.data1=res.body.data
            this.options=res.body.data
            console.log(res)
          })
          .catch(err=>{

          })
        this.data1.map(function (item){
          item.src='../../static/img/aa_03.png'
        })
      },



    }
  }
</script>
<style scoped="scoped">
  .box{
    width: 84%;
  }
  .header{
    height: 50px;
    line-height: 50px;
    background-color: white;
  }
  .el-icon-question{
    vertical-align: middle;
    margin-left: 40px;
  }
  .select-date{
    text-align: center;
  }
  .fon{
    text-align: center;margin-top: 15px
  }
  .circle{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background-color: #e37e1e;
    text-align: center;
    font-size: 15px;
    color: white;
  }
  .btn{
    border: none;
    background: none;
    outline:none;
  }
  .bar-right{
    text-align: right;
  }
  .el-icon-upload2,.el-icon-question{
    color: #5e9ffc;
    font-weight: bold;
    font-size: 20px;
  }
  ul{
    list-style: none;
  }
  /*.li{*/
  /*height: 50px;*/
  /*}*/
  .img{
    width: 20px;
    height: 20px;
    margin-left: 35px;
    display: inline-block;
    vertical-align: middle;
  }
  .matter .name{
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
  .name{
    margin-left: 20px;
    font-weight: bold;
  }
  .matter{
    margin-left: 75px;
  }
  .el-icon-caret-left,.el-icon-caret-right{
    font-size: 20px;
    color: #5e9ffc;
  }


</style>
