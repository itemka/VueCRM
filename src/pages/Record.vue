<template>
  <div>
    <div class="page-title">
      <h3>New Record</h3>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Categories are empty <router-link to="/categories">Add new category</router-link>
    </p>
    <form
      v-else
      v-on:submit.prevent="handleSubmit"
      class="form"
    >
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Choose category</label>
      </div>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Income</span>
        </label>
      </p>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Outcome</span>
        </label>
      </p>
      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        >
        <label for="amount">Amount</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          Min value {{ $v.amount.$params.minValue.min }}
        </span>
      </div>
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{ invalid: $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">Description</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
          Enter description
        </span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Create <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'

export default {
  name: 'Record',
  data: () => ({
    select: null,
    categories: [],
    loading: true,
    current: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {
      minValue: minValue(1)
    },
    description: {
      required,
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if (this.categories.length) {
        this.current = this.categories[0].id
      }

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
      }, 0)
    } catch (error) {}
  },
  destroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreate() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    ...mapActions(['createRecord', 'updateInfo']),
    async handleSubmit() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()

          return
        }

        if (this.canCreate) {
          await this.createRecord({
            categoryId: this.current,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          await this.updateInfo({
            bill: this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount
          })

          this.$message('Record created')
          this.amount = 1
          this.description = ''
          this.$v.reset()
        } else {
          this.$message(`Insufficient funds in the account (${this.amount - this.info.bill})`)
        }
      } catch (error) {}
    }
  }
}
</script>
