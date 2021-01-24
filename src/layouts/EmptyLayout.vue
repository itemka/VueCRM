<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MESSAGES } from '@/utils/constants'

export default {
  name: 'empty-layout',
  computed: {
    ...mapGetters(['getError'])
  },
  watch: {
    getError(firebaseError) {
      const { code = '', message = 'Something wrong' } = firebaseError;
      
      this.$error(MESSAGES[code] || `${code} | ${message}`)
    }
  }
}
</script>
