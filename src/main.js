// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Resource from 'vue-resource'
//孙国盛
import './style/css/base.css';

Vue.use(ElementUI);
Vue.use(Resource);

Vue.use(MuseUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },

  template: '<App/>'
})
