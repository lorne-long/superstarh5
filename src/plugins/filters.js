import Vue from "vue";
import dayjs from "dayjs";
Vue.filter("format", function (val, format = "YYYY-MM-DD") {
  const item = dayjs(val);
  //逻辑代码
  return item.format(format);
});
Vue.filter("hide", function (str = "", frontLen = 3, endLen = 4) {
  const reg = new RegExp(`(.{${frontLen}}).*(.{${endLen}})`);
  return str.replace(reg, "$1****$2");
});
