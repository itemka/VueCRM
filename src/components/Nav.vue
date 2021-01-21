<template>
  <section>
    <div v-if="links.length === 0">
      Nav list is empty
    </div>
    <nav id="nav" v-else>
      <router-link
        v-for="(link, i) in links"
        :key="i"
        :to="link.url"
      >
        {{ link.name }}
      </router-link>
      <router-view />
    </nav>
  </section>
</template>

<script>
export default {
  name: 'Nav',
  data: () => ({
    links: [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' }
    ]
  })
}
</script>