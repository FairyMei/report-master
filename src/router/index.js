import Vue from 'vue'
import Router from 'vue-router'
import report_1 from '@/components/myreport'
import report_2 from '@/components/report2'
import write_report from '@/components/write_report'
import evaluation_1 from '@/components/evaluation_1'
import evaluation_2 from '@/components/evaluation_2'
import guanli from '@/components/guanli'
import App from '@/App'
//    我的绩效---月报页面
import monthly from '../pages/PersonalEvaluation/monthly'
import b from '../components/common/sidebar'

// 日报设置
import  votes from '../components/votes'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: report_1
    },
    {path:"/report_1",component:report_1},
    {path:"/report_2",component:report_2},
    {path:"/App",component:App},
    {path:"/write_report/:id",component:write_report},
    {path:"/evaluation_1",component:evaluation_1},
    {path:"/evaluation_2",component:evaluation_2},
//    我的绩效---月报页面
    {path:"/monthly",component:monthly},
//    详情页
    {path:"/b",component:b},
    //sunguosheng
    {path:"/guanli",component:guanli},
//    刘峰
    {path:"/votes",component:votes},
//  {path:"/tab3",component:tab3},
//  {path:"/tab4",component:tab4},
  ]
})
