<template>
  <form class="card auth-card" v-on:submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'TitleLogin_HomeBookkeeping' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <label for="email">{{ 'Email' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ 'Message_EmailIsRequiredAndMustNotBeEmpty' | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{ 'Message_EnterCorrectEmail' | localize }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{ 'Message_EnterPassword' | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{
            'Message_PasswordMustBeLong' | localize
          }} {{
            $v.password.$params.minLength.min
          }} {{ 'symbol' | localize }}. {{
            'Now' | localize
          }} {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button type="submit" class="btn waves-effect waves-light auth-submit">
          {{ 'LogIn' | localize }} <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{
          'Message_DontHaveAnAccount' | localize
        }}? <router-link to="/register">{{
          'Message_RegisterNow' | localize
        }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { MESSAGES } from '@/utils/constants'

export default {
  name: 'Login',
  metaInfo() {
    return {
      title: this.$getMetaTitle('LogIn')
    }
  },
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
    const queryMesssages = MESSAGES[this.$route.query.message]

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
