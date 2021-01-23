<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rates</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Course</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="carrency in currencies" :key="carrency">
            <td>{{ carrency }}</td>
            <td>{{ getCurrency(carrency).toFixed(5) }}</td>
            <td>{{ date | date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['USD', 'EUR', 'BYN']
  }),
  computed: {
    base() {
      return 1 / (this.rates['USD'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
