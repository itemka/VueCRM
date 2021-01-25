import store from '../store'
import { LOCALES } from '../utils/constants'

export default function localizeFilter(key) {
  return LOCALES[store.getters.info.locale || 'en-US'][key] || `[Localize error]: key ${key} not found`
}
