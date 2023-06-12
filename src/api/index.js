/* eslint-disable */
import { defHttp } from "http/request";

const API = {
  login: "/login",
  validateToken: "/validate_token",
  sendCaptcha: "/send_captcha",
  giftGet: "/myinfo/giftGet", ////我的权益-详情
  giftLog: "/myinfo/gift/records", ////我的权益-详情
  userInfo: "/myinfo/main", ////我的权益-详情
  taskComplete: "/task/complete", //触发任务
  giftGet: "/myinfo/gift/get",
};

export const login = (data) => defHttp.post(API.login, data);
export const validateToken = (data = {}) =>
  defHttp.post(API.validateToken, data);
export const taskComplete = (data) => defHttp.post(API.taskComplete, data);
export const sendCaptcha = (data) => defHttp.post(API.sendCaptcha, data);
/**
 * 我的主界面
 * @returns {Promise<AxiosResponse<T>>}
 */
export const userInfo = (data = {}) => defHttp.post(API.userInfo, data);
export const giftLog = (data) => defHttp.post(API.giftLog, data); //礼包记录
export const giftGet = (id) => defHttp.post(API.giftGet, { id }); //领取礼包
