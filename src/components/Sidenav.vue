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
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'Sidenav',
  props: ['value'],
  data: () => ({
    sidenav: [
      { path: '/', title: localizeFilter('Menu_Account'), exact: true },
      { path: '/history', title: localizeFilter('Menu_History') },
      { path: '/planning', title: localizeFilter('Menu_Planning') },
      { path: '/record', title: localizeFilter('Menu_NewRecord') },
      { path: '/categories', title: localizeFilter('Menu_Categories') },
    ]
  })
}
</script>
