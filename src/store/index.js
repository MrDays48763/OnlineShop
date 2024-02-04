import { createStore } from "vuex";

export default createStore({
  state: {
    Username: "",
    UserID: "",
  },
  getters: {
    setStorage(state) {
      localStorage.setItem("token", JSON.stringify(state));
    },
  },
  mutations: {
    setUser(state, payload) {
      if (payload !== null) {
        state.Username = payload.Username;
        state.UserID = payload.UserID;
      } else {
        state.Username = "";
        state.UserID = "";
      }
    },
  },
  actions: {},
  modules: {},
});
