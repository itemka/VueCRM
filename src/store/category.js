import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
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
    },
    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUserId')
        
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({
          title,
          limit
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
