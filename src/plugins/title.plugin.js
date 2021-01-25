import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$getMetaTitle = function(titleKey) {
      return `${localizeFilter(titleKey)} | ${process.env.VUE_APP_TITLE}`
    }
  }
}
