import toyService from '../../services/toy.service.js'
import statService from '../../services/stat.service.js'
// import { id } from 'element-plus/es/locale/index.js'


export default {
  state: {
    toys: null,
    filterBy: { status: 'All', name: '', page: 0, pageSize: 5 },
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
      // console.log('got here')
      // console.log('labels:', state.labels)
      return state.labels
    }
  },
  mutations: {
    setToys(state, { totalPages, toys }) {
      state.toys = toys
      state.totalPages = totalPages
    },
    setLabels(state, labels) {
      // console.log('labels:', labels)
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
      toys.push(toy)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = { ...state.filterBy, ...filterBy, page: 0 }
      if (!filterBy.pageSize) state.filterBy.pageSize = 4
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
    addToyMsg(state, { newMsg, toyId }) {
      const currToy = state.toys.find(toy => toy._id === toyId)
      currToy.msgs = currToy.msgs ? [...currToy.msgs, newMsg] : [newMsg]
    }
  },
  actions: {
    async loadToys({ commit, state }) {
      const toysAndPages = await toyService.query(state.filterBy, state.sortBy)

      commit('setToys', toysAndPages)
    },
    async loadLabels({ commit }) {
      const labels = await toyService.getLabels()
      commit('setLabels', labels)
      statService.getAvgLabelPrice()
      statService.getInStockByLabel()
    },
    async saveToy({ commit }, { toy }) {
      const isEdit = toy._id
      const savedToy = await toyService.save(toy)
      const type = isEdit ? 'updateToy' : 'addToy'
      commit({ type, toy: savedToy })
    },
    async removeToy({ commit, dispatch }, { toyId }) {
      await toyService.remove(toyId)
      commit({ type: 'removeToy', toyId })
      // dispatch({ type: 'setUserActivities', txt: 'Toy was removed', toy: removedToy })
    },
    getToyById(context, { toyId }) {
      return toyService.getById(toyId)
    },
    async addToyMsg({ commit, getters }, { msg, toyId }) {
      const loggedInUser = { ...getters.loggedInUser }
      var newMsg = { txt: msg, by: loggedInUser }
      newMsg = await toyService.addToyMsg(newMsg, toyId)
      commit({ type: 'addToyMsg', newMsg, toyId })
    }
  },
}
