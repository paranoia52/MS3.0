import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    Add(state) {
      state.count++
    }
  },
  actions: {
    addAction({ commit }) {
      commit('Add')
    }
  },
  modules: {
  }
})
