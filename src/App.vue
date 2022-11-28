<template>
  <userMsg />
  <section class="main-layout">
    <app-header :user="loggedInUser" />
    <main class="main-view">
      <RouterView />

    </main>
  </section>
</template>


<script>
import { userService } from './services/user.service.js'
import { RouterLink, RouterView } from 'vue-router'
import userMsg from './cmps/user-msg.cmp.vue'
import appHeader from './cmps/app-header.cmp.vue'

export default {
  created() {
    this.$store.dispatch({ type: 'loadToys' })
    this.$store.dispatch({ type: 'loadLabels' })
    this.$store.dispatch({ type: 'loadReviews' })
    const user = userService.getLoggedinUser()
    if (user) this.$store.commit({ type: 'setLoggedinUser', user })
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  components: {
    userMsg, appHeader
  }
}
</script>



