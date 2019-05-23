import Vue from 'vue'
import App from './App'
import './weui.css'
//import 'magic.css/magic.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
