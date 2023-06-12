const _import = (name) => {
  return () => import(`@/views/mall/${name}`);
};
export default [
  {
    path: "/mall",
    name: "mall",
    redirect: "/mall/index",
    component: {
      render: (h) =>
        h("keep-alive", { props: { include: ["mallIndex"] } }, [
          h("router-view"),
        ]),
    },
    // component: { render: (h) => h("router-view") },
    meta: {
      title: "积分商城",
      login: true,
    },
    children: [
      {
        path: "index",
        name: "mallIndex",
        component: _import("index"),
        meta: {
          title: "周边商城",
          point: "mall_wares",
        },
      },
      {
        path: "game",
        name: "mallGame",
        component: _import("game"),
        meta: {
          title: "游戏道具",
          point: "mall_prop",
        },
      },
      {
        path: "detail/:id",
        name: "mallDetail",
        component: _import("detail"),
        meta: {
          point: "mall_wares_details",
          title: "商品明细",
        },
      },
      {
        path: "coupon/:id",
        name: "couponDetail",
        component: _import("coupon/index.vue"),
        meta: {
          point: "coupon_details",
          title: "代金券详情",
        },
      },
      {
        path: "order/confirm/:id-:sku",
        name: "mallOrderConfirm",
        component: _import("orderConfirm"),
        meta: {
          title: "确认订单",
          point: "mall_order_confirm",
        },
      },
      {
        path: "order/list",
        name: "mallOrderlist",
        component: _import("orderList"),
        meta: {
          title: "订单列表",
          point: "mall_order_list",
        },
      },
      {
        path: "order/detail/:id",
        name: "mallOrderDetail",
        component: _import("orderDetail"),
        meta: {
          title: "订单详情",
          point: "mall_order_details",
        },
      },
    ],
  },
];
