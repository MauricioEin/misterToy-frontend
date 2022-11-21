import toyService from '../../services/toy.service.js'

const PAGE_SIZE = 3

export default {
  state: {
    toys: null,
    filterBy: { status: 'All', name: '', page: 0 },
    sortBy: null,
  },
  getters: {
    toysForDisplay(state) {
      const asc = state.sortBy?.isAsc ? -1 : 1
      let filteredToys
      if (!state.filterBy.name && state.filterBy.status === 'All') filteredToys = JSON.parse(JSON.stringify(state.toys))
      else {
        if (state.filterBy.status === 'In stock') {
          filteredToys = state.toys.filter((toy) => toy.inStock)
        } else if (state.filterBy.status === 'Out of stock') {
          filteredToys = state.toys.filter((toy) => !toy.inStock)
        } else {
          filteredToys = state.toys
        }
        filteredToys = filteredToys.filter((toy) => new RegExp(state.filterBy.name, 'i').test(toy.name))
      }
      // PAGING
      let startIdx = state.filterBy.page * PAGE_SIZE
      let endIdx = startIdx + PAGE_SIZE

      const sortBy = state.sortBy?.val
      return filteredToys?.slice(startIdx, endIdx).sort((t1, t2) => (t1[sortBy] > t2[sortBy] ? 1 * asc : -1 * asc))
    },
  },
  mutations: {
    setToys(state, toys) {
      state.toys = toys
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
      state.filterBy = { ...state.filterBy, ...filterBy }
      console.log(state.filterBy)
    },
    setSortBy(state, { sortBy }) {
      state.sortBy = sortBy
    },
    setPage(state, { diff }) {
      const toyLength = state.toys?.length
      let maxPage = toyLength / PAGE_SIZE
      if (Number.isInteger(toyLength / PAGE_SIZE)) maxPage--
      else maxPage = Math.floor(maxPage)

      let page = state.filterBy.page + diff
      if (page < 0) state.filterBy.page = maxPage
      else if (page > maxPage) state.filterBy.page = 0
      else state.filterBy.page = page
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
    loadToys({ commit }) {
      toyService.query().then((toys) => {
        commit('setToys', toys)
      })
    },
    saveToy({ commit }, { toy }) {
      console.log('Saving')
      const isEdit = toy._id
      return toyService.save(toy).then((toy) => {
        const type = isEdit ? 'updateToy' : 'addToy'
        // if (isEdit) commit({ type: 'updateToy', toy })
        // else commit({ type: 'addToy', toy })
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
      console.log(context)
      return toyService.getById(toyId)
    },
  },
}
