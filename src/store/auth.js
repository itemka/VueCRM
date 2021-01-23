import { connectToFirebase } from '@/utils/helper'

const firebase = connectToFirebase(process.env)

export default {
  state: {
    
  },
  mutations: {

  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.login({ email, password })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async logout({ commit }) {
      try {
        await firebase.logout()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async register({ commit }, { email, password, name }) {
      try {        
        await firebase.register({ email, password, name })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {

  }
}
