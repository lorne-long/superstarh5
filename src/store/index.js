// import Cookies from "js-cookie";
import Vue from "vue";
import Vuex from "vuex";
import {
  checkAuthorization,
  setAuthorization,
  removeAuthorization,
} from "@/utils/auth/";
import Cache from "@/utils/cache";

import settings, { CACHE_GATHER_KEY, GatherDefault } from "../settings";
import { userInfo } from "@/api/";
import AppAction, { actionMap } from "@/utils/app-action";
Vue.use(Vuex);
const dpr = Math.ceil(window.devicePixelRatio || 2);
const limitDpr = dpr > 4 ? 4 : dpr < 2 ? 2 : dpr;
export default new Vuex.Store({
  state: {
    showLogin: false,
    userInfo: undefined,
    meessages: 0,
    theme: "light",
    jwtToken: undefined,
    reportData: undefined,
    GATHER: {},
  },
  getters: {
    isLogin(state) {
      return !!state.jwtToken || checkAuthorization();
      // return () => {
      //   return checkAuthorization();
      // };
    },
    commonHeader(state) {
      const _GATHERVAL =
        state.reportData || Cache.get(CACHE_GATHER_KEY, GatherDefault);
      return {
        Device_Id: _GATHERVAL.device_id,
        "OS-Type": _GATHERVAL.os,
        App_Version: _GATHERVAL.app_version,
      };
    },
    avatar(state, getters) {
      const { icon = 1 } = getters.userInfo || {};
      const idx = parseInt(icon);
      return `./avatar/avatar${isNaN(idx) ? 1 : idx}.png`;
    },
    getAvatar() {
      return (icon = 1) => {
        const idx = parseInt(icon);
        return `./avatar/avatar${isNaN(idx) ? 1 : idx}.png`;
      };
    },
    userInfo: (state) => {
      if (!state.userInfo) {
        try {
          const user = Cache.get(settings.USER_INFO);
          state.userInfo = typeof user === "string" ? JSON.parse(user) : user;
        } catch (e) {
          state.userInfo = {};
        }
      }
      return state.userInfo || {};
    },
  },
  mutations: {
    SET_LOGIN(state, val) {
      state.showLogin = !!val;
    },
    SET_REPORT(state, reportData) {
      state.reportData = reportData || {};
      Cache.set(CACHE_GATHER_KEY, reportData);
    },
    SET_JWTTOKEN(state, token) {
      setAuthorization({
        token: token,
      });
      state.jwtToken = token;
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      try {
        if (userInfo) {
          Cache.set(settings.USER_INFO, JSON.stringify(userInfo));
        } else {
          Cache.remove(settings.USER_INFO);
        }
      } catch (error) {
        console.log(error);
      }
    },
    CLEAR(state) {
      removeAuthorization();
      state.userInfo = undefined;
      state.jwtToken = undefined;
      state.reportData = {};
      Cache.clear();
    },
  },
  actions: {
    async login({ commit, dispatch }) {
      try {
        const result = await AppAction(actionMap.getToken); //暂时没有检测 token是否有效 () 因为会换新token通知不到app
        // validateToken 校验jwt token；请求头中需要带上Authorization: Bearer {token}；如果token无效，返回401，需要重新登录；如果token有效，返回新token，保存并继续
        const { data, success } = result;
        if (success) {
          commit("SET_JWTTOKEN", data.token);
          commit("SET_REPORT", data.report_data);
        }
        dispatch("getUserInfo");
        return result;
      } catch (err) {
        return { success: false, msg: err.message };
      }
    },
    async getUserInfo({ commit, getters }) {
      if (!getters.isLogin) return { success: false, msg: "" };
      const { success, data } = await userInfo();
      if (success) {
        commit("SET_USERINFO", data);
      }
      return data;
    },
  },
  modules: {},
});
