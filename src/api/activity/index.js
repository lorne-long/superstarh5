/* eslint-disable */
import { defHttp } from "http/request";

const API = {
  winningRecord: "/activity/winning_record",
  NoobMain: "/activity/newuser/main", ////资讯详情
  NoobLottery: "/activity/newuser/lottery", ////资讯like

  tripMain: "/activity/trip/main", //星仔的旅途
  tripBindGame: "/activity/trip/banding_game", //绑定游戏
  tripCharge: "/activity/trip/charge", //充能
  tripCreateTeam: "/activity/trip/create_team", //星仔的旅途创建队伍
  tripJoinTeam: "/activity/trip/join_team", //星仔的旅途加入队伍
  tripInviteJoinTeam: "/activity/trip/invite_join_team", //星仔的旅途邀请加入队伍
  tripOutTeam: "/activity/trip/out_team", //星仔的旅途创建队伍
  tripOpenBox: "/activity/trip/open_box", //星仔的旅途创建队伍
  tripExchange: "/activity/trip/exchange", //星仔的旅途创建队伍

  swMain: "/activity/superwelfare/main", //：活动主界面
  swBind: "/activity/superwelfare/banding_game", //绑定游戏
  swInvite: "/activity/superwelfare/invite", //邀请好友
  swReceive: "/activity/superwelfare/receive", //邀请好友

  drawMain: "/activity/integralDraw/homeInfo", //抽奖主页面
  drawOnce: "/activity/integralDraw/draw", //抽奖主页面
  drawTen: "/activity/integralDraw/tenDraws", //抽奖
  DrawWinningRecord: "/activity/my_winning_record", //抽奖记录
  DrawAccept: "/activity/accept", //抽奖记录

  Jzjhq: "/send_props_bag", //发送昆仑预约礼包
};
export const winningRecord = (activity_type) =>
  defHttp.post(API.winningRecord, { activity_type }); //星仔的旅途主界面
export const tripMain = (data) => defHttp.post(API.tripMain, data); //星仔的旅途主界面
export const tripBindGame = (data = {}) => defHttp.post(API.tripBindGame, data); //星仔的旅途主界面
export const tripCharge = (id) => defHttp.post(API.tripCharge, { id }); //充能
export const tripCreateTeam = (id) => defHttp.post(API.tripCreateTeam, { id }); //星仔的旅途创建队伍
export const tripJoinTeam = (data) => defHttp.post(API.tripJoinTeam, data); //星仔的旅途加入队伍
export const tripInviteJoinTeam = (data) =>
  defHttp.post(API.tripInviteJoinTeam, data); //星仔的旅途加入队伍
export const tripOutTeam = (data) => defHttp.post(API.tripOutTeam, data); //星仔的旅途退出/提出队伍
export const tripOpenBox = (data) => defHttp.post(API.tripOpenBox, data); //星仔的旅途退出/提出队伍
export const tripExchange = (data) => defHttp.post(API.tripExchange, data); //星仔的旅途兑换奖品

export const NoobMain = () => defHttp.post(API.NoobMain, {}); //新人活动 主页
export const NoobLottery = (id) => defHttp.post(API.NoobLottery, { id }); //新人活动 抽奖

export const swMain = (data = {}) => defHttp.post(API.swMain, data); //
export const swBind = (data) => defHttp.post(API.swBind, data); //
export const swInvite = (data = {}) => defHttp.post(API.swInvite, data); //
export const swReceive = (data = {}) => defHttp.post(API.swReceive, data); //

export const drawMain = (data = {}) => defHttp.post(API.drawMain, data); //
export const drawOnce = (data = {}) => defHttp.post(API.drawOnce, data); //
export const drawTen = (data = {}) => defHttp.post(API.drawTen, data); //
export const DrawAccept = (data = {}) => defHttp.post(API.DrawAccept, data); //
export const DrawWinningRecord = (data = {}) =>
  defHttp.post(API.DrawWinningRecord, data); //

export const Jzjhq = (data = {}) => defHttp.post(API.Jzjhq, data); //
