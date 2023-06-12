import Vue from "vue";
import clipboard from "clipboard";
import { debounce } from "lodash-es";
import { gather } from "@/api/gather";
import { isObject } from "@/utils/is";
Vue.directive("clipboard", {
  inserted(el, binding, vnode) {
    const _clipboard = new clipboard(el);
    _clipboard.on("success", function () {
      vnode.context.$Toast("复制成功");
    });
    _clipboard.on("error", function () {
      vnode.context.$Toast("复制失败");
    });
  },
});

Vue.directive("login", {
  inserted(el, binding, vnode) {
    const isLogin = vnode.context.$store.getters.isLogin;
    if (!isLogin) {
      el.setAttribute("disabled", true);
    } else {
      // el.addEventListener("click", function () {
      //   binding.value();
      // });
    }
  },
  update(el, binding, vnode) {
    const isLogin = vnode.context.$store.getters.isLogin;
    if (!isLogin) {
      el.setAttribute("disabled", true);
    }
  },
});
//埋点事件
Vue.directive("gather", {
  deep: true,
  inserted(el, binding, vNode) {
    const { point: page_name } = vNode.context.$route.meta || {};
    el.gather = binding.value;
    el.addEventListener(
      "touchstart",
      debounce(
        () => {
          const value = el.gather;
          if (
            el.getAttribute("disabled") == "true" ||
            el.hasAttribute("disabled")
          )
            return;
          const reportData = vNode.context.$store.reportData || {};
          const _val = isObject(value) ? value : { event_name: String(value) };
          gather({ event_action: "click", page_name, ..._val, ...reportData });
        },
        1000,
        { leading: true, trailing: false }
      )
    );
  },
  update(el, binding) {
    el.gather = binding.value;
  },
});
