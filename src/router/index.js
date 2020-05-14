import Vue from "vue";
import VueRouter from "vue-router";

import motivation from "../views/motivation.vue";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import diary from "../views/diary.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/diary",
    name: "diary",
    component: diary
  },
  
  {
    path: "/motivation",
    name: "motivation",
    component: motivation,
    meta: { requiresAuth: true }
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },
  
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getUser) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
