import firebase from 'firebase/app'

export default {
  state: {
    uid: null
  },
  mutations: {
    setCurrentUserId(state, uid) {
      return state.uid = uid
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async logout({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('clearInfo')
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async getUserId({ commit }) {
      try {
        const { uid = null } = await firebase.auth().currentUser

        commit('setCurrentUserId', uid)

        return uid
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)

        const uid = await dispatch('getUserId')

        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 1000,
          name
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    getUid: state => state.uid
  }
}
