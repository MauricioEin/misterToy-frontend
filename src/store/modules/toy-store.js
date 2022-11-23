import toyService from '../../services/toy.service.js'
import statService from '../../services/stat.service.js'


export default {
  state: {
    toys: null,
    filterBy: { status: 'All', name: '', page: 0, pageSize: 3 },
    sortBy: { val: 'name', isAsc: true },
    totalPages: 0,
    labels: []

  },
  getters: {
    toysForDisplay(state) {
      return JSON.parse(JSON.stringify(state.toys))
    },
    totalPages(state) {
      return state.totalPages
    },
    currPage(state) {
      return state.filterBy.page
    },
    labels(state) {
      return state.labels
    }
  },
  mutations: {
    setToys(state, { totalPages, filteredToys: toys }) {
      state.toys = toys
      state.totalPages = totalPages
    },
    setLabels(state, labels) {
      state.labels = labels
    },
    updateToy({ toys }, { toy }) {
      const idx = toys.findIndex((_toy) => _toy._id === toy._id)
      if (idx === -1) {
        console.log("Can't update toy " + toy._id)
        return
      }
      toys.splice(idx, 1, toy)
    },
    addToy({ toys }, { toy }) {
      console.log('Adding!!')
      toys.push(toy)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = { ...state.filterBy, ...filterBy, page: 0 }

    },
    setSortBy(state, { sortBy }) {
      state.sortBy = sortBy
    },
    setPage(state, { diff }) {
      state.filterBy.page = (state.filterBy.page + state.totalPages + diff) % state.totalPages
    },
    removeToy({ toys }, { toyId }) {
      const idx = toys.findIndex((toy) => toy._id === toyId)
      if (idx === -1) {
        console.log("Can't remove toy " + toyId)
        return
      }
      toys.splice(idx, 1)
    },
  },
  actions: {
    loadToys({ commit, state }) {
      toyService.query(state.filterBy, state.sortBy).then((toysAndPages) => {
        commit('setToys', toysAndPages)
      })
    },
    loadLabels({ commit }) {
      toyService.getLabels().then(labels => {
        commit('setLabels', labels)
        statService.getAvgLabelPrice()
        statService.getInStockByLabel()
      })
    },
    saveToy({ commit }, { toy }) {
      console.log('Saving')
      const isEdit = toy._id
      return toyService.save(toy).then((toy) => {
        const type = isEdit ? 'updateToy' : 'addToy'
        commit({ type, toy })
      })
    },
    removeToy({ commit, dispatch }, { toyId }) {
      console.log('Store remove toyId', toyId)
      return toyService.remove(toyId).then((removedToy) => {
        commit({ type: 'removeToy', toyId })
        // dispatch({ type: 'setUserActivities', txt: 'Toy was removed', toy: removedToy })
      })
    },
    getToyById(context, { toyId }) {
      return toyService.getById(toyId)
    },
  },
}
