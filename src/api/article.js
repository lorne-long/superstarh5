/* eslint-disable */
import { defHttp } from "http/request";

const API = {
  articleInfo: "/article/detail", ////资讯详情
  articleLike: "/article/like", ////资讯like
};

export const articleInfo = (article_id) =>
  defHttp.post(API.articleInfo, { article_id }); //资讯详情
export const articleLike = (article_id) =>
  defHttp.post(API.articleLike, { article_id }); //资讯详情
