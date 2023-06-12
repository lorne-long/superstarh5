<template>
  <Popup class="visible" round :value="value" @input="(e) => $emit('input', e)">
    <div class="popup-warp">
      <div class="top"></div>
      <div class="title">签到7天为一个周期，断签重新计算。</div>
      <ul class="popup-content">
        <li v-for="(item, i) in rule" :key="i" class="rule-item">
          <div class="flex items">
            <div class="icon-calendar"></div>
            <div>第{{ txtMap[i] }}天</div>
          </div>
          <div class="integral">
            <i class="i"></i>
            <span>+{{ item }}</span>
          </div>
        </li>
      </ul>
      <v-button class="rule-btn" @click="$emit('input', false)"
        >我知道了</v-button
      >
    </div>
  </Popup>
</template>
<script>
import { Popup } from "vant";

export default {
  components: { Popup },
  props: {
    rule: { type: Array, default: () => [] },
    value: { type: Boolean, default: false },
  },
  data() {
    return { txtMap: "一二三四五六七" };
  },
};
</script>
<style lang="less" scoped>
.popup-warp {
  border-radius: 16px;
  padding: 0 0 32px;
  background-position: right 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: @bg-match;
  color: @body;
  background-image: url(~@/assets/tmd2.png);
  width: 584px;
  font-size: 28px;
  .top {
    position: relative;
    width: 488px;
    height: 121px;
    margin: 0 auto 0;
    top: -36px;
    .img("signin/签到规则");
  }
  .title {
    font-size: 28px;
    letter-spacing: 0;
    line-height: 34px;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 38px;
    text-align: center;
  }
  .popup-content {
    position: relative;
    margin: 0 97px;
    font-size: 28px;
    line-height: 44px;
    font-weight: bold;
    &::after {
      content: "";
      position: absolute;
      left: 15px;
      width: 2px;
      background: #5199fd;
      height: calc(100% - 24px);
      top: 12px;
    }
    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .icon-calendar {
      position: relative;
      z-index: 2;
      height: 32px;
      width: 32px;
      .img("signin/时间轴");
      margin-right: 40px;
    }
    .integral {
      color: @cl-four;
      font-weight: 400;
      font-size: 36px;
      text-align: right;
      span {
        display: inline-block;

        white-space: nowrap;
      }
    }
    .i {
      display: inline-block;
      width: 28px;
      height: 28px;
      margin-right: 12px;
      .img("signin/积分");
    }
  }
  .rule-btn {
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    width: 80%;
    margin: 0 auto;
  }
}
</style>
