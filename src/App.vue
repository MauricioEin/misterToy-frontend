<script>
import { RouterLink, RouterView } from 'vue-router'
import userMsg from './cmps/user-msg.cmp.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadToys' })
    this.$store.dispatch({ type: 'loadLabels' })
  },
  components: {
    userMsg
  }
}
</script>

<template>
  <userMsg />
  <header class="app-header">
    <div class="hero"></div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/toy">Our toys</RouterLink> |
        <RouterLink to="/stats">Our Stats</RouterLink> |
        <RouterLink to="/about">Our Story</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


