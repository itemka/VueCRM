<template>
  <div class="app-main-layout">
    <Nav />
    <Sidenav />
    <main class="app-content">
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
  name: 'MainLayout',
  components: {
    Nav,
    Sidenav,
    BottomButton
  }
}
</script>
