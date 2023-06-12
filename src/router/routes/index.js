import layoutShare from "@/layout/layoutShare.vue";
const _import = (name) => {
  return () => import(`@/views/${name}`);
};
export default [
  {
    path: "/",
    component: layoutShare,
    meta: {
      login: false,
    },
    children: [
      {
        path: "home",
        name: "home",
        component: _import("home"),
        meta: { title: "首页" },
      },
      {
        path: "game/:id(\\d+)(-)?:gift?",
        name: "game",
        component: _import("game/index"),
        meta: {
          title: "游戏详情",
          point: "game_detail",
        },
      },
      {
        path: "/about",
        name: "about",
        component: _import("about"),
        meta: {
          title: "关于我们",
        },
      },
    ],
  },
  {
    path: "/article/:id",
    name: "article",
    component: _import("article/index"),
    meta: {
      title: "资讯详情",
      point: "Information_details",
      login: false,
    },
  },
  {
    path: "/welfare/center",
    name: "welfareCenter",
    component: _import("welfare-center/"),
    meta: {
      title: "福利中心",
      point: "welfare",
    },
  },
];
