import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

export const FIREBASE_KEY_NAMES = {
  apiKey: 'VUE_APP_FIREBASE_API_KEY',
  authDomain: 'VUE_APP_FIREBASE_AUTH_DOMAIN',
  projectId: 'VUE_APP_FIREBASE_PROJECT_ID',
  storageBucket: 'VUE_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VUE_APP_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VUE_APP_FIREBASE_APP_ID',
}

export const MESSAGES = {
  'logout': 'ServerCodeMessage_YouAreLoggedOut',
  'login': 'ServerCodeMessage_FirstSignIn',
  'auth/user-not-found': 'ServerCodeMessage_UserNotFound',
  'auth/wrong-password': 'ServerCodeMessage_InvalidPassword',
  'auth/email-already-in-use': 'ServerCodeMessage_EmailAlreadyInUse'
}

export const LOCALES = {
  'en-US': en,
  'ru-RU': ru
}
