<template>
  <div class="fixed-action-btn">
    <router-link
      to="/record"
      v-tooltip="tooltipMessage"
      class="btn-floating btn-large blue"
      :key="tooltipMessage"
    >
      <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  computed: {
    tooltipMessage() {
      return localizeFilter('Message_CreateNewRecord')
    }
  }
}
</script>
