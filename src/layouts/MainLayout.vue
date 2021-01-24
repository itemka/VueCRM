<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Nav v-on:click-navbar-menu="handleClickNavbarMenu" />
      <Sidenav v-model="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <BottomButton />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '@/components/Nav.vue'
import Sidenav from '@/components/Sidenav.vue'
import BottomButton from '@/components/BottomButton.vue'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    try {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      this.loading = false
    } catch (error) {}
  },
  methods: {
    handleClickNavbarMenu() {
      this.isOpen = !this.isOpen
    }
  },
  computed: {
    ...mapGetters(['getError'])
  },
  watch: {
    getError(firebaseError) {
      const { code = '', message = 'Something wrong' } = firebaseError;

      this.$error(messages[code] || `${code} | ${message}`)
    }
  },
  components: {
    Nav,
    Sidenav,
    BottomButton
  }
}
</script>
