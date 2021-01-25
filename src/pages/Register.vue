<template>
  <form class="card auth-card" v-on:submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'Title_HomeBookkeeping' | localize }}</span>
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
          }} {{ $v.password.$params.minLength.min }} {{
            'symbol' | localize
          }}. {{ 'Now' | localize }} {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength) }"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ 'Message_EnterName' | localize }}
        </small>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.minLength"
        >
          {{
            'Message_NameMustBeLong' | localize
          }} {{ $v.name.$params.minLength.min }} {{
            'symbol' | localize
          }}. {{ 'Now' | localize }} {{ name.length }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ 'Message_IAgreeWithTheRules' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Message_RegisterNow' | localize }} <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{ 'Message_AlreadyHaveAnAccount' | localize }}? <router-link to="/">{{
          'LogIn' | localize
        }}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  metaInfo() {
    return {
      title: this.$getMetaTitle('Title_HomeBookkeeping')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8) 
    },
    name: {
      required,
      minLength: minLength(1)
    },
    agree: {
      checked: v => v
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
          email: this.email,
          password: this.password,
          name: this.name
        }
        
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {}
    }
  }
}
</script>
