import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 引入全局主题样式
import './components/DecorationBuilder/styles/main.css'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
