<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>
      <form v-on:submit.prevent="handleSubmit">
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
          <label>{{ 'Message_ChooseCategory' | localize }}</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          >
          <label for="name">{{ 'Name' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{ 'Message_EnterCategoryName' | localize }}
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{ 'Message_MinValue' | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }} <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'

export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    },
    choosedCategoryIdx: Number
  },
  data: () => ({
    select: null,
    current: null,
    title: '',
    limit: 100
  }),
  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100)
    }
  },
  created() {
    const {
      id = '',
      title = '',
      limit = 100
    } = this.categories[this.choosedCategoryIdx || 0]

    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  watch: {
    current(categoryId) {
      const { title= '', limit = 100 } = this.categories.find(({ id }) => id === categoryId)

      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()

          return
        }

        const formData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }

        await this.$store.dispatch('updateCategory', formData)
        this.$message('Message_CategoryUpdated')
        this.$emit('updated', formData)
      } catch (error) {}
    }
  }
}
</script>
