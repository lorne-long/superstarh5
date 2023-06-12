import { defHttp } from "http/request";
const API = {
  games: "/games", //游戏列表
  gameDetail: "/game/detail", //我的积分列表
  appointment: "/game/appointment", //我的积分列表
  GameArea: "/get_game_area_all", //我的积分列表
  GameRole: "/get_game_role_all", //我的积分列表
  Download: "/game/download", //下载游戏按钮点击，都调用下该接口
};
export const games = (data = {}) => defHttp.post(API.games, data); //游戏列表
export const gameDetail = (game_id) =>
  defHttp.post(API.gameDetail, { game_id }); //游戏详情
export const appointment = (game_id) =>
  defHttp.post(API.appointment, { game_id }); //游戏详情
export const GameArea = (game_id) => defHttp.post(API.GameArea, { game_id }); //获取游戏大区
export const GameRole = (game_id, area_id) =>
  defHttp.post(API.GameRole, { game_id, area_id }); //获取游戏大区
export const Download = (game_id) => defHttp.post(API.Download, { game_id }); //获取游戏大区
