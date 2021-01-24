<template>
  <div>
    <div class="page-title">
      <h3>Record history</h3>
    </div>
    <div class="history-chart">
      <canvas></canvas>
    </div>
    <section>
      <Loader v-if="loading" />
      <p
        v-else-if="!records.length"
        class="center"
      >
        Records are empty <router-link to="/record">Add new record</router-link>
      </p>
      <HistoryTable v-else :records="records" />
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HistoryTable from '@/components/HistoryTable.vue'

export default {
  name: 'History',
  data: () => ({
    loading: true,
    categories: [],
    records: []
  }),
  components: {
    HistoryTable
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchRecords'])
  },
  async mounted() {
    try {
      this.categories = await this.fetchCategories()
      this.records = (await this.fetchRecords()).map(record => ({
        ...record,
        categoryName: this.categories.find(({ id }) => id === record.categoryId).title,
        ...(record.type === 'income'
          ? { typeClass: 'green', typeText: 'Income' }
          : { typeClass: 'red', typeText: 'Outcome' }
        )
      }))

      this.loading = false
    } catch (error) {}
  }
}
</script>
