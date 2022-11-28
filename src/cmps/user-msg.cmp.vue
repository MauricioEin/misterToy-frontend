<template>
    <section v-if="msg" class="user-msg" :class="msg.type">
        <p>{{ msg.txt }}</p>
        <button class="btn" @click="closeMsg">x</button>
    </section>
</template>



<script>
export default {
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
