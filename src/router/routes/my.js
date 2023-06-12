const _import = (name) => {
  return () => import(`@/views/my/${name}`);
};
export default [
  {
    path: "/my/integral",
    name: "myIntegral",
    component: _import("integral/index"),
    meta: {
      title: "我的积分",
      login: true,
    },
  },
  {
    path: "/my/power",
    name: "myPower",
    component: _import("power/index"),
    meta: {
      title: "我的权益",
      login: true,
    },
  },
  {
    path: "/my/power-info",
    name: "myPowerInfo",
    component: _import("powerInfo/index"),
    meta: {
      title: "成长值明细",
      login: true,
    },
  },
  {
    path: "/my/gift-log",
    name: "giftLog",
    component: _import("gift-log/index"),
    meta: {
      title: "礼包记录",
      login: true,
    },
  },
  {
    path: "/task/center",
    name: "taskCenter",
    component: _import("task-center/index"),
    meta: {
      title: "任务中心",
      login: true,
      point: 'task_center'
    },
  },
];
