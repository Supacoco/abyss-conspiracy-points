import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: {
      name: "splash-page",
    },
  },
  {
    path: "/score",
    redirect: {
      name: "splash-page",
    },
  },
  {
    path: "/game/:playerCount/players",
    name: "game-page",
    component: () => import("../pages/Game.vue"),
  },
  {
    path: "/splash",
    name: "splash-page",
    component: () => import("../pages/Splash.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
