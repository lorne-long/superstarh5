const _import = (name) => {
  return () => import(`@/views/activity/${name}`);
};
import layoutShare from "@/layout/layoutShare.vue";
import layoutMain from "@/layout/layoutMain.vue";
export default [
  {
    path: "/activity",
    name: "activity",
    component: layoutShare, //需要分享
    meta: {
      login: false,
    },
    children: [
      {
        path: "treasury",
        name: "activity_treasury",
        component: _import("treasury"),
        meta: {
          title: "星仔宝库",
          share: {
            title: "星仔宝库",
            describe: "星仔宝库~更多好礼等你来拿~",
          },
          point: "activity_006",
        },
      },
      {
        path: "noob",
        name: "activity_noob",
        component: _import("noob"),
        meta: {
          title: "超级幸运大转盘",
          share: {
            title: "超级幸运大转盘",
            describe: "大量新人好礼等你来拿~~",
          },
          point: "activity_005",
        },
      },
      {
        path: "superWelfare/:id?",
        name: "activity_superWelfare",
        component: _import("super-welfare"),
        meta: {
          title: "星仔超级福利",
          share: {
            title: "星仔的超级福利",
            describe: "星仔的丰厚福利，让您拿到手软~",
          },
          point: "activity_003",
        },
      },
      {
        path: "luckyDraw",
        name: "activity_luckyDraw",
        component: _import("lucky-draw"),
        meta: {
          title: "积分夺宝",
          share: {
            title: "积分夺宝",
            describe: "幸运抽奖，赢取豪华大礼，等你来！~",
          },
          point: "activity_004",
        },
      },
      {
        path: "starBoy/:id?",
        name: "activity_starBoy",
        component: _import("star-boy"),
        meta: {
          title: "星仔旅途",
          share: {
            title: "星仔的旅途",
            describe: "星仔旅途冲冲冲，带你一起环游宇宙了~",
          },
          point: "activity_001",
        },
      },
      {
        path: "inviteFriends/:code?",
        name: "activity_inviteFriends",
        component: _import("invite-friends/index/"),
        meta: {
          title: "邀请好友领福利",
          share: {
            title: "邀请好友有礼",
            describe: "好友邀请一起兑换超值福利啦~",
          },
          point: "activity_002",
        },
      },
    ],
  },
  {
    path: "/activity",
    component: layoutMain, //不需要分享
    meta: {
      login: false,
    },
    children: [
      {
        path: "jzjhq",
        name: "activity_jzjhq",
        component: _import("jzjhq"),
        meta: {
          title: "九州江湖情",
        },
      },
      {
        path: "inviteFriends/ranking",
        name: "activity_inviteFriends_ranking",
        component: _import("invite-friends/ranking/"),
        meta: { title: "邀请排名" },
      },
      {
        path: "inviteFriends/my-invite/:id?",
        name: "activity_inviteFriends_my",
        component: _import("invite-friends/my-invite/"),
        meta: { title: "我的邀请" },
      },
    ],
  },
];
