<template>
  <div class="fixed-action-btn">
    <router-link
      to="/record"
      v-tooltip="'Message_CreateNewRecord'"
      class="btn-floating btn-large blue"
      :key="locale"
    >
      <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    locale() {
      return this.$store.getters.info.locale
    }
  }
}
</script>
