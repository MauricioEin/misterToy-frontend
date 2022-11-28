<template>
  <div class="reviews-container">
    <h2>- Reviews -</h2>
    <ul class="review-list clean-list flex">
      <li v-if="reviews" v-for="review in reviews" :key="review._id">
        <p v-if="userId">
          {{ review.toy.name }}:
        </p>
        <pre>"{{ review.content }}"</pre>
        <p v-if="toyId">
          By {{ review.user.fullname }}
        </p>

        <!-- <router-link :to="`user/${review.aboutUser._id}`">
            {{ review.aboutUser.fullname }}
          </router-link> -->
        <!-- <p>At {{ new ObjectId(review._id).getTimestamp()}} -->
        <!-- <router-link :to="`user/${review.byUser._id}`">
            {{ review.byUser.fullname }}
          </router-link> -->
        <!-- </p> -->
      </li>
    </ul>
    <hr />

    <el-form v-if="loggedInUser && toyId" label-width="120px" @submit.prevent="addReview()">
      <el-form-item label="Add a review:">
        <el-input v-model="reviewToEdit.content" placeholder="Your opinion matters" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="reviewToEdit.content.length < 5" @click="addReview()">Send
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reviewService } from '../services/review.service'

export default {
  props: ['toyId', 'userId'],
  data() {
    return {
      reviewToEdit: {
        content: '',
        toyId: this.toyId,
      },
      reviews: null
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews
    },

    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  async created() {
    const filter = this.userId ? { userId: this.userId } : { toyId: this.toyId }
    await this.$store.commit({ type: 'setReviewFilter', filter })
    await this.$store.dispatch({ type: 'loadReviews' })

    // this.$store.dispatch({type: 'loadUsers'})
    // this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    async addReview() {
      if (this.reviewToEdit.content.length < 5) return
      try {
        this.reviewToEdit.userId = this.loggedInUser._id
        await this.$store.dispatch({ type: 'addReview', review: this.reviewToEdit })
        // showSuccessMsg('Review added')
        this.reviewToEdit = { content: '', toy: this.toyId }
        this.$store.dispatch({ type: 'loadReviews' })
      } catch (err) {
        // showErrorMsg('Cannot add review')
      }
    }
  }


}
</script>
