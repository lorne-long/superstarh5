import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const _import = (name) => {
  return () => import(`@/views/${name}`);
};
function getAllRoutes() {
  const routes = [];
  const context = require.context("./routes", true, /\.js$/);
  context.keys().forEach((path) => {
    // 加载此模块
    routes.push(...context(path).default);
  });
  return routes;
}

/**
 * 初始化路由实例
 * @param isAsync 是否异步路由模式
 * @returns {VueRouter}
 */
function initRouter() {
  return new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE, //history
    base: process.env.VUE_APP_PUBLIC_PATH,
    scrollBehavior: () => {
      return { x: 0, y: 0 };
    },
    routes: [
      { path: "/", redirect: "/login" },
      {
        path: "/login",
        name: "login",
        component: _import("login/index"),
        meta: { title: "登录", login: false },
      },
      ...getAllRoutes(),
      {
        path: "/*",
        name: "404",
        component: _import("exception/404"),
        meta: { title: "找不到页面", login: false },
      },
    ],
  });
}

/**
 * 加载导航守卫
 * @param guards
 * @param options
 */
function loadGuards(guards, options) {
  const { beforeEach, afterEach } = guards;
  const { router } = options;
  beforeEach.forEach((guard) => {
    if (guard && typeof guard === "function") {
      router.beforeEach((to, from, next) => guard(to, from, next, options));
    }
  });
  afterEach.forEach((guard) => {
    if (guard && typeof guard === "function") {
      router.afterEach((to, from) => guard(to, from, options));
    }
  });
}

export { initRouter, getAllRoutes, loadGuards };
