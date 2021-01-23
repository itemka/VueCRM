import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import router from '@/router'
// TODO import store from './store'
import { dateFilter } from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
