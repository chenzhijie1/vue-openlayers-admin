import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from './router/index'
// 引入vuex
import store from './store/index'

// 引入全局css文件
import "@/assets/css/base.css"
import "@/assets/css/map_ol.css"

// 引入elementuiui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false


// 订阅模式进行非父子组件数据传值
// var  bus = new Vue()
// export default bus

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
