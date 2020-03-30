import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    uid: '',
    searchText: '',
    pid: '',
    openChat: false,
  },
  mutations: {
    setRecord(state, n) {
      state.username = n.username;
      state.uid = n.uid;
    },
    setSearchText(state, n){
      state.searchText = n;
    },
    setSelectedPID(state, n){
      state.pid = n;
    },
    setOpenChat(state,n){
      state.openChat = n
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
