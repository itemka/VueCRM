import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import auth from './auth'
import posts from './posts'
import 'es6-promise/auto'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    getError: state => state.error
  },
  modules: {
    auth,
    posts
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : [],
})
