import axios from "axios";
import { merge } from "lodash-es";
import { isFunction } from "../is";
import settings from "@/settings/index";
function createAxios(opt = {}) {
  return axios.create(
    merge(
      {
        timeout: 60 * 1000,

        withCredentials: false,
        xsrfHeaderName: settings.XSRF_NAME,
        xsrfCookieName: settings.XSRF_NAME,
        headers: {
          "Content-Type": "application/json",
        },
        requestOptions: {},
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios({
  baseURL: settings.URL_PREFIX, // 基础接口地址
});
/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const { request, response } = interceptors;
  // 加载请求拦截器
  request.forEach((item) => {
    let { onFulfilled, onRejected } = item;
    isFunction(onFulfilled) &&
      defHttp.interceptors.request.use(
        (config) => onFulfilled(config, options),
        undefined
      );
    isFunction(onRejected) &&
      defHttp.interceptors.request.use(undefined, (error) =>
        onRejected(error, options)
      );
  });
  // 加载响应拦截器
  response.forEach((item) => {
    let { onFulfilled, onRejected } = item;
    isFunction(onFulfilled) &&
      defHttp.interceptors.response.use(
        (config) => onFulfilled(config, options),
        undefined
      );
    isFunction(onRejected) &&
      defHttp.interceptors.response.use(undefined, (config) =>
        onRejected(config, options)
      );
  });
}
/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {};
  if (!url || url === "" || typeof url !== "string") {
    return params;
  }
  const paramsStr = url.split("?")[1];
  if (!paramsStr) {
    return params;
  }
  const paramsArr = paramsStr.replace(/&|=/g, " ").split(" ");
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1];
    params[paramsArr[i * 2]] =
      value === "true" ? true : value === "false" ? false : value;
  }
  return params;
}
export { loadInterceptors, parseUrlParams, createAxios };
console.log(settings.GATHER_PATH);
export const otherHttp = createAxios({
  //埋点API
  baseURL: settings.GATHER_PATH,
});
