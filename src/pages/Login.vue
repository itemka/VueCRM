<template>
  <form class="card auth-card" v-on:submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          Email is required and must not be empty!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Enter correct email!
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Enter password!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Password must be {{ $v.password.$params.minLength.min }} characters long. Now {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button type="submit" class="btn waves-effect waves-light auth-submit">
          Log in <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Don't have an account? <router-link to="/register">Register now</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8) 
    }
  },
  mounted() {
    const queryMesssages = messages[this.$route.query.message]

    if (queryMesssages) {
      this.$message(queryMesssages)
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit() {
      try {
        if (this.$v.$invalid) {
          this.$v.$touch()

          return
        }

        const formData = {
          email: this.email,
          password: this.password
        }

        await this.login(formData)
        this.$router.push('/')
      } catch (error) {}
    }
  }
}
</script>
