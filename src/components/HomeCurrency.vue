<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Title_ExchangeRates' | localize }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'Currency' | localize }}</th>
            <th>{{ 'Course' | localize }}</th>
            <th>{{ 'Date' | localize }}</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="currency in currencies"
            :key="currency"
          >
            <td>{{ currency }}</td>
            <td>{{ getCurrency(currency) | currency(currency) }}</td>
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
      return this.base * this.rates[currency]
    }
  }
}
</script>
