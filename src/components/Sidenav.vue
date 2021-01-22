<template>
  <ul class="sidenav app-sidenav open sidebar">
    <li v-for="(link, i) in sidenav" :key="i">
      <router-link :to="link.path" class="waves-effect waves-orange pointer active">
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Sidenav',
  data: () => ({
    sidenav: [
      { path: '/', title: 'Account' },
      { path: '/history', title: 'History' },
      { path: '/planning', title: 'Planning' },
      { path: '/record', title: 'New Record' },
      { path: '/categories', title: 'Categories' },
    ]
  })
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: rgba(221, 221, 221, 0.315);
  transform: translate(0%);
}
</style>
