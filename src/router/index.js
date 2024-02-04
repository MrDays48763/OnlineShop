import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/back",
    name: "back",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BackView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  var token = JSON.parse(localStorage.getItem("token")); //token.UserID == "" ||
  if (to.name !== "login" && token == null) {
    return { name: "login" };
  } else {
    console.log(token);
    store.commit("setUser", token);
  }
});

export default router;
