<template>
  <div class="item" :class="{ fixed }" @click="onClick($event)">
    <div class="is-hot" v-if="source.is_hot == 1"></div>
    <div class="item-img">
      <img
        v-if="!fixed"
        class="img"
        v-lazy="source.main_images_url || source.main_image_url"
      />
      <div class="coupon-amout" v-else>
        <div class="price"><span>￥</span>{{ batches.amount }}</div>
        <div>{{ batches.game_name }}</div>
      </div>
    </div>
    <div class="item-price flex items">
      <span class="icon"></span>
      <span>积分：</span>
      <span>{{ source.integral }}</span>
    </div>
    <div class="item-info">
      <div class="item-name">
        {{ source.name || props.name }}
      </div>
      <div class="item-condition" v-if="batches.amount_limit">
        满{{ batches.amount_limit }}元充值抵扣
      </div>
      <div class="item-condition">
        {{ source.restriction_description }}
      </div>
      <v-button
        class="item-btn"
        size="small"
        :disabled="source.inventory == 0"
        >{{ source.inventory == 0 ? "库存不足" : "兑换" }}</v-button
      >
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from "vant";
import vPrice from "@/components/mall/price";
import { Lazyload } from "vant";
export default {
  components: { VanImage, vPrice },
  directives: {
    Lazyload,
  },
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
    index: {
      // 每一行的索引
      type: Number,
    },
    itemClick: Function,
    gameId: [String, Number],
    source: {
      // 每一行的内容
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    batches() {
      return this.source.batches ? this.source.batches[0] : {};
    },
    props() {
      return this.source.props || {};
    },
  },
  methods: {
    onClick($event) {
      if (this.gameId == -99) {
        this.$router.push({
          name: "mallDetail",
          params: { id: this.source.id },
        });
      } else {
        this.$router.push({
          name: "couponDetail",
          params: { id: this.source.id },
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.item {
  position: relative;
  background: @bg-match;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 24px;
  width: 331px;
  break-inside: avoid;
  text-align: center;
  .img {
    object-fit: contain;
    max-width: 100%;
  }
  &.fixed {
    .item-img {
      width: 331px;
      height: 232px;
      object-fit: scale-down;
      overflow: hidden;
      background-color: #fff;
    }
  }
  .coupon-amout {
    height: 156px;
    width: 256px;
    margin: 38px auto 0;
    line-height: 56px;
    color: #fff;
    .img("mall/coupon","png");
    font-size: 24px;
    .price {
      font-size: 60px;
      line-height: 100px;
      height: 100px;
      font-weight: bold;
      span {
        font-weight: lighter;
        font-size: 30px;
      }
    }
  }
  &-img {
    background-color: #f8f8f8;
    border-radius: 8px 8px 0 0;
    margin: 0 auto;
  }
  .item-info {
    padding: 0 24px 24px;
    text-align: left;
  }
  &-name {
    font-size: 28px;
    margin: 16px 0;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 36px;
    .multi-ellipsis(2);
  }
  &-deduct {
    line-height: 28px;
    span {
      border: 1px solid rgba(255, 219, 0, 0.7);
      border-radius: 4px;
      display: inline-block;
      font-size: 24px;
      transform-origin: 0 0;
      transform: scale(0.83);
      padding: 0 8px;
      margin-top: 8px;
      color: #ffdb00;
    }
  }
  &-condition {
    font-size: 24px;
    color: #999999;
    line-height: 32px;
    margin-top: 16px;
    // height: 72px;
    .multi-ellipsis(2);
  }
  &-btn {
    margin-top: 24px;
  }
  .is-hot {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 52px;
    width: 52px;
    .img("mall/hot");
    z-index: 2;
  }
  .item-price {
    padding: 0 24px;
    background: linear-gradient(
      to left,
      rgba(255, 67, 32, 0),
      rgba(255, 128, 44, 0.1)
    );
    line-height: 52px;
    color: rgba(255, 150, 0, 1);
    margin-top: 0;
    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      .img("masonry","png");
      margin-right: 12px;
    }
  }
}
</style>
