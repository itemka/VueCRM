import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId')

        const { key = '' } = await firebase.database().ref(`/users/${uid}/categories`).push({
          title,
          limit
        })

        return {
          title,
          limit,
          id: key
        }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
