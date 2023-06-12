<template>
  <div class="detail">
    <van-skeleton title :row="15" :loading="loading">
      <template v-if="!empty">
        <div>
          <div class="detailed">
            <div class="detailed-title">
              {{ info.title }}
            </div>
            <div class="detailed-content" v-html="info.content"></div>
            <div class="tags top">
              <span v-for="item in tags"> {{ item }} </span>
            </div>
            <div class="detailed-footer">
              <div class="detailed-time">发布于{{ info.time }}</div>
              <div class="detailed-like">
                <div
                  @click="likeFun"
                  :class="['icon-like', { liked: info.liked }]"
                ></div>
                <div class="like-num">
                  {{ likeFilter || 0 }}
                </div>
              </div>
            </div>
          </div>
          <div class="news-link" v-if="info.next_article || info.pre_article">
            <router-link
              :to="`/article/${info.next_article.id}`"
              class="item"
              v-if="info.next_article && info.next_article.id"
              :replace="true"
            >
              <div class="item-left">
                <div class="name">【下一篇】{{ info.next_article.title }}</div>
                <div class="flex">
                  <div class="tags ellipsis nowrap">
                    <span v-for="item in getTags(info.next_article.tags)">{{
                      item
                    }}</span>
                  </div>
                  <div class="time">{{ info.next_article.time }}</div>
                </div>
              </div>
              <van-image
                :src="info.next_article.cover_url"
                class="img"
              ></van-image>
            </router-link>
            <router-link
              :to="`/article/${info.pre_article.id}`"
              class="item"
              v-if="info.pre_article && info.pre_article.id"
              :replace="true"
            >
              <div class="item-left">
                <div class="name">【上一篇】{{ info.pre_article.title }}</div>
                <div class="flex">
                  <div class="tags ellipsis nowrap">
                    <span v-for="item in getTags(info.pre_article.tags)">{{
                      item
                    }}</span>
                  </div>
                  <div class="time">{{ info.pre_article.time }}</div>
                </div>
              </div>
              <van-image
                :src="info.pre_article.cover_url"
                class="img"
              ></van-image>
            </router-link>
          </div>
        </div>
      </template>
      <v-empty
        v-else
        style="min-height: 90vh"
        description="啊哦，你要找的资讯丢失了！"
      />
    </van-skeleton>
  </div>
</template>

<script>
import { Skeleton } from "vant";
import { articleInfo, articleLike } from "@/api/article";
import appAction, { actionMap } from "@/utils/app-action";
import { delHtmlTag } from "@/utils";
export default {
  name: "articleHome",
  components: {
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      themeVars: {},
      info: {},
      loading: true,
      empty: false,
    };
  },
  created() {
    this.getData(this.$route.params.id);
  },
  computed: {
    tags() {
      return this.getTags(this.info.tags);
    },
    isLogin() {
      console.log(this.$store.getters.isLogin);
      return this.$store.getters.isLogin;
    },
    likeFilter() {
      const { likes } = this.info;
      if (likes >= 10000) {
        return Number.parseInt(likes / 10000) + "w+";
      } else {
        return likes;
      }
    },
  },
  watch: {
    "$route.params.id"(v) {
      this.getData(v);
    },
  },
  methods: {
    getTags(tags = "") {
      return tags ? tags.split(",") : [];
    },
    async likeFun() {
      if (!this.isLogin) {
        this.info.likes += !this.info.liked ? 1 : -1;
        return (this.info.liked = !this.info.liked);
      }
      const { success } = await articleLike(this.$route.params.id);
      if (success) {
        this.info.liked = !this.info.liked;
        appAction(actionMap.articleLike, {
          id: this.$route.params.id,
          like: this.info.liked,
        });
        this.info.likes += this.info.liked ? 1 : -1;
      }
    },
    async getData(article_id) {
      try {
        const { success, data } = await articleInfo(article_id);
        this.$nextTick(() => {
          this.loading = false;
        });
        if (success) {
          this.info = data;
          document.title = data.title;
          appAction(actionMap.setShare, {
            url: window.location.href,
            title: data.title,
            describe: delHtmlTag(data.content || "").slice(0, 50),
          });
        } else {
          this.empty = true;
        }
      } finally {
        document.querySelector("#app").scrollTo(0, 0);
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
<style>
.detailed-content img {
  max-width: 100%;
}
</style>
<style lang="less" scoped>
.detail {
  padding-top: 32px;
}

.detailed {
  padding: 0 32px;

  &-title {
    line-height: 56px;
    margin-top: 20px;
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 0;
  }

  &-time {
    display: flex;
    color: @cl-second;

    .author {
      margin-right: 24px;
      color: @main;
    }
  }

  &-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 60px 0;
  }

  .detailed-content {
    max-width: 100%;
    overflow: hidden;
    line-height: 1.6;
    font-size: 32px;
    margin-top: 32px;
  }

  &-like {
    display: flex;
    align-items: center;
  }

  .icon-like {
    width: 40px;
    height: 40px;
    .img("like", "png");

    &.liked {
      .img("liked", "png");
    }
  }

  .like-num {
    color: @main;
    margin-left: 16px;
  }

  .line::after {
    .line-t();
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  color: #5a9cff;

  &.top {
    margin-top: 60px;
  }

  &.nowrap {
    white-space: nowrap;
    flex-wrap: nowrap;
    margin-right: 10px;
  }

  span {
    margin-right: 18px;
  }
}

.flex {
  display: flex;
  justify-content: space-between;
}

.news-link {
  padding: 0 30px;
  border-top: 18px solid rgba(0, 0, 0, 0.05);

  .item {
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    line-height: 1.6;
    overflow: hidden;

    .item-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      flex: 1;

      .time {
        color: rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
      }
    }
  }

  .name {
    .multi-ellipsis(2);
  }

  .img {
    width: 236px;
    height: 148px;
    flex-shrink: 0;
    margin-left: 30px;
    border-radius: 12px;
    overflow: hidden;
  }
}
</style>
