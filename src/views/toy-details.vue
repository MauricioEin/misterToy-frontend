<template>
  <section v-if="currToy" class="toy-details-container flex column align-center">
    <h1>Details</h1>
    <h2>{{ currToy.name }}</h2>
    <h3>Price: {{ currToy.price }}</h3>
    <h3>Status: {{ status }}</h3>
    <h3>created At: {{ createdAt }}</h3>
    <h3>Labels: {{ labels }}</h3>
    <h5>ID: {{ currToy._id }}</h5>
    <h3>Reviews:</h3>
    <h4 v-for="review in currToy.reviews">" {{review}} "</h4>
  </section>
  <router-link to="/toy" class="btn">Back</router-link>
</template>


<script>
export default {
  data() {
    return {
      currToy: null
    }
  },
  created() {
    const toyId = this.$route.params.id
    this.$store.dispatch({ type: 'getToyById', toyId })
      .then(toy => {
        this.currToy = toy;
      })
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
      return new Date(this.currToy.createdAt).toLocaleTimeString("en-US") + '  ' + new Date(this.currToy.createdAt).toLocaleDateString("en-US")
    },
    labels(){
      return this.currToy.labels.join(', ')

    }
  }
}
</script>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
