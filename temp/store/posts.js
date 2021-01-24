export default {
  state: {
    posts: [],
    helloText: ''
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, newPost) {
      state.posts = [newPost, ...state.posts]
    },
    updateHelloText(state, text) {
      state.helloText = text
    }
  },
  actions: {
    async fetchPosts({ commit, dispatch }, limit = 3) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      const posts = await res.json()

      commit('updatePosts', posts)
      dispatch('sayHello', 'Hi!')
    },
    sayHello({ commit }, text) {
      commit('updateHelloText', text)
    }
  },
  getters: {
    validPosts: (state) => state.posts.filter(({ title, body }) => title && body),
    allPosts: (state) => state.posts,
    postsCount: (state, getters) => getters.validPosts.length,
    helloText: (state) => state.helloText
  }
}
