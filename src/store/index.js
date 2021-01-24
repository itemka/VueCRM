import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import common from './common'
import auth from './auth'
import info from './info'
import category from './category'
import posts from './posts'
import 'es6-promise/auto'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    common,
    auth,
    info,
    category,
    posts
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : [],
})
