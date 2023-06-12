import { defHttp } from "http/request";

const API = {
  Main: "/activity/invitefriends/main", //活动主界面
  Exchange: "/activity/invitefriends/exchange", ////兑换
  Help: "/activity/invitefriends/help", ////好友助力
  FriendList: "/activity/invitefriends/list", ////好友列表
  RankList: "/activity/invitefriends/rank_list", ////收益排行榜
  Exclusive: "/activity/invitefriends/list/exclusive", ////专属好友列表
  NoobLottery: "/activity/invite_friends/index", //邀请好友活动首页
  income_ranking: "/activity/invite_friends/income_ranking", ////邀请好友收益排行榜
  unbanding: "/activity/invitefriends/unbanding", ////邀请好友收益排行榜
};
export const Main = (data = {}) => defHttp.post(API.Main, data);
export const Exchange = (data = {}) => defHttp.post(API.Exchange, data);
export const Help = (data = {}) => defHttp.post(API.Help, data);
export const FriendList = (data = {}) => defHttp.post(API.FriendList, data);
export const Exclusive = (data = {}) => defHttp.post(API.Exclusive, data);
export const unBanding = (data = {}) => defHttp.post(API.unbanding, data);
export const RankList = (data = {}) => defHttp.post(API.RankList, data);
export const income_ranking = (data = {}) =>
  defHttp.post(API.income_ranking, data);
