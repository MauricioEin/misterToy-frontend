<template>
    <header class="app-header full main-layout">
        <div class="hero"></div>
        <div class="nav-wrapper flex align-center space-between">
            <nav class="">
                <RouterLink to="/toy">Our toys</RouterLink> |
                <RouterLink to="/stats">Our Stats</RouterLink> |
                <RouterLink to="/about">Our Story</RouterLink>
            </nav>

            <img src="../assets/Mr-toy.jpeg" alt="Mr Toy!" />
            <div class="user-nav">
                <section v-if="user">
                    <p>Welcome <span class="username">{{ user.fullname }}</span> |
                        <RouterLink to="/user">Profile</RouterLink> |
                        <RouterLink to="/login">Log out</RouterLink>
                    </p>
                </section>
                <RouterLink v-else to="/login">Log in</RouterLink>
            </div>
            <!-- <login-signup @onChangeLoginStatus="onChangeLoginStatus"></login-signup> -->
        </div>
    </header>
</template>



<script>
export default {
    props: ['user'],
    methods: {
        closeMsg() {
            this.$store.commit({ type: 'setMsg', msg: null })
        },
    },
    computed: {
        msg() {
            const userMsg = this.$store.getters.msg
            if (userMsg?.txt) {
                setTimeout(() => {
                    this.closeMsg()
                }, 3000);
            }
            return userMsg
        }
    },

}
</script>
