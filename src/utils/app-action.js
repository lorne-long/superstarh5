import { platform } from "./index";
// const actionName = "appAction";
let idx = 0;
export const actionMap = {
  getToken: "20000", //获取token
  toLogin: "20001", //去登录
  getSystem: "20002", //获取系统信息

  startApp: "20010", //获取启动游戏
  checkAppInstalled: "20011", //检查app是否安装
  bannerAction: "20012", //福利页面banner跳转
  appointmentGame: "20013", //预约通知

  addAddredd: "20060", //添加地址

  articleLike: "20200", //资讯点赞
  Share: "20201", //调用分享
  setShare: "20202", //设置分享
  Notice: "20203", //资讯列表
  Guide: "20204", //攻略列表
  Welfare: "20205", //福利页

  Coupon: "20301", //我的代金券列表
};
export default function (action, data) {
  if (!platform.myApp) {
    return Promise.resolve({
      success: false,
      code: -99,
      msg: "外部打开",
    });
  }
  idx++;
  const callback = `CallCack_${action}_${idx}_${Date.now().toString()}`;
  const params = {
    action,
    callback,
    data,
  };
  console.log(params);
  return new Promise((resolve) => {
    window[callback] = (v) => {
      try {
        console.log("结果", v);
        const result = typeof v === "string" ? JSON.parse(v) : v;
        resolve({ success: result.code == 0, ...result });
      } catch (err) {
        console.error(err);
        resolve({ code: 99, success: false, msg: err.message });
      }
      setTimeout(() => {
        delete window[callback];
      }, 100);
    };
    try {
      if (platform.ios) {
        if (window.webkit)
          window.webkit.messageHandlers.appAction.postMessage(params);
        else {
          delete window[callback];
          resolve({
            success: false,
            code: 99,
            msg: "检测到使用模拟器打开,请手动登录",
          });
        }
      } else if (platform.android) {
        if (window.Android) {
          const jsonStr = window.Android.appAction(JSON.stringify(params));
          if (jsonStr) {
            window[callback](jsonStr);
          }
        } else {
          delete window[callback];
          resolve({
            success: false,
            code: 99,
            msg: "请注入Android appAction方法",
          });
        }
      } else {
        delete window[callback];
        resolve({
          success: false,
          code: 99,
          msg: "检测到在电脑上打开\r\n\r\n请手动登录",
        });
      }
    } catch (err) {
      delete window[callback];
      resolve({ success: false, code: 99, msg: err.toString() });
    }
  });
}
