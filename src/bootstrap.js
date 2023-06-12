import { loadGuards } from "@/router/";
import { loadInterceptors } from "http/request";
import guards from "@/router/guards";
import interceptors from "http/axios-interceptors";
import { initTheme } from "@/utils/theme";
//微信 不跟随字体大小变化
(function () {
  if (
    typeof window.WeixinJSBridge == "object" &&
    typeof window.WeixinJSBridge.invoke == "function"
  ) {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    window.WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    window.WeixinJSBridge.on("menu:setfont", function () {
      window.WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();

/**
 * 启动引导方法
 * 应用启动时需要执行的操作放在这里
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 * @param i18n 应用的 message 实例
 */
export default function bootstrap({ router, store, i18n, Toast, Dialog }) {
  // 设置应用配置
  // setAppOptions({ router, store, i18n });
  // 加载 axios 拦截器
  initTheme({ router, store, i18n, Toast, Dialog });
  loadInterceptors(interceptors, {
    router,
    store,
    i18n,
    message: Toast,
    Toast,
  });
  // 加载路由
  // loadRoutes();
  // 加载路由守卫
  loadGuards(guards, { router, store, i18n, message: Toast, Toast });
}
