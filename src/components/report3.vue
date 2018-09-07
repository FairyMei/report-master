<template>
  <div id="tab1">
    <div id="box2">


      <div id="header">
        <ul id="nav">
          <li class="blue">日报</li>
          <li>周报</li>
          <li>月报</li>
          <li>季报</li>
          <li>半年报</li>
          <li>年报</li>
        </ul>
        <p id="text">我的日报</p>
      </div>
      <div id="" class="card">
        <div id="left">
          <div id="circle">今日</div>
        </div>
        <div id="right">
          <div id="time">
            <p id="timeText"></p>
          </div>
          <ul class="bottom">
            <li>
              <div class="img_box"><img src="../../static/img/aa_03.png"/></div>
              <div class="rit">
                <p>今日工作记录</p>
                <div class="btn"><a href="#">请填写今日工作记录</a></div>
              </div>
            </li>
            <li>
              <div class="img_box"><img src="../../static/img/aa_03.png"/></div>
              <div class="rit">
                <p>需协调事项</p>
                <div class="btn"><a href="#">请填写需协调事项</a></div>
              </div>
            </li>
            <li>
              <div class="img_box"><img src="../../static/img/aa_03.png"/></div>
              <div class="rit">
                <p>其它情况反映</p>
                <div class="btn"><a href="#">请填写其它情况反映</a></div>
              </div>
            </li>
            <li>
              <div class="img_box"><img src="../../static/img/aa_03.png"/></div>
              <div class="rit">
                <p>明日计划</p>
                <div class="btn"><a href="#">请填写明日计划</a></div>
              </div>
            </li>
            <li >
              <div class="img_box"><img src="../../static/img/aa_06.png"/></div>
              <div class="rit">
                <p>日报附件</p>
                <div class="btn" ><div id="filesty"><input type="file" id="imageFile" style="width: 100px;height: 100px; opacity: 0; position: relative; top: 0;left: 0;"  /></div></div>


              </div>


            </li>

          </ul>
        </div>

        <div style="clear: both;"></div>
      </div>
      <div id="" class="card">
        2
      </div>
      <div id="" class="card">
        3
      </div>
      <div id="" class="card">
        4
      </div>
      <div id="" class="card">
        5
      </div>
      <div id="" class="card">
        6
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name:'tab1',
    data:function(){
      return {}
    },
    mounted: function() {
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
      document.getElementById('timeText').innerHTML=year+"-"+month+"-"+day+"<i>"+" (周"+week2+")"+"</i>"

      var ul=document.getElementById("nav");
      var card=document.getElementsByClassName("card");
      for(let i=0;i<6;i++){
        ul.children[i].index=i
        if(ul.children[i].index>0){
          card[i].style.display="none"
        }
      }

      ul.addEventListener("click",function(){
        for(let i=0;i<6;i++){
          ul.children[i].className=""
          card[i].style.display="none"

        }
        var idx=window.event.target.index;
        card[idx].style.display="block"
        window.event.target.className="blue"

      })

    }
  }
</script>

<style scoped="scoped">
  #tab1{
    height: 100%;
    width:calc(100% - 212px);
  }
  #box2{
    width:100%;


    z-index: 9;
  }

  #header{
    border-bottom:10px #ededee solid;
    border-top:10px #ededee solid;
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
  #nav li:nth-child(6){
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
  #text{
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
    /*border-top:#df4137 3px solid;*/
    height: 100%;
    background: white;
  }
  #left{
    width: 130px;
    float: left;

  }
  #circle{
    margin: 20px;
    width: 62px;
    height: 62px;
    text-align: center;
    line-height: 62px;
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
  @media only screen and (max-width:800px ) {
    #text,#circle{display: none;}
    #nav li{padding: 5px;}
    #right{
      width: 100%;



    }
  }
  .bottom li{
    width: 100%;
    padding-top: 10px;
  }

  .bottom .img_box{
    float: left;

  }
  .bottom p{

    height: 30px;
    line-height: 30px;
  }
  .bottom .img_box{
    padding: 5px;
    width: 30px;
    height: 90px;
    padding-top: 0;


  }
  img{
    width: 100%;
    height: 30px;
  }
  .btn{
    color:#8ca7d5;
    margin-top: 15px;

  }
  .btn a{
    display: block;
    width: 100%;

  }
  .btn a:hover{
    background: #ededee;
  }
  #filesty{
    margin-left: 40px ;
    background: url(../../static/img/aa_04.png);
    background-size:100% 100%;
    width: 100px;
    height: 100px;
    position: absolute;
  }
</style>
