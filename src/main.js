import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import Loader from '@/components/Loader.vue'
import router from '@/router'
import store from '@/store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import { connectToFirebase } from '@/utils/helper'
import 'materialize-css/dist/js/materialize.min'

const firebase = connectToFirebase(process.env)
let app

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.auth(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
