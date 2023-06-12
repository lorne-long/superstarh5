import Vue from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import "./components"; //加载全局组件
import store from "./store";
import "./styles/base.less"; //基础样式
import "./plugins/filters"; //加载过滤器
import "./plugins/directives"; //加载指令
// import dayjs from "dayjs";
// var utc = require('dayjs/plugin/utc')
// dayjs.extend(utc)
// window.onerror = function (err) {
//   Dialog({ message: err.message });
// };
const router = initRouter();
import { Toast, Dialog } from "vant";
import waterfall from "vue-waterfall2";
Vue.use(waterfall);
import bootstrap from "./bootstrap";
bootstrap({ router, store, Toast, Dialog });
Vue.config.productionTip = false;
Vue.prototype.$Dialog = Dialog;
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
