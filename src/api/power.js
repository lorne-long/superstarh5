/* eslint-disable */
import { defHttp } from "http/request";
const API = {
  growDetail: "/myinfo/rights/grow_value_detail", //我的积分列表
  integralList: "/myinfo/credits/list", //我的积分列表
  VipRule: "/myinfo/rights", //我的积分列表
};
export const growDetail = (data) => defHttp.post(API.growDetail, data); //我的权益-成长值明细
export const integralList = (data) => defHttp.post(API.integralList, data); //我的积分列表
export const VipRule = (data = {}) => defHttp.post(API.VipRule, data); // vip规则
