import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    uid: '',
    searchText: '',
  },
  mutations: {
    setRecord(state, n) {
      state.username = n.username;
      state.uid = n.uid;
    },
    setSearchText(state, n){
      state.searchText = n;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
