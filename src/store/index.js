import { createStore } from "vuex";

export default createStore({
  state: {
    Username: "",
    UserID: "",
  },
  getters: {
    // 把State的值作為token儲存到Client端
    setStorage(state) {
      localStorage.setItem("token", JSON.stringify(state));
    },
  },
  mutations: {
    // 設定State的值
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
