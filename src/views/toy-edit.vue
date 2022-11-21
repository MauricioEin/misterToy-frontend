<template>
  <section class="toy-edit-container">
    <h1 class="toy-edit-header padding-m-y">TOY EDIT</h1>
    <form @submit.stop="save(updatedToy)">
      <label class="m-b-m">
        Title
        <input type="text" v-model="updatedToy.name" />
      </label>
      <div class="btns flex align-center">
        <button class="edit-save-btn btn">Save</button>
        <router-link to="/toy" class="edit-back-btn">Back</router-link>
      </div>
    </form>
  </section>
</template>


<script>
export default {
  data() {
    return {
      updatedToy: {
        name: '',
        toyId: null,
      },
    }
  },
  created() {
    this.getToyById()
  },
  methods: {
    getToyById() {
      var toyId = this.$route.params.id
      if (toyId) {
        this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
          var currToyCopy = JSON.parse(JSON.stringify(toy))
          this.updatedToy = currToyCopy
        })
      }
    },

    save(toy) {
      const action = toy._id ? 'updated' : 'added'
      this.$store
        .dispatch({ type: 'saveToy', toy })
        .then(() => {
          // this.$store.dispatch({
          //   type: 'setUserActivities',
          //   toy,
          //   txt: `Toy was ${action}`,
          // })
          this.$router.push('/toy')
        })
        .then(() => {
          const msg = { txt: `Toy was succesfully ${action}`, type: 'success' }
          this.$store.commit({ type: 'setMsg', msg })
        })
    },
  },
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
