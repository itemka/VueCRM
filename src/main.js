import Vue from 'vue'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import App from '@/App.vue'
import Loader from '@/components/Loader.vue'
import router from '@/router'
import store from '@/store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import { FIREBASE_KEY_NAMES } from '@/utils/constants'
import { getEnvVariables } from '@/utils/helper'
import 'firebase/auth'
import 'firebase/database'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

if (!firebase.apps.length) {
  firebase.initializeApp({ ...getEnvVariables(process.env, FIREBASE_KEY_NAMES) })
  console.log('%c Firebase connected - done! ', 'background: green; color: #fffff');
} else {
  console.log('%c Firebase connected - already has done!!! ', 'background: green; color: #fffff');
}

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
