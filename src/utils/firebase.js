import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export default class FirebaseClient {
  constructor(FIREBASE_KEYS) {
    const {
      apiKey = '',
      authDomain = '',
      projectId = '',
      storageBucket = '',
      messagingSenderId = '',
      appId = ''
    } = FIREBASE_KEYS
    
    this.apiKey = apiKey
    this.authDomain = authDomain
    this.projectId = projectId
    this.storageBucket = storageBucket
    this.messagingSenderId = messagingSenderId
    this.appId = appId
    this.initFirebase()
  }

  initFirebase = () => {
    const firebaseConfig = {
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId,
    }

    if (!firebase.apps.length) {
      console.log('%c Firebase connected - done! ', 'background: green; color: #fffff');
      firebase.initializeApp(firebaseConfig)
    } else {
      console.log('%c Firebase connected - already has done!!! ', 'background: green; color: #fffff');
    }
  }

  auth = (callback) => {
    firebase.auth().onAuthStateChanged(callback)
  }

  login = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      throw error
    }
  }

  logout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      throw error
    }
  }

  getUserId = async () => {
    try {
      const user = await firebase.auth().currentUser

      return user ? user.uid : null
    } catch (error) {
      throw error
    }
  }

  register = async ({ email, password, name }) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const uid = await this.getUserId()

      if (uid) {
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 1000,
          name
        })
      } else {
        throw new Error('User id is not found.')
      }
    } catch (error) {
      throw error
    }
  }

  fetchUsedInfo = async () => {
    try {
      const uid = await this.getUserId()
      
      return (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
    } catch (error) {
      throw error
    }
  }
}
