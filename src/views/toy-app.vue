<template>
  <main>
    <section class="container">
      <toy-filter :toys="toys" @setFilterBy="setFilterBy" @setSortBy="setSortBy"></toy-filter>
      <router-link to="toy/edit/" class="btn add-btn">Add a toy</router-link>
      <div v-if="totalPages > 1" class="paging flex space-between">
        <button class="btn page-btn" @click="setPage(-1)" :class="{disabled: currPage === 1}">Prev</button>
        <p> Page {{ currPage }} of {{ totalPages }} </p>
        <button class="btn page-btn" @click="setPage(1)" :class="{disabled: currPage === totalPages}">Next</button>
      </div>
      <toy-list v-if="toys && toys.length" :toys="toys" @toggleToyState="toggleToyState" @removeToy="removeToy">
      </toy-list>
      <h2 v-else-if="toys" class="indicator">No matches found</h2>
      <h2 class="indicator" v-else>Loading...</h2>
      <!-- <div v-else class="skeleton-uesfg2nbuh7"></div> -->
    </section>
  </main>
</template>

<script>
import toyList from '../cmps/toy-list.cmp.vue'
import toyFilter from '../cmps/toy-filter.cmp.vue'
export default {
  mounted() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  computed: {
    toys() {
      return this.$store.getters.toysForDisplay
    },
    totalPages() {
      return this.$store.getters.totalPages
    },
    currPage() {
      return this.$store.getters.currPage + 1

    }
  },
  methods: {
    async toggleToyState(toy) {
      const copyToy = JSON.parse(JSON.stringify(toy))
      copyToy.inStock = !copyToy.inStock
      await this.$store.dispatch({ type: 'saveToy', toy: copyToy, })
      this.$store.dispatch({ type: 'loadToys' })

      // this.$store.dispatch({
      //   type: 'setUserActivities',
      //   toy: copyToy,
      //   txt: `Toy was set as ${copyToy.inStock ? 'in stock' : 'completed'}`,
      // })
    },
    setFilterBy(filterBy) {
      this.$store.commit({
        type: 'setFilterBy',
        filterBy,
      })
      this.$store.dispatch({ type: 'loadToys' })
    },
    setSortBy(sortBy) {
      this.$store.commit({
        type: 'setSortBy',
        sortBy,
      })
      this.$store.dispatch({ type: 'loadToys' })
    },
    async removeToy(toyId) {
      await this.$store.dispatch({ type: 'removeToy', toyId, })
      this.$store.dispatch({ type: 'loadToys' })
      const msg = { txt: 'Toy was succesfully removed', type: 'success' }
      this.$store.commit({ type: 'setMsg', msg })
    },
    setPage(diff) {
      this.$store.commit({ type: 'setPage', diff })
      this.$store.dispatch({ type: 'loadToys' })

    },
  },
  components: {
    toyList,
    toyFilter,
  },
}

</script>





