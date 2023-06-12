import Vue from "vue";
import svgIcon from "./basic/svgIcon"; // svg组件
import vButton from "./basic/button.vue"; // svg组件
import vempty from "./basic/empty.vue"; // svg组件
// 1. 全局注册SvgIcon组件
Vue.component("svgIcon", svgIcon);
// 1. 全局注册SvgIcon组件
Vue.component("vButton", vButton);
Vue.component("vEmpty", vempty);
import { Toast, Lazyload, Loading, Image as VanImage } from "vant";
// const requireContext = require.context('../assets/icons', false, /\.svg$/)
// requireContext.keys().forEach(requireContext)
// const req = require.context('../assets/icons', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)
Vue.use(Lazyload);
Vue.use(VanImage);
Vue.use(Loading);
Vue.prototype.$Toast = Toast;
