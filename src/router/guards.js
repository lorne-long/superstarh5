import appAction, { actionMap } from "@/utils/app-action";
import { checkAuthorization } from "@/utils/auth/";
import { gather } from "@/api/gather";
// import store from "../store";
/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = async (to, from, next, options) => {
  const { store } = options;
  if (to.matched.some((item) => item.meta && item.meta.login === false)) {
    next();
    //在忽略列表中
  } else {
    if (checkAuthorization()) {
      // 已经登录;
      if (!store.getters.userInfo) {
        //先获取用户信息
        store.dispatch("getUserInfo");
      }
      return next();
    } else {
      // store.commit("SET_LOGIN", true);
      // message.fail("登录失效,请先登录!");
      // next();
      next({
        path: "/login",
        replace: true,
        query: {
          form: to.path,
        },
      });
    }
  }
};

/**
 * 结束
 * @param to
 * @param form
 * @param options
 */
const afterDone = (to, from, options) => {
  const { Toast, store } = options;
  Toast.clear();
  to.meta && (document.title = to.meta.title);
  if (to.meta.share) {
    appAction(actionMap.setShare, {
      url: window.location.href,
      ...(to.meta.share || {}),
    });
  }
  //埋点
  if (to.meta.point) {
    const event_name = checkAuthorization()
      ? to.meta.point + "_view"
      : "share_view";
    setTimeout(() => {
      gather({
        page_name: to.meta.point,
        event_name,
        event_action: "view",
        ...(store.state.reportData || {}),
      });
    }, 500);
  }
};
export default {
  beforeEach: [loginGuard],
  afterEach: [afterDone],
};
