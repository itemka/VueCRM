<template>
  <div>
    <div class="page-title">
      <h3>Record history</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <section>
      <Loader v-if="loading" />
      <p
        v-else-if="!records.length"
        class="center"
      >
        Records are empty <router-link to="/record">Add new record</router-link>
      </p>
      <HistoryTable v-else :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="handlePageChange"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Pie } from 'vue-chartjs'
import HistoryTable from '@/components/HistoryTable.vue'
import paginationMixin from '@/mixins/pagination.mixin'
import { getRandomColors } from '@/utils/helper'

export default {
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  components: {
    HistoryTable
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchRecords']),
    setup(categories) {
      this.setupPagination(
        this.records.map(record => ({
          ...record,
          categoryName: categories.find(({ id }) => id === record.categoryId).title,
          ...(record.type === 'income'
            ? { typeClass: 'green', typeText: 'Income' }
            : { typeClass: 'red', typeText: 'Outcome' }
          )
        }))
      )

      const { backgroundColor = [], borderColor = [] } = getRandomColors(categories)

      this.renderChart({
        labels: categories.map(({ title }) => title),
        datasets: [{
          label: 'Costs by category',
          data: categories.map(category => {
            return this.records.reduce((acc, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                acc += +record.amount
              }

              return acc
            }, 0)
          }),
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      }, {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      })
    }
  },
  async mounted() {
    try {
      const categories = await this.fetchCategories()
      this.records = await this.fetchRecords()

      this.setup(categories)

      this.loading = false
    } catch (error) {}
  }
}
</script>
