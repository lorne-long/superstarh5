import { buildUUID } from "@/utils/uuid";
import Cookies from "js-cookie";
import config from "../../package.json";
const {
  VUE_APP_XSRF_NAME: XSRF_NAME,
  VUE_APP_BASE_URL: BASE_URL,
  VUE_APP_GATHER_PATH: GATHER_PATH,
  VUE_APP_GATHER_KEY: GATHER_KEY,
  VUE_APP_URL_PREFIX: URL_PREFIX,
  VUE_APP_USER_INFO: USER_INFO,
  NODE_ENV: NODE_ENV,
} = process.env;

export default {
  XSRF_NAME, //toke名称
  URL_PREFIX, //url前缀
  GATHER_PATH, //埋点路径
  GATHER_KEY, //埋点加密key
  BASE_URL, //baseurl
  USER_INFO, //userkey
  NODE_ENV,
};
export const CACHE_UUID_KEY = "UUID__KEY__";
export const CACHE_GATHER_KEY = "GATHER__KEY__";
//生成设备标识
const uuid = Cookies.get(CACHE_UUID_KEY) || buildUUID();
Cookies.set(CACHE_UUID_KEY, uuid);

export const GatherDefault = {
  device_id: uuid,
  user_id: "", //客户端会返回
  os: NODE_ENV != "production" ? "ios" : "web", // app内会返回合并   测试环境用ios跑不然没有数据
  app_version: config.version + "_h5",
  log_time: String(Math.floor(Date.now() / 1000)),
};
