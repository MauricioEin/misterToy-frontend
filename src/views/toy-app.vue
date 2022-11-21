<template>
  <main>
    THIS IS THE APP
    <RouterLink to="/toy/edit">ADD</RouterLink><br>
    <RouterLink to="/toy/123">DETAILS</RouterLink>
    THIS IS THE APP

    <section class="container">
      <toy-filter :toys="toys" @setFilterBy="setFilterBy" @setSortBy="setSortBy"></toy-filter>
      <router-link to="toy/edit/" class="btn m-b-s">Add Toy</router-link>
      <div class="paging flex align-center space-between m-b-s">
        <button @click="setPage(-1)">Prev</button>
        <button @click="setPage(1)">Next</button>
      </div>
      <toy-list v-if="toys && toys.length" :toys="toys" @toggleToyState="toggleToyState"
        @removeToy="removeToy">
      </toy-list>
      <h2 v-else-if="toys" class="indicator">No matches found</h2>
      <!-- <h2 class="indicator" v-else >Loading...</h2> -->
      <div v-else class="skeleton-uesfg2nbuh7"></div>
    </section>
  </main>
</template>

<script>
import toyList from '../cmps/toy-list.cmp.vue'
import toyFilter from '../cmps/toy-filter.cmp.vue'
export default {
  computed: {
    toys() {
      return this.$store.getters.toysForDisplay
    },
  },
  methods: {
    toggleToyState(toy) {
      const copyToy = JSON.parse(JSON.stringify(toy))
      copyToy.inStock = !copyToy.inStock
      this.$store
        .dispatch({
          type: 'saveToy',
          toy: copyToy,
        })
        .then(() => {
          console.log('TOGGLED')
          // this.$store.dispatch({
          //   type: 'setUserActivities',
          //   toy: copyToy,
          //   txt: `Toy was set as ${copyToy.inStock ? 'in stock' : 'completed'}`,
          // })
        })
    },
    setFilterBy(filterBy) {
      this.$store.commit({
        type: 'setFilterBy',
        filterBy,
      })
    },
    setSortBy(sortBy) {
      this.$store.commit({
        type: 'setSortBy',
        sortBy,
      })
    },
    removeToy(toyId) {
      this.$store
        .dispatch({
          type: 'removeToy',
          toyId,
        })
        .then(() => {
          const msg = { txt: 'Toy was succesfully removed', type: 'success' }
          this.$store.commit({ type: 'setMsg', msg })
        })
    },
    setPage(diff) {
      this.$store.commit({ type: 'setPage', diff })
    },
  },
  components: {
    toyList,
    toyFilter,
  },
}

</script>





