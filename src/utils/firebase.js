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
      console.log('%c Firebase connected - already has done!! ', 'background: green; color: #fffff');
    }
  }

  auth = (callback) => {
    firebase.auth().onAuthStateChanged(callback)
  }

  signIn = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
