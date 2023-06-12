import { defHttp } from "http/request";
const API = {
  OrderDetail: "/get_order_detail", //我的积分列表
  OrderList: "/get_order_list", //我的积分列表

  ExchangeProps: "/exchange_props_request", //兑换
  addOrder: "/add_order", //实物购买

  ProductList: "/get_product_list", //产品
  ProductDetail: "/get_product_detail", //产品
  PropList: "/get_props_product_list", //游戏道具列表

  AddressList: "/myinfo/info/address_list", //游戏道具列表
};
export const OrderDetail = (order_id) =>
  defHttp.post(API.OrderDetail, { order_id }); //订单详情
export const OrderList = (data) => defHttp.post(API.OrderList, data); //订单列表
export const addOrder = (data) => defHttp.post(API.addOrder, data); //订单列表

export const ExchangeProps = (data) => defHttp.post(API.ExchangeProps, data); //兑换道具

export const ProductList = (data) => defHttp.post(API.ProductList, data); //实物列表
export const ProductDetail = (data) => defHttp.post(API.ProductDetail, data); //实物明细

export const PropList = (data) => defHttp.post(API.PropList, data); //游戏道具列表
export const AddressList = (data = {}) => defHttp.post(API.AddressList, data); //地址列表

export const couponList = (data = {}) =>
  defHttp.post("/integral/coupon/list", data); //积分商城 - 代金券商品列表
export const couponDetail = (data = {}) =>
  defHttp.post("/integral/coupon/detail", data); //积分商城 - 代金券商品详情
export const couponExchange = (data = {}) =>
  defHttp.post("/integral/coupon/exchange", data); //积分商城 - 代金券商品兑换
