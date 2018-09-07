<template>
  <div id="left_page">
    <div id="box">
      <ul>

        <li v-for="(parent,i) in obj"  ref="myli" style="z-index: 10;background: #3A4357;">
          <div style="width: 100%;height: 57px;" @click="close(i)">
            <div class="l"><img v-bind:src="parent.img"/></div><p class="m" >{{parent.name}}</p><div class="r"><img ref="myimg" src="./assets/aa_06.png"/></div>
          </div>
          <ul class="ul2" style="opacity: 0;display: none;" ref="myul2">
            <li v-for="(iteam,index) in parent.child" @click="checked(i,index)">
              <router-link :to="iteam.path">
                <div class="l2" style="width: 11px;">
                  <img :src="iteam.childimg" ref="checked_img"/>
                </div>
                <p :class="i==0&&index===0?'m3':'m2'"  ref="myli2" v-if="iteam.path!=''">{{iteam.childname}}</p>
                <p :class="i==0&&index===0?'m3':'m2'"  ref="myli2" v-if="iteam.path==''"  @click="modal">{{iteam.childname}}</p>
              </router-link>
            </li>
            <div style="clear: both;"></div>

          </ul>
        </li>
      </ul>
      <!--<div class="modal">

            </div>-->
    </div>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {

        obj:[
          {"name":'报告','img':'../../static/aa_03.png',
            "child":[
              {"childname":"我的报告",'childimg':"../../static/aa_11.png","path":'/report_1'},
              {"childname":"团队报告",'childimg':"../../static/aa_14.png","path":'/report_2'},
              {"childname":"同事报告",'childimg':"../../static/aa_14.png","path":'/report_3'},
              {"childname":"模板设置",'childimg':"../../static/aa_14.png","path":'/report_4'},
            ]
          },
          {"name":'考评','img':'../../static/aa_16.png',
            "child":[
              {"childname":"我的绩效",'childimg':"../../static/aa_14.png","path":'/evaluation_1'},
              {"childname":"团队绩效",'childimg':"../../static/aa_14.png","path":'/evaluation_2'},
              {"childname":"我考评的",'childimg':"../../static/aa_14.png","path":''},

            ]},
          {"name":'任务','img':'../../static/aa_18.png',
            "child":[
              {"childname":"我的报告",'childimg':"../../static/aa_14.png","path":'/task_1'},
              {"childname":"团队报告",'childimg':"../../static/aa_14.png","path":'/task_2'},
              {"childname":"同事报告",'childimg':"../../static/aa_14.png","path":'/task_3'},

            ]},
          {"name":'设置','img':'../../static/aa_20.png',
            "child":[
              {"childname":"我的报告",'childimg':"../../static/aa_14.png","path":'set_1'},
              {"childname":"团队报告",'childimg':"../../static/aa_14.png","path":'set_1'},
              {"childname":"同事报告",'childimg':"../../static/aa_14.png","path":'set_1'},

            ]},
          {"name":'日报统计','img':'../../static/aa_20.png',
            "child":[
              {"childname":"我的日报",'childimg':"../../static/aa_14.png","path":'votes'}
            ]},
        //  sunguosheng
          {"name":'日报管理系统','img':'../../static/aa_20.png',
            "child":[
              {"childname":"日报管理系统",'childimg':"../../static/aa_14.png","path":'guanli'},
            ]}



        ],
        status:{
          'status':'close',
          'index':99
        },
        bool:false,
        check:{
          'i1':0,
          'i2':0
        }
      }
    },
    methods:{
      modal(){
        this.bool=true
        this.$emit('bool',this.bool)
      },
      checked(i1,i2){
        if(i1==this.check.i1&&i2==this.check.i2){
        }else{
          var ul=document.getElementsByClassName('ul2')
          ul[i1].children[i2].children[0].children[0].children[0].src="../../static/aa_11.png"
          ul[i1].children[i2].children[0].children[1].style.color="#5e9ffc"
          ul[this.check.i1].children[this.check.i2].children[0].children[0].children[0].src="../../static/aa_14.png"
          ul[this.check.i1].children[this.check.i2].children[0].children[1].style.color="#c1cad7"
          this.check.i1=i1
          this.check.i2=i2
        }
      },
      set_open(i){

        this.status.status='open'
        this.status.index=i
        setTimeout(()=>{
          this.$refs.myul2[i].style.display="block"
        },250)
        this.$refs.myul2[i].style.opacity="1"
        this.$refs.myimg[i].style.transform="rotate(180deg)"
        for(let j in this.obj){
          if(j>i){
            this.$refs.myli[j].style.transform="translate(0,"+this.obj[i].child.length*57+"px)"
          }
        }
      },
      set_close(i){
        this.status.status='close'
        this.$refs.myul2[i].style.opacity="0"
        setTimeout(()=>{
          this.$refs.myul2[i].style.display="none"
        },470)
        this.$refs.myimg[i].style.transform="rotate(0deg)"
        for(let j in this.obj){
          if(j>i){
            this.$refs.myli[j].style.transform="translate(0,0)"
          }
        }
      },
      close(i){
        if(this.status.status=='close'){
          this.set_open(i)
        }else if(this.status.status=='open'&&(this.status.index==i||this.status.index==99)){
          this.set_close(i)
        }else if(this.status.status=='open'&&this.status.index!=i){
          this.set_close(this.status.index)
          setTimeout(this.set_open(i),1000)
        }
      }
    }
  }
</script>

<style scoped="scoped">

  .modal{
    width: 500px;
    height: 100%;
    background: white;
    z-index: 99;
  }
  *{transition: all .4s;}
  #box ul li{
    position: relative;
    clear: both;
  }
  .ul2{
    z-index: 9;
    width: 100%;
    clear: both;
    position: absolute;
    z-index: -9;
    transition: opacity .75s;
  }
  .ul2 {
    background: #28313f;

  }
  #left_page{
    height: 99%;
  }
  #box{
    width: 212px;
    height: 100%;
    background: #3A4357;

  }
  #box li{
    list-style: none;
    width: 100%;
    height: 57px;
  }
  .l,.l2{
    padding: 20px 16px 0 18px;
    width: 17px;
    height: 16px;
  }
  .r,.r2{
    width: 14px;
    height: 9px;
    padding-top: 18px;
  }
  .l,.m,.r,.l2,.m2,.r2,.m3{
    float: left;
    color: #c1cad7;
  }
  .m,.m2,.m3{
    width: 130px;
    height: 100%;
    line-height: 57px;
    font-size: 17px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .ul2 .m3{
    color: #5e9ffc;
  }
</style>
