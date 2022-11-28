<template>
  <section class="login-signup text-center">
    <router-link to="/toy">Back</router-link>
    <p>{{ msg }}</p>

    <form  v-if="mode === 'login'" @submit.prevent="login" class="flex column align-center">
      <input type="text" v-model="credentials.username" placeholder="Username" />
      <input type="password" v-model="credentials.password" placeholder="Password" />
      <button class="btn">Log in</button>
    </form>
    <form  v-if="mode === 'signup'" @submit.prevent="signup" class="flex column align-center">
      <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
      <input type="text" v-model="signupInfo.username" placeholder="Username" />
      <input type="password" v-model="signupInfo.password" placeholder="Password" />
      <button class="btn">Signup</button>
    </form>
    <a v-else class="btn signup" @click="mode = 'signup'">New? Sign up</a>

  </section>


</template>


<script>
// import { userService } from "../services/user.service.js"

export default {
  data() {
    return {
      msg: '',
      mode: 'login',
      credentials: {
        username: 'puki',
        password: '123'
      },
      signupInfo: {
        fullname: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
  },
  mounted(){
    if (this.loggedInUser) this.logout()
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')


    },
    async login() {
      if (!this.credentials.username) {
        this.msg = 'Please enter username and password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", credentials: this.credentials })
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        this.msg = 'Failed to login'
      }
    },
    async signup() {
      if (!this.signupInfo.fullname || !this.signupInfo.password || !this.signupInfo.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userInfo: this.signupInfo })
      this.$router.push('/')

      // userService.signup(this.signupInfo)
      //     .then(user => {
      //         this.$emit('onChangeLoginStatus')
      //     })
      //     .catch(err => {
      //         console.log('Cannot signup', err)
      //         showErrorMsg(`Cannot signup`)
      //     })
    },
  }

}

</script>