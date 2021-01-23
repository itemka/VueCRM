import { connectToFirebase } from '@/utils/helper'

const firebase = connectToFirebase(process.env)

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ commit }) {
      try {
        const info = await firebase.fetchUsedInfo()

        commit('setInfo', info)
      } catch (error) {
        commit('setError')
        throw error
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
