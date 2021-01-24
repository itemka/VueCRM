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
        const proxyurl = 'https://cors-anywhere.herokuapp.com/'
        const url = `${proxyurl}http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER_ACCESS_KEY}&symbols=USD,EUR,BYN`
        const currency = await fetch(url)
        
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
