<template>
  <PullRefresh v-model="isRefresh" :disabled="visabled" @refresh="getData">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-gather="'banner'"
    >
      <van-swipe-item v-for="(item, i) in banners" :key="i">
        <van-image
          width="100%"
          height="100%"
          :src="item.image"
          @click="clickSwipe(item)"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="welfare-center">
      <signIn ref="sign" />
      <div class="title">热门推荐游戏</div>
      <div style="text-align: center; padding: 1em 0" v-show="loading">
        <van-loading type="spinner" class="loading" size="14" />
      </div>
      <v-empty
        image="bag"
        v-show="!loading && list.length == 0"
        description="呀，当前暂无游戏礼包"
      />
      <div
        class="game-item"
        v-for="(item, i) in list"
        :key="i"
        :style="{
          backgroundImage: `url(${item.game.welfare_background_image})`,
        }"
      >
        <div class="item-top">
          <img class="game-logo" :src="item.game.logo" :alt="item.game.name" />
          <div class="game-name">
            <div class="name">{{ item.game.name }}</div>
            <div class="desc">{{ item.game.description }}</div>
          </div>
        </div>
        <div class="prop-list" @click="GiftMore(item, i)">
          <van-image
            class="img"
            v-for="(item, i) in item.props_images"
            :key="i"
            fit="contain"
            :src="item"
            :lazy-load="true"
          />
        </div>
        <div class="game-footer line-t" @click="GiftMore(item, i)">
          <div>
            共{{ item.props_bags_total }}款礼包，
            <span class="second">{{ item.pending_total }}</span
            >款待领取
          </div>
          <span>
            <svg-icon className="icon" name="down" />
          </span>
        </div>
      </div>
    </div>
    <Welfare
      ref="Welfare"
      @change="bindChange"
      v-model="visabled"
      :item="item"
    />
  </PullRefresh>
</template>
<script>
import signIn from "@/components/signIn/index";
import "icons/down.svg";
import { Swipe, SwipeItem, PullRefresh } from "vant";
import Welfare from "./welfare.vue";
import { WelfareList } from "@/api/welfare";
import AppAction, { actionMap } from "@/utils/app-action";
export default {
  components: {
    signIn,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Welfare,
    PullRefresh,
  },
  data() {
    return {
      banners: [],
      list: [],
      item: {},
      loading: false,
      isRefresh: false,
      visabled: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    bindChange() {
      this.item.pending_total--;
    },
    GiftMore(item) {
      this.visabled = true;
      this.item = item;
    },
    clickSwipe(item) {
      AppAction(actionMap.bannerAction, item);
    },
    async getData() {
      this.$refs.sign && this.$refs.sign.getData();
      this.loading = true;
      const { data, success, msg } = await WelfareList();
      this.loading = this.isRefresh = false;
      if (success) {
        const { banners, items } = data || {};
        this.banners = banners || [];
        this.list = items || [];
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.my-swipe {
  height: 422px;
  img {
    width: 100%;
    object-fit: fill;
  }
}
.welfare-center {
  padding: 0.1px 32px 32px;
  background-image: @bg-img;
  min-height: calc(100vh - 422px);
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 32px 0;
    font-size: 36px;

    line-height: 44px;
    font-weight: bold;
    .rule {
      font-size: 28px;
      color: #666;
      font-weight: lighter;
    }
  }
  .game-item {
    position: relative;
    background-size: 100% 100%;
    border-radius: 8px;
    margin-top: 54px;
    // background-image: url(https://www.honda.co.jp/content/dam/site/www/news/cq_img/1998/10/2981028_01.jpg),
    //   linear-gradient(
    //     270deg,
    //     rgba(255, 255, 255, 0) 31%,
    //     rgba(255, 255, 255, 0.8) 68%
    //   );
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.15);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .scheme(background-image,linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0.7)
      ),linear-gradient(0deg, rgba(0, 0, 0,0.5),rgba(0, 0, 0,0.5)));

      z-index: 1;
      border-radius: 8px;
    }

    .item-top {
      z-index: 2;
      display: flex;
      position: relative;
      padding-left: 32px;
      .game-logo {
        width: 112px;
        height: 112px;
        margin-top: -22px;
        border-radius: 8px;
        object-fit: scale-down;
      }
    }
    .game-name {
      z-index: 2;
      position: relative;
      margin-top: 16px;
      margin-left: 32px;
      font-size: 28px;
      line-height: 34px;
      font-weight: 400;
      .desc {
        font-size: 24px;
        line-height: 30px;
        margin-top: 8px;
        color: @cl-three;
      }
    }
  }
  .prop-list {
    z-index: 2;
    position: relative;
    padding: 32px 0 32px 32px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    .img {
      width: 72px;
      height: 72px;
      margin-right: 16px;
      flex-shrink: 0;
    }
  }
  .game-footer {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    line-height: 72px;
    &::after {
      border-top-color: @line1;
    }
  }
}
</style>
