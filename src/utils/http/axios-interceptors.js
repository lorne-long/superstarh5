import Cookie from "js-cookie";
import { AxiosCanceler } from "./axiosCancel";
import AppAction, { actionMap } from "@/utils/app-action";
const axiosCanceler = new AxiosCanceler();
const ERR_CODE_LIST = {
  //常见错误码列表
  [400]: "请求错误",
  [401]: "登录失效或在其他地方已登录",
  [403]: "拒绝访问",
  [404]: "请求地址出错",
  [408]: "请求超时",
  [500]: "服务器内部错误",
  [501]: "服务未实现",
  [502]: "网关错误",
  [503]: "服务不可用",
  [504]: "网关超时",
  [505]: "HTTP版本不受支持",
};
const resCommon = {
  onFulfilled(response, options) {
    response && axiosCanceler.removePending(response.config);
    const { message, store } = options;
    switch (response.code) {
      case 403:
        message.fail("请求被拒绝");
        break;
      case 401:
        message.fail("无此权限");
        store.commit("CLEAR");
        break;
    }
    response.data.success = response.data.code == 0;
    return response.data;
  },
  onRejected(error, options) {
    const { router, store } = options;
    const { message: errorMsg, response } = error;
    let msg = errorMsg;
    // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    if (!response) {
      //无网络时单独处理
      msg = "网络不可用，请刷新重试";
    } else {
      msg = ERR_CODE_LIST[response.status];
      switch (response.status) {
        case 401:
          store.commit("CLEAR");
          // router.replace({
          //   name: "login",
          //   query: { form: encodeURIComponent(router.currentRoute.fullPath) },
          // });
          AppAction(actionMap.toLogin).catch(() => {
            store.commit("SET_LOGIN", true);
          });
          break;
        default:
          break;
      }
    }

    return Promise.resolve({ success: false, msg: msg });
  },
};
const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { store, router } = options;
    const { xsrfHeaderName, requestOptions } = config;
    const { ignoreCancel } = requestOptions;
    if (xsrfHeaderName) {
      config.headers[xsrfHeaderName] = Cookie.get(xsrfHeaderName);
      try {
        const _GATHERVAL = store.getters.commonHeader;
        for (const key in _GATHERVAL) {
          config.headers[key] = _GATHERVAL[key] + "";
        }
        const name =
          router.app.$route.meta && router.app.$route.meta.point
            ? router.app.$route.meta.point
            : router.app.$route.name;
        if (name) {
          config.headers["Page_Name"] = name + "";
        }
      } catch (e) {
        console.log(e);
      }
    }
    // const opt = Object.assign({}, requestOptions, options);
    !ignoreCancel && axiosCanceler.addPending(config); //取消事件
    return config;
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router , store, message}
   * @returns {Promise<never>}
   */
  onRejected(error) {
    // const { message } = options;
    // message.fail(error.message);
    return Promise.resolve({ success: false, msg: error.message });
  },
};
export default {
  request: [reqCommon], // 请求拦截
  response: [resCommon], // 响应拦截
};
