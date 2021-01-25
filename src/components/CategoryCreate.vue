<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create' | localize }}</h4>
      </div>
      <form v-on:submit.prevent="handleSubmit">
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
          {{ 'Create' | localize }} <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'

export default {
  data: () => ({
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
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()

          return
        }

        const formData = {
          title: this.title,
          limit: this.limit
        }

        const category = await this.$store.dispatch('createCategory', formData)
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message('Message_CategoryCreated')
        this.$emit('created', category)
      } catch (error) {}
    }
  }
}
</script>
