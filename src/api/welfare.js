/* eslint-disable */
import { defHttp } from "http/request";
const API = {
  WelfareList: "/get_game_props_bags_list", //礼包列表
  WelfareDetail: "/get_game_props_bags_detail", //礼包详情
  WelfareReceive: "/receive_props_bags", //领取礼包
};
export const WelfareList = (data = {}) => defHttp.post(API.WelfareList, data); //福利列表
export const WelfareDetail = (game_id) =>
  defHttp.post(API.WelfareDetail, { game_id }); //游戏详情
export const WelfareReceive = (data = {}) =>
  defHttp.post(API.WelfareReceive, data); //游戏详情
