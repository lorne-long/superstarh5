import axios from "axios";
import { isFunction } from "../is";

//用于存储每个请求的识别和取消功能
let pendingMap = new Map();

export const getPendingUrl = (config) => [config.method, config.url].join("&");

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          //如果当前没有待处理的请求，添加它
          pendingMap.set(url, cancel);
        }
      });
  }
  /**
   * @description: 清除所有待处理
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   *删除请求
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果当前请求标识符处于待处理状态，
      // 当前请求需要取消并移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: reset
   */
  reset() {
    pendingMap = new Map();
  }
}
