import { createStore } from 'vuex'
import toyStore from './modules/toy-store.js'
import userStore from './modules/user-store.js'
import reviewStore from './modules/review-store.js'

export const store = createStore({
    strict: true,
    state: {
        msg: null,
    },
    getters: {
        msg(state) {
            return state.msg
        },
    },
    mutations: {
        setMsg(state, { msg }) {
            state.msg = msg
        },
    },
    modules: {
        toyStore,
        userStore,
        reviewStore
    },
})
