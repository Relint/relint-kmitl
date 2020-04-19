import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRecord: '',
    uid: '',
    pid: '',
    openChat: false,
    project: [],
    user: [],
  },
  mutations: {
    setRecord(state, n) {
      state.userRecord = n.user
      state.uid = n.uid
    },
    setSelectedPID(state, n){
      state.pid = n;
    },
    setOpenChat(state,n){
      state.openChat = n
    },
    setProject(state,n){
      state.project = n
    },
    setUser(state,n){
      state.user = n
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
