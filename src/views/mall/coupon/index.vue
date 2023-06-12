<template>
  <div class="coupon">
    <van-sticky> <van-nav-bar title="优惠券详情" /></van-sticky>
    <van-skeleton title :row="15" :loading="loading">
      <div class="coupon-detail">
        <div class="flex just-between items top">
          <div class="name">充值抵扣券</div>
          <div class="money"><span>¥</span>{{ coupon.amount }}</div>
        </div>
        <div class="flex just-between limit">
          <div>有效期：{{ coupon.period_content }}</div>
          <div>{{ coupon.amount_content }}</div>
        </div>
        <div class="item-footer">
          <div>仅限在{{ coupon.game_name }}中充值使用</div>
          <div class="flex just-between rule" @click="rule = !rule">
            使用规则&nbsp;<svg-icon name="down" />
          </div>
        </div>
        <div class="desc" v-if="rule">{{ coupon.rule_content }}</div>
      </div>
      <div class="title">商品内容</div>
      <div class="content-flex">
        <div class="flex just-between items">
          <div class="name">{{ info.product_name }}</div>
          <div class="txt-color">库存：{{ info.inventory || 0 }}</div>
        </div>
        <div class="flex just-between">
          <div>兑换所需积分：</div>
          <div class="integral"><i></i> {{ info.integral || 0 }}</div>
        </div>
        <div class="flex just-between">
          <div>使用条件：</div>
          <div class="txt-color">
            {{ coupon.amount_content }} <br />
            {{ info.restriction_description }}
          </div>
        </div>
      </div>
      <div class="title">商品介绍</div>
      <div class="txt-color mt" v-html="info.detail"></div>
      <div class="txt-color mt">
        用户不得以任何不正当手段参与本活动（包括但不限于虚假信息、虚拟机注册等手段），如存在违规行为，辰星俱乐部有权收回已发放的奖励，情节严重者将封禁账号，并保留追究用户责任的权利。
      </div>
      <div class="title small">商品有效期</div>
      <div class="txt-color mt">有效期至：{{ coupon.period_content }}</div>
      <div class="title small">商品使用说明</div>
      <div class="txt-color mt">
        在法律法规许可的范围内，平台有权根据实际情况对规则进行调整，相关变动将实时公布至活动页面，公布后依法生效。
      </div>
      <div class="btn-warp">
        <v-button @click="handBuy()">立即兑换</v-button>
      </div>
    </van-skeleton>
    <v-exchangeProps
      round
      v-model="showSuccess"
      :title="result.success ? '兑换成功' : '兑换失败'"
      :footer="null"
      closeable
    >
      <div v-show="result.success" class="model-txt">
        <img src="./images/success.png" width="60" alt="" />
        <br />
        <div>代金券已激活并放置在我的代金券中 您可以点击前往查看;</div>
        <div>
          <br />
          <v-button @click="goList">去查看</v-button>
        </div>
      </div>
      <div v-show="!result.success" class="model-txt">
        <img src="./images/error.png" alt="" width="60" />
        <br />
        <div>{{ result.msg }}</div>
      </div>
    </v-exchangeProps>
  </div>
</template>
<script>
import "icons/down.svg";
import vExchangeProps from "@/components/game/exchangeProps.vue";
import { couponDetail, couponExchange } from "@/api/mall";
import AppAction, { actionMap } from "@/utils/app-action";
import { Skeleton, NavBar, Sticky } from "vant";
export default {
  name: "couponDetail",
  components: {
    [Skeleton.name]: Skeleton,
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    vExchangeProps,
  },
  data() {
    return {
      info: {},
      rule: false,
      loading: true,
      showSuccess: false,
      result: {},
    };
  },
  created() {
    this.handLoad();
  },
  computed: {
    coupon() {
      return this.info.coupon || {};
    },
  },
  methods: {
    async handLoad() {
      const { success, data, msg } = await couponDetail({
        id: this.$route.params.id,
      });
      this.loading = false;
      if (success) {
        this.info = data;
      } else {
        this.$Toast.fail(msg);
      }
    },
    goList() {
      AppAction(actionMap.Coupon);
    },
    async handBuy() {
      const $toast = this.$Toast.loading({
        duration: 0,
      });
      const { success, msg } = await couponExchange({
        id: this.$route.params.id,
      });
      $toast.clear();
      this.showSuccess = true;
      this.result = {
        success,
        msg,
      };
    },
  },
};
</script>
<style lang="less" scoped>
.coupon {
  min-height: 100vh;
  position: relative;
  padding-top: 1px;
  padding-bottom: 100px;
  .model-txt {
    font-size: 28px;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
  &-detail {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 30px;
    border: 30px solid rgba(249, 249, 249, 1);
    border-top-width: 20px;
    border-bottom-width: 20px;
    .top {
      padding-top: 32px;
      padding-bottom: 18px;
      .name {
        font-weight: bold;
        font-size: 28px;
      }
      .money {
        font-size: 60px;
        color: rgba(84, 152, 255, 1);
        font-weight: bold;
        span {
          font-size: 24px;
        }
      }
    }
    .limit {
      font-size: 28px;
      color: rgba(0, 0, 0, 0.5);
      padding-bottom: 28px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.5);
      font-size: 24px;
      line-height: 1.6;
      padding-bottom: 28px;
      text-align: left;
      white-space: pre-line;
    }
    .item-footer {
      display: flex;
      font-size: 24px;
      align-items: center;
      justify-content: space-between;
      color: #000;
      height: 80px;
      border-top: 1px rgba(0, 0, 0, 0.08) dashed;
      .rule {
        color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
      }
    }
  }
  .title {
    margin: 0 auto;
    position: relative;
    font-weight: bold;
    font-size: 32px;
    padding: 0 30px;
    line-height: 88px;
    &.small {
      font-size: 30px;
      margin: 20px 0;
      line-height: 1;
      &::after,
      &::before {
        display: none;
      }
    }
    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      width: 6px;
      height: 24px;
      background: linear-gradient(
        to bottom,
        rgba(84, 152, 255, 1),
        rgba(0, 217, 208, 1)
      );
    }
    &:after {
      position: absolute;
      bottom: 0;
      content: "";
      left: 30px;
      width: 690px;
      background: rgba(0, 0, 0, 0.03);
      height: 1px;
    }
  }
  .txt-color {
    line-height: 1.6;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.5);
    &.mt {
      padding: 0 30px;
      margin-top: 20px;
      margin-bottom: 24px;
    }
  }
  .content-flex {
    padding: 0 32px;
    color: rgba(27, 30, 36, 1);
    .flex {
      margin: 32px 0;
    }
    .txt-color {
      text-align: right;
    }
    .name {
      font-size: 32px;
      font-weight: bold;
    }
    .integral {
      display: flex;
      color: rgba(255, 150, 0, 1);
      align-items: center;
      i {
        display: inline-block;
        width: 32px;
        height: 32px;
        .img("masonry","png");
        margin-right: 16px;
      }
    }
  }
  .btn-warp {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 0 64px;
    .safe-bottom(20px);
  }
}
</style>
