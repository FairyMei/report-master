<template>
  <div id="tab1">
    <div id="box2">
      <div id="header">
        <ul id="nav">
          <li  v-for="(item,i) in nav" :class="i==0? 'blue':''" @click="status(i)" ref='myli'>{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name:'tab1',
    data:function(){
      return {
        state:'提交',
        page:0,
        nav:[
          {'name':'日报','show':"y"},
          {'name':'周报','show':"y"},
          {'name':'月报','show':"y"},
          {'name':'季报','show':"y"},
          {'name':'半年报','show':"y"},
          {'name':'年报','show':"y"}
        ]

      }
    },
    methods:{

      status(i){
        //通过改变page隐藏其它元素
        this.page=i
        //取消之前的样式，切换样式
        for(let j=0;j<6;j++){
          this.$refs.myli[j].className="a"
        }
        this.$refs.myli[i].className="blue"



      }
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


  @media only screen and (max-width:800px ) {
    #text,#circle{display: none;}
    #nav li{padding: 5px;}
    #right{
      width: 100%;
    }}


</style>
