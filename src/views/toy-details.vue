<template>
  <section v-if="currToy" class="toy-details-container flex column align-center">
    <h2>{{ currToy.name }}</h2>
    <h3>Price: {{ currToy.price }}</h3>
    <h3>Status: {{ status }}</h3>
    <!-- <h3>created At: {{ createdAt }}</h3> -->
    <h3>Labels: {{ labels }}</h3>
    <h5>ID: {{ currToy._id }}</h5>
    <h3>Messages:</h3>
    <toy-msg-preview v-if="currToy.msgs?.length" v-for="msg in currToy.msgs" :msg="msg" />
    <h4 v-else> No messages yet </h4>
    <el-form label-width="120px">
      <el-form-item label="Add a message:">
        <el-input v-model="newMsg" placeholder="What is on your mind?" />
      </el-form-item>
      <el-form-item v-if="!errMsg">
        <el-button type="primary" :disabled="!newMsg || newMsg.length < 4" @click="addMsg()">Post
        </el-button>
      </el-form-item>
      <p v-else>{{ errMsg }} </p>
    </el-form>
    <toy-review-list :toyId="this.currToy._id"/>
  </section>
  <router-link to="/toy" class="btn">Back</router-link>
</template>


<script>
import toyMsgPreview from '../cmps/toy-msg-preview.cmp.vue'
import toyReviewList from '../cmps/toy-review-list.cmp.vue'

export default {
  data() {
    return {
      currToy: null,
      newMsg: '',
      errMsg: ''
    }
  },
  created() {
    this.loadToy()
  },
  computed: {
    status() {
      if (this.currToy.inStock) {
        return 'In stock'
      } else {
        return 'Out of stock'
      }
    },
    createdAt() {
      // const time = ObjectId(this.currToy._id).getTimestamp()
      // console.log('time',time)
      return new Date(this.currToy.createdAt).toLocaleTimeString("en-US") + '  ' + new Date(this.currToy.createdAt).toLocaleDateString("en-US")
    },
    labels() {
      return this.currToy.labels.join(', ')
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  methods: {
    async loadToy() {
      const toyId = this.$route.params.id
      const toy = await this.$store.dispatch({ type: 'getToyById', toyId })
      this.currToy = toy
    },
    async addMsg() {
      if (!this.loggedInUser) return this.errMsg = 'Only logged users can post messages'
      await this.$store.dispatch({ type: 'addToyMsg', msg: this.newMsg, toyId: this.currToy._id })
      this.loadToy()
    }
  }, components: {
    toyMsgPreview, toyReviewList

  }
}
</script>


