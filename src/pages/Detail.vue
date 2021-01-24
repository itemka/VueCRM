<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record" >
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a class="breadcrumb" v-on:click.prevent>
          {{ record.type === 'income' ? 'Income' : 'Outcome' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              green: record.type === 'income',
              red: record.type === 'outcome'
            }"
          >
            <div class="card-content white-text">
              <p>Description: {{ record.description }}</p>
              <p>Amount: {{ record.amount | currency }}</p>
              <p>Category: {{ record.categoryName }}</p>
              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">
      Record with id: <strong><b>{{ $route.params.id }}</b></strong> is not found
    </p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    try {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = { ...record, categoryName: category.title }
      this.loading = false
    } catch (error) {}
  }
}
</script>
