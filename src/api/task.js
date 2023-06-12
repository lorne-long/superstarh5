/* eslint-disable */
import { defHttp } from "http/request";
const API = {
  SignInfo: "/task/sign_in_info", //获取当天签到情况
  TaskSignin: "/task/sign_in", //签到
  TaskCenter: "/task/center", ////任务中心主页
  TaskGet: "/task/get", ////任务中心主页
};

export const SignInfo = (data) => defHttp.post(API.SignInfo, data || {});
export const TaskSignin = (data) => defHttp.post(API.TaskSignin, data || {});
export const TaskCenter = (data) => defHttp.post(API.TaskCenter, data || {});
export const TaskGet = (task_type) => defHttp.post(API.TaskGet, { task_type });
