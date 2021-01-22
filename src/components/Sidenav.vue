<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      tag="li"
      v-for="(link, i) in sidenav" :key="i"
      :to="link.path"
      active-class="active"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer active">
        {{ link.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidenav',
  props: ['value'],
  data: () => ({
    sidenav: [
      { path: '/', title: 'Account', exact: true },
      { path: '/history', title: 'History' },
      { path: '/planning', title: 'Planning' },
      { path: '/record', title: 'New Record' },
      { path: '/categories', title: 'Categories' },
    ]
  })
}
</script>

<style lang="scss" scoped>
</style>
