import FirebaseClient from './firebase'
import { FIREBASE_KEY_NAMES } from './constants'

const getEnvVariables = (envVariables, keyNames = {}) => {
  if (!envVariables) {
    return {}
  }

  return Object.entries(keyNames).reduce((acc, [key, value]) => {
    acc[key] = envVariables[value]
    
    return acc
  }, {})
}

export const connectToFirebase = (envVariables) => new FirebaseClient({
  ...getEnvVariables(envVariables, FIREBASE_KEY_NAMES)
})
