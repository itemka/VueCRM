<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
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
          v-tooltip="'Show record'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>
