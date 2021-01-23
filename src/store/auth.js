import { connectToFirebase } from '@/utils/helper'

const firebase = connectToFirebase(process.env)

export default {
  state: {
    
  },
  mutations: {

  },
  actions: {
    async login(ctx, { email, password }) {
      try {
        console.log("🚀 ~ file: auth.js ~ line 12 ~ login ~ email, password", email, password)
        console.log("🚀 ~ file: auth.js ~ line 12 ~ login ~ ctx", ctx)
        await firebase.signIn({ email, password })
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  getters: {

  }
}
