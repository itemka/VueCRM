<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Categories are empty <router-link to="/categories">Add new category</router-link>
    </p>
    <section v-else>
      <div
        v-for="catecory in categories"
        :key="catecory.id"
      >
        <p>
          <strong>{{ catecory.title }}</strong>
          {{ catecory.spend | currency }} of {{ catecory.limit | currency }}
        </p>
        <div class="progress" v-tooltip="catecory.tooltip">
          <div
            class="determinate"
            :class="[catecory.progressColor]"
            :style="{ width: `${catecory.progressPercent}%` }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'Planning',
  data: () => ({
    categories: [],
    loading: true
  }),
  computed: mapGetters(['info']),
  async mounted() {
    try {
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.categories = categories.map(category => {
        const spend = records
          .filter(record => record.categoryId === category.id)
          .filter(record => record.type === 'outcome')
          .reduce((acc, record) => {
            return acc += +record.amount
          }, 0)
        
        const percent = 100 * spend / category.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'
        const tooltipValue = category.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Excess by' : 'Left'} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...category,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })

      this.loading = false
    } catch (error) {}
  }
}
</script>
