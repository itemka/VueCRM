<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_Account' | localize }}</h3>
      <button
        class="btn waves-effect waves-light btn-small"
        v-on:click.prevent="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrency from '@/components/HomeCurrency.vue'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$getMetaTitle('Menu_Account')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    try {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    } catch (error) {}
  },
  methods: {
    async refresh() {
      try {
        this.loading = true
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
      } catch (error) {}
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
