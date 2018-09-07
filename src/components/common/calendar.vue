<template>
  <div>
    <!--日期-->
    <div class="block">
      <i class="el-icon-caret-left" @click="monthDown"></i>
      <i class="el-icon-caret-left" @click="down"></i>
      <p class="time">{{time}}</p>
      <i class="el-icon-caret-right" @click="up"></i>
      <i class="el-icon-caret-right" @click="monthUp"></i>
      <el-button type="primary">日报统计</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "calendar",
    data(){
      return{
        time:''
      }
    },
    methods:{
      handleClick(row) {
        console.log(row);
      },
      up(){
        this.addDate(this.time,+1,0)
      },
      down(){
        this.addDate(this.time,-1,0)
      },
      monthUp(){
        this.addDate(this.time,0,1)
      },
      monthDown(){
        this.addDate(this.time,0,-1)
      },
      addDate(date,days,month){
        var d=new Date(date);
        d.setDate(d.getDate()+days);
        d.setMonth(d.getMonth()+month);
        var m=(d.getMonth()+1);
        this.time=d.getFullYear()+'-'+m+'-'+d.getDate()
      }
    },
    created(){

      var time=new Date()
      var year=time.getFullYear()
      var month=time.getMonth()+1
      var day=time.getDate()
      this.time=year+"-"+month+"-"+day

    }
  }
</script>

<style scoped>
  .block{
    float: right;
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
</style>
