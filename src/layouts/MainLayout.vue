<template>
  <div class="app-main-layout">
    <Nav v-on:click-navbar-menu="handleClickNavbarMenu" />
    <Sidenav v-model="isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <BottomButton />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Sidenav from '../components/Sidenav.vue'
import BottomButton from '../components/BottomButton.vue'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),
  methods: {
    handleClickNavbarMenu() {
      this.isOpen = !this.isOpen
      console.log(this.isOpen)
    }
  },
  components: {
    Nav,
    Sidenav,
    BottomButton
  }
}
</script>
