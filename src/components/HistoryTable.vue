<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Amount' | localize }}</th>
      <th>{{ 'Date' | localize }}</th>
      <th>{{ 'Category' | localize }}</th>
      <th>{{ 'Type' | localize }}</th>
      <th>{{ 'Open' | localize }}</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(record, idx) in records"
      :key="record.id"
    >
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          :class="[record.typeClass]"
          class="white-text badge"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          class="btn-small btn"
          v-on:click="$router.push(`/detail/${record.id}`)"
          v-tooltip="tooltipMessage"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  computed: {
    tooltipMessage() {
      return localizeFilter('Message_ShowRecord')
    }
  }
}
</script>
