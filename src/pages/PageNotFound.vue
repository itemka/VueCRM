<template>
  <div class="container-not-found">404</div>
</template>

<script>
export default {
  name: 'PageNotFound',
  metaInfo() {
    return {
      title: this.$getMetaTitle('Title_PageNotFound')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  widows: 100vw;
  height: 100vh;
  font-size: 5rem;
  color: white;
}
</style>
