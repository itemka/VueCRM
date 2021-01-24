export default {
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
  actions: {
    async fetchCurrency({ commit }) {
      try {
        const currency = await fetch(`${
          process.env.VUE_APP_PROXY_URL
        }http://data.fixer.io/api/latest?access_key=${
          process.env.VUE_APP_FIXER_ACCESS_KEY
        }&symbols=USD,EUR,BYN`)
        
        return await currency.json()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    getError: state => state.error
  },
}
