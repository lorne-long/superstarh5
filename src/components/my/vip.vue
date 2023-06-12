<template>
  <div :class="`my-vip v${userInfo.platform_vip_level}`">
    <div class="top">
      <div :class="`avatar v${userInfo.platform_vip_level}`">
        <img :src="avatar" alt="" />
        <!-- <div class="mask"></div> -->
      </div>
      <div>
        <div :class="`vip-level v${userInfo.platform_vip_level}`"></div>
        <div>
          {{ userInfo.nickname | hide }}
        </div>
      </div>
    </div>
    <div class="vip-data">
      <template v-if="type">
        <router-link :to="{ name: 'myPowerInfo' }" class="item-data">
          <div class="data-val">{{ userInfo.total_grow || 0 }}</div>
          <div>总成长值</div>
        </router-link>
        <div class="item-data">
          <div class="data-val">{{ userInfo.frozen_grow || 0 }}</div>
          <div>冻结</div>
        </div>
      </template>
      <template v-else>
        <div class="item-data">
          <div class="data-val">{{ userInfo.integral || 0 }}</div>
          <div>总积分</div>
        </div>
        <div class="item-data">
          <div class="data-val">{{ userInfo.about_expire_integral || 0 }}</div>
          <div>即将过期</div>
        </div>
      </template>
    </div>
    <div class="rule">
      <slot name="rule"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: { type: { tyep: Number, default: 0 } }, //0积分 1成长值
  computed: {
    ...mapGetters(["userInfo", "avatar"]),
  },
  data() {
    return {
      info: {},
    };
  },

  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      await this.$store.dispatch("getUserInfo");
    },
  },
};
</script>
<style lang="less" scoped>
@viplevel: 0, 1, 2, 3, 4, 5;
.my-vip {
  position: relative;
  height: 348px;
  border-radius: 10px;
  each(@viplevel,{
  &.v@{value}{
      .img('vip/v@{value}-bg');
      background-size: 100% 100%;
      // .mask{
      //   .img('vip/头像框-v@{value}');
      // }
      .vip-level{
         .img('vip/v@{value}');
      }
    }
  });
  .top {
    display: flex;
    padding: 12px 0 0 32px;
    line-height: 42px;
    color: #fff;
    font-size: 36px;
    font-weight: 400;
  }
  .avatar {
    width: 172px;
    height: 172px;
    padding: 28px;
    overflow: hidden;
    position: relative;
    margin-right: 20px;
    // each(@viplevel, {&.v @{value} .mask{.img("vip/头像框-v@{value}") ;}});
    img {
      width: 100%;
      border-radius: 50%;
    }
    .mask {
      height: 100%;
      width: 100%;
      z-index: 20;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .vip-level {
    margin: 32px 0 8px;
    width: 132px;
    height: 64px;
  }
  .vip-data {
    display: flex;
    text-align: center;
    color: #fff;
    margin-top: 24px;
    position: relative;
    .item-data {
      width: 33.3333%;
      flex-shrink: 0;
      flex-grow: 1;
      position: relative;
      &:last-child::after {
        display: none;
      }
      &::after {
        .line-r(#fff,10%);
        height: 80%;
        opacity: 0.5;
      }
    }
    .data-val {
      font-size: 48px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 58px;
      margin-bottom: 8px;
    }
  }
  .rule {
    position: absolute;
    top: 32px;
    right: 32px;
    color: #fff;
  }
}
</style>
