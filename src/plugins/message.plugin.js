import M from 'materialize-css'
import localizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$message = function(value) {
      M.toast({ html: localizeFilter(value) })
    }

    Vue.prototype.$error = function(value) {
      M.toast({
        html: `[Error]: ${
          value.includes('ServerCodeMessage_')
            ? localizeFilter(value)
            : value
        }`
      })
    }
  }
}
