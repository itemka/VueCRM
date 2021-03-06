import firebase from 'firebase/app'

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
    async fetchInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const info = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value'))
          .val() || {}

        commit('setInfo', info)
      } catch (error) {
        commit('setError')
        throw error
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUserId')
        const updatedData = { ...getters.info, ...toUpdate }

        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updatedData)

        commit('setInfo', updatedData)
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
