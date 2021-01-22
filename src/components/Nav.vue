<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" v-on:click.prevent="$emit('click-navbar-menu')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownRef"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a
                href="#"
                class="black-text"
                v-on:click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Sign out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'Nav',
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

    this.dropdown = M.Dropdown.init(this.$refs.dropdownRef)
  },
  beforeDestroy() {
    clearInterval(this.interval)

    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    logout() {
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
