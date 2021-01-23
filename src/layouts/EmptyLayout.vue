<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import messages from '@/utils/messages'

export default {
  name: 'empty-layout',
  computed: {
    ...mapGetters(['getError'])
  },
  watch: {
    getError(firebaseError) {
      const { code = '', message = 'Something wrong' } = firebaseError;
      this.$error(messages[code] || `${code} | ${message}`)
    }
  }
}
</script>
