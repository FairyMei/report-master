<template>
      <div class="top">
        <div>
        <div class="header"><h3>权限管理：</h3></div>
        <div class="top1">
          <span class="user">用户名：</span>
          <!--<input type="text" v-model="newData1">-->
          <el-select v-model="newData1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>


          <span class="power">权限:</span>
          <!--<input type="text" v-model="newData2">-->


          <el-select v-model="newData2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.roleid"
              :label="item.rolename"
              :value="item.roleid">
            </el-option>
          </el-select>

          <button class="btn1" @click="add">添加</button>
        </div>
        <el-table
          style="width: 100%"
          :data="tableData" :show-header="false">
          <el-table-column
            prop="username"
            width="200">
          </el-table-column>
          <el-table-column
            prop="rolename"
            width="200">
          </el-table-column>
          <el-table-column
            prop="number"
            width="200">
          </el-table-column>
          <el-table-column
            prop="createTime"
            width="200">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
          </div>

        <div>
          <div class="header"><h3>日报设置：</h3></div>
          <div class="top1">
            <span class="user">日报字段：</span>
            <!--<input type="text" v-model="newData3">-->
            <el-select v-model="newData3" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <span class="power">月报字段:</span>
            <!--<input type="text" v-model="newData4">-->

            <el-select v-model="newData4" placeholder="请选择">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <button class="btn1" @click="add1">添加</button>
          </div>
          <el-table
            style="width: 80%;z-index: 0"
            :data="list" :show-header="false">
            <el-table-column
              prop="name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="work"
              width="200">
            </el-table-column>
            <el-table-column
              prop="null"
              width="200">
            </el-table-column>
            <el-table-column
              prop="date"
              width="200">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit1(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

       <div id="mark" v-show="show">
        <div class="head">
            <div class="form">
              <span class="left">编辑</span>
              <span class="right" @click="cancel">X</span>
            </div>
          <div class="ipt">
          用户名:<input type="text" v-model="alter.name" placeholder="请输入用户名" class="inp" disabled><br>
          <!--权限: <input type="text" v-model="alter.work" placeholder="请输入权限"  class="inp"><br>-->
            权限：<el-select v-model="alter.work" placeholder="请选择">
            <el-option
              v-for="ite in options2"
              :key="ite.roleid"
              :label="ite.rolename"
              :value="ite.roleid">
            </el-option>
          </el-select>
            <br>
          日期: <input type="text" v-model="alter.date" placeholder="请输入日期"  class="inp" disabled><br>
            <el-button type="primary" @click="update">更新</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
            </div>
        </div>
         </div>

        <div id="mark" v-show="showbox">
          <div class="head">
            <div class="form">
              <span class="left">编辑</span>
              <span class="right" @click="cancel">X</span>
            </div>
            <div class="ipt">
              <!--模块内容:<input type="text" v-model="alter1.name" placeholder="请输入日报模块" class="inp" disabled><br>-->
              模块内容：<el-select v-model="alter1.name" placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              <br>
              工作内容: <input type="text" v-model="alter1.work" placeholder="请输入工作内容"  class="inp"><br>
              填写类型： <el-select v-model="newData5" placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              <br>
              日期: <input type="text" v-model="alter1.date" placeholder="请输入日期"  class="inp" disabled><br>
              <el-button type="primary" @click="update1">更新</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
        </div>

</template>

<script>
    export default {
        name: "guanli",
      data() {
        return {
          tableData: [
            // {name: '王小虎', date: '2016-05-02', number:1, admin:"管理员",flag:'1'},
            // {name: '王小虎', date: '2016-05-04', number:1, admin:"管理员",flag:'2'},
            // {name: '王小虎', date: '2016-05-01', number:1, admin:"管理员",flag:'3'},
            // {name: '王小虎', date: '2016-05-03', admin:"管理员", number:1,flag:'4'}
          ],
          list:[
            {name:"日报模板",work:"工作内容",null:"必填", date: '2016-05-02',flag:'1'},
            {name:"日报模板",work:"工作内容",null:"必填", date: '2016-05-02',flag:'2'},
            {name:"日报模板",work:"工作内容",null:"必填", date: '2016-05-02',flag:'3'},
          ],
          newData1:"",  //权限管理中用户名
          newData2:"",  //权限管理中的权限
          newData3:"",  //日报设置中日报字段
          newData4:"",  //日报设置中月报字段
          newData5:"",
          alter:{},     //权限管理中弹框中赋值内容
          showbox:false,
          show:false,
          alter1:{},   //日报设置中弹框中赋值内容


          Renewal:[],

          options1: [],

          options2: [],


          options3: [],

          options4: [],
          options5: [
            {
              value: '选项1',
              label: '必填'
            }, {
              value: '选项2',
              label: '非必填'
            }
          ],
          value: ''

        }
      },

      created(){
        this.getList()
      },
      methods: {
          //第一个弹框修改按钮
        handleEdit(index, row) {
          // console.log(index, row);
          // console.log(row.name)
          this.show=true  //第一个弹框显示

          //第一个修改界面输入框赋值
          this.alter= {
            name:row.username,
            work:row.roleid,
            date:row.createTime,
            fid:row.id,
            foId:row.userInfoId

        }
        },
        //第二个弹框修改按钮
        handleEdit1(index, row) {
          // console.log(index, row);
          // console.log(row)
          this.showbox=true;  //第二个弹框显示

          // 第二个修改页面输入框赋值
          this.alter1= {
            name:row.name,
            work:row.work,
            date:row.date,
            flag:row.flag
        }

        },
        //第一个删除功能
        handleDelete(index, row) {
          // this.tableData.splice(index,1)
          console.log(row)
          var url = 'http://192.168.1.137:8085/springboot/reportConf/deletePower';
          this.$http.post(url,
            {
                id:row.id,
            },
            {
              emulateJSON:true
            })
            .then(res=>{
              this.tableData=res.body.data
              console.log(res.body)
            })
            .catch(err=>{

            })
        },
        //第二个删除功能
        handleDelete1(index, row) {
          // this.list.splice(index,1);
          var url = '';
          this.$http.get(url,
            {
              id:row.id,
            },
            {
              emulateJSON:true
            })
            .then(res=>{

              this.tableData=res.body.data
            })
            .catch(err=>{

            })
        },
        // 添加功能
        add(){

          // console.log(this.newData1)
          // console.log(this.newData2)
              if (this.newData1&&this.newData2=='请选择'){

                this.$message({
                  message: '输入不能为空',
                  type: 'warning'
                });

              }else {
                var url = 'http://192.168.1.137:8085/springboot/reportConf/addPower';
                this.$http.post(url,
                  {
                    userInfoId:this.newData2,
                    roleid:this.newData1
                  },
                  {
                    emulateJSON:true
                  })
                  .then(res=>{
                    if (res.body.msg=='该人员已经赋予次权限'){
                      this.$message({
                        message: '该人员已经赋予次权限,无法操作！',
                        type: 'warning'
                      });
                      this.newData1 = ""
                      this.newData2 = ""
                    }else {
                      this.tableData=res.body.data
                      this.newData1 = ""
                      this.newData2 = ""
                    }

                  })
                  .catch(err=>{
                    console.log(err)
                  })
              }

        },
        add1(){
          if (this.newData3!=''&&this.newData4=='') {
            this.list.push({name: this.newData3, work: "工作内容", null: "必填", date: '2016-05-02'})
            this.newData3 = ""
          }
          else{
            alert('输入错误，请重新输入！')
          }
          if(this.newData4!=0&&this.newData3==0){
            this.list.push({name:this.newData4,work:"工作内容",null:"必填",date:"2016-05-02"})
            this.newData4 = ""
          }
          else {
            alert('输入错误，请重新输入！')
          }


        },

        //点击取消隐藏输入框
        cancel(){
          this.showbox=false;
          this.show=false;
        },
        // 第一个更新按钮
        update(){

          var url = 'http://192.168.1.137:8085/springboot/reportConf/updatePower';
          this.$http.post(url,
            {
              userInfoId:this.alter.foId,
              roleid:this.alter.work,
              id:this.alter.fid
            },
            {
              emulateJSON:true
            })
            .then(res=>{
              // this.Renewal=res.body.data
              // var _this=this
              // this.tableData.map(function (ite){
              //   if (ite.flag==_this.alter.flag){
              //     ite.username = _this.alter.name;
              //     ite.rolename = _this.alter.work;
              //     ite.createTime = _this.alter.date;
              //   }
              // })
              this.tableData=res.body.data
              this.show=false;
              alert(1)

            })
            .catch(err=>{

            })




        },
        //第二个更新按钮
        update1(){
          var _this=this
          // console.log(this.alter1)
          this.list.map(function (item) {
            if (item.flag==_this.alter1.flag){
                item.name = _this.alter1.name
              item.work = _this.alter1.work
              item.date = _this.alter1.date
            }
          })
          // console.log(this.list)
          this.showbox=false;
        },
        //页面已加载渲染数据
        getList(){
          var url = 'http://192.168.1.137:8085/springboot/reportConf/selectUserAndRole';
          this.$http.post(url, {},
            {
              emulateJSON:true
            })
            .then(res=>{
              this.options1=res.body.data.userList
              this.options2=res.body.data.roleList
              this.tableData=res.body.data.powerList
              console.log(res)
            })
            .catch(err=>{

            })
        },
        // dailyList(){
        //   var url = '';
        //   this.$http.post(url, {
        //
        //     },
        //     {
        //       emulateJSON:true
        //     })
        //     .then(res=>{
        //       this.options3=res.body.data.userList
        //       this.options4=res.body.data.roleList
        //       this.list=res.body.data.powerList
        //       console.log(res)
        //     })
        //     .catch(err=>{
        //
        //     })
        // }
      }
    }
</script>

<style scoped>
.top{
  text-align: left;
  width:80%;
  margin-top: 30px;
}
.header{
  color: #616d82;
  margin-top: 30px;
}
  input{
    margin-left: 50px;
    width: 200px;
    border-radius: 10px;
  }
  .btn1{
    background-color: #4d77e0;
    border: none;
    width: 80px;
    color: #ffffff;
    font-weight: bold;
    border-radius: 5px;
    margin-left: 40px;
    /*width: 10%;*/
  }
  .power{
    margin-left: 60px;
  }
  .top1{
    margin-top: 40px;
  }
.cell{
  font-weight: bold !important;
}
.head{
  width: 400px;
  height: 350px;
  border: 1px solid #CCCCCC;
  position: fixed;
  left: 40%;
  top: 20%;
  background: rgba(255,255,255,1);
  z-index: 200;
}
.form{
  width: 400px;
  height: 40px;
  line-height: 40px;
}
  .left{
    float: left;
    margin-left: 30px;
    /*font-size: 20px;*/
  }
  .right{
    float: right;
    margin-right: 30px;
  }
  .ipt{
    clear: both;
  }
  .inp{
    margin-top: 20px;
  }
#mark{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}
  .el-table--fit{
    margin-top: 30px;
  }
</style>
