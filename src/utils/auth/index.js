import Cookie from "js-cookie";
import settings from "@/settings/index";
const { XSRF_NAME: xsrfHeaderName } = settings;
/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth) {
  Cookie.set(xsrfHeaderName, "Bearer " + auth.token, {
    expires: auth.expireAt,
  });
}
/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization() {
  Cookie.remove(xsrfHeaderName);
}
/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization() {
  if (Cookie.get(xsrfHeaderName)) {
    return true;
  }
  return false;
}

export { setAuthorization, removeAuthorization, checkAuthorization };
