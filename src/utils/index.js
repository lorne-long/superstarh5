import dayjs from "dayjs";
export function formatDate(date, fmt) {
  return dayjs(date).format(fmt);
}
var ua = window.navigator.userAgent.toLowerCase();
function openInWebview() {
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return false;
  } else if (ua.match(/QQ/i) == "qq") {
    return false;
  } else if (ua.match(/WeiBo/i) == "weibo") {
    return false;
  } else {
    if (ua.match(/Android/i) != null) {
      return ua.match(/browser/i) == null;
    } else if (ua.match(/iPhone/i) != null) {
      return ua.match(/safari/i) == null;
    } else {
      return ua.match(/macintosh/i) == null && ua.match(/windows/i) == null;
    }
  }
}
export const platform = {
  myApp:
    process.env.NODE_ENV === "development"
      ? true
      : ua.match(/chenstar/i) == "chenstar" || openInWebview(), //||process.env.NODE_ENV === "development", //是否晨星APP or webview
  trident: ua.indexOf("trident") > -1, //IE内核
  presto: ua.indexOf("presto") > -1, //opera内核
  webKit: ua.indexOf("applewebKit") > -1, //苹果、谷歌内核
  gecko: ua.indexOf("gecko") > -1 && ua.indexOf("khtml") == -1, //火狐内核
  mobile: !!ua.match(/AppleWebKit.*Mobile.*/i), //是否为移动终端
  ios:
    /(iPhone|iPad|iPod|iOS)/i.test(ua) ||
    !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i), //ios终端
  android: ua.indexOf("android") > -1 || ua.indexOf("linux") > -1, //android终端或者uc浏览器
  iPhone: ua.indexOf("iphone") > -1, //是否为iPhone或者QQHD浏览器
  iPad: ua.indexOf("ipad") > -1, //是否iPad
  webApp: ua.indexOf("safari") == -1, //是否web应该程序，没有头部与底部
  weixin: ua.match(/microMessenger/i) == "micromessenger", //是否微信
  qq: ua.match(/\sQQ/i) == " qq", //是否QQ
  weibo: ua.match(/WeiBo/i) == "weibo", //是否QQ
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
};
function getDpi() {
  var arrDPI = new Array();
  if (window.screen.deviceXDPI != undefined) {
    arrDPI[0] = window.screen.deviceXDPI;
    arrDPI[1] = window.screen.deviceYDPI;
  } else {
    var tmpNode = document.createElement("DIV");
    tmpNode.style.cssText =
      "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild(tmpNode);
    arrDPI[0] = parseInt(tmpNode.offsetWidth);
    arrDPI[1] = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
  }
  return arrDPI;
}
export const DPR = Math.floor(window.devicePixelRatio || 2);
export const DPI = getDpi();

export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, "");
}
