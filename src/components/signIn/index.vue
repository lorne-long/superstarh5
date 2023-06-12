<template>
  <div class="sign-box line-b">
    <template v-if="!can_sign_in">
      <div class="title">
        每日签到领积分
        <span class="rule" @click="ruleShow = true">签到规则</span>
      </div>
      <div class="sign-list">
        <input type="text" disabled />
        <div
          v-for="(item, idx) in 7"
          :key="idx"
          class="sign-task"
          @click="idx == num ? signIn() : undefined"
          :disabled="idx != num"
          v-gather="idx == num ? 'sign_in' : undefined"
          :class="{ active: idx == num, expired: idx < num }"
        >
          <div class="icon">
            <i
              :class="{
                'animated-rl': item == num + 1,
                'sign-gift': [3, 7].indexOf(item) > -1,
                'sign-done': [3, 7].indexOf(item) == -1 && idx < num,
                'sign-unget': [3, 7].indexOf(item) == -1 && idx >= num,
              }"
            ></i>
            <i class="icon-sign done"></i>
          </div>
          <div class="text">{{ item }}天</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="title">
        今日运势 <span class="rule" @click="ruleShow = true">签到规则</span>
      </div>
      <div class="yunshi">
        <luck :luck="luck_value"></luck>
        <div class="line"></div>
        <div class="sign-rewad">
          <div>
            <div class="info">{{ sign_in_times }}</div>
            <div>累计奖励/天</div>
          </div>
          <div>
            <div class="info">{{ score }}</div>
            <div>签到奖励/积分</div>
          </div>
        </div>
      </div>
      <!-- -->
    </template>
    <div class="done-sign" v-if="!can_sign_in">
      <div class="btn-sign" v-gather="'sign_in'" @click="signIn()">
        立即签到
      </div>
      <div>今日还未签到喔</div>
    </div>
    <van-overlay
      :show="showModal"
      @click="showModal = false"
      z-index="20"
      class-name="sign-modal"
    >
      <div class="content-warp">
        <p>恭喜您，签到成功</p>
        <p>
          成功获得 <span class="second">+{{ score }}</span
          >积分
        </p>
      </div>
    </van-overlay>
    <rule v-model="ruleShow" :rule="rules" />
  </div>
</template>
<script>
import { TaskSignin, SignInfo } from "@/api/task";
import { taskComplete } from "@/api/";
import { TASK_MAP } from "@/config/task";
import luck from "./luck";
import rule from "./rule";
import { Overlay } from "vant";
export default {
  components: { [Overlay.name]: Overlay, luck, rule },
  data() {
    return {
      showModal: false,
      can_sign_in: false,
      sign_in_times: 0,
      score: 0,
      luck_value: 0,
      ruleShow: false,
      rules: [],
    };
  },
  computed: {
    num() {
      return (this.sign_in_times || 0) % 7; //7天一轮回
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { success, data = {} } = await SignInfo(); //获取签到情况
      if (success) {
        this.can_sign_in = data.sign_in_info.can_sign_in != 0; // 可以签到 0:未 1:已签到
        this.sign_in_times = data.sign_in_info.sign_in_times; // 签到次数
        this.score = data.sign_in_info.score; // 积分
        this.luck_value = data.sign_in_info.luck_value; //运势
        this.rules = data.sign_in_info.rule; //规则
        this.$emit("done", true); //通知加载完成
      }
    },
    async signIn() {
      if (this._loading === true || this.can_sign_in === true) return;
      this._loading = true;
      this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg, data = {} } = await TaskSignin();
      this._loading = false;
      this.$emit("onChange", success); //通知签到状态改变
      this.$Toast.clear();
      if (success) {
        taskComplete({ type: TASK_MAP["每日签到"] });
        this.can_sign_in = this.showModal = true; //已签到+弹出框
        this.score = data.sign_in_info.score || 0; //签到积分
        this.sign_in_times++; //签到累计天数
        this.luck_value = data.sign_in_info.luck_value; //运势
      } else {
        this.$Toast({ type: "fail", message: msg });
      }
    },
  },
};
</script>
<style lang="less">
.animated-rl {
  transform-origin: 50% 50%;
  animation: fff 1s infinite linear alternate-reverse;
}
@keyframes fff {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
<style lang="less" scoped>
.signs() {
  unget: "积分-未领取";
  done: "积分-已领取";
  gift: "礼包";
}
each(.signs(),{
  .sign-@{key}{
    display: block;
    width:85px;
    height:85px;
    .img('signin/@{value}');
  }
});

.sign-box {
  position: relative;
  padding-bottom: 20px;
  &::after {
    border-bottom-color: @line1;
  }
  .sign-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .content-warp {
      width: 640px;
      height: 584px;
      padding: 165px 65px 0;
      .img("signin/签到成功");
      animation: scale 0.3s ease-in-out 1;
      font-size: 54px;
      color: #fff;
      line-height: 78px;
    }
  }

  .sign-list {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    padding-bottom: 12px;
    border-radius: 8px;
    overflow: hidden;
    .sign-task {
      display: flex;
      flex-direction: column;
      padding-bottom: 3px;
      width: 92px;
      height: 130px;
      margin-right: 8px;
      border-radius: 9.3px;

      flex-shrink: 0;
      text-align: center;
      background-color: @bg-match;
      &.active {
        background-color: @three;
      }
      &.expired {
        opacity: 0.5;
        background-color: @three;
      }
      .done {
        position: absolute;
        left: 50%;
        top: 50px;
        width: 24px;
        height: 24px;
        z-index: 2;
      }
      &:last-child {
        margin-right: 0;
      }
      .icon {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }
      .text {
        font-size: 24px;
        line-height: 35px;
        color: @cl-second;
      }
    }
  }
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
  .done-sign {
    font-size: 24px;
    margin-top: 16px;
    color: @cl-four;
    text-align: center;
    .btn-sign {
      text-align: center;
      color: #fff;
      height: 88px;
      line-height: 88px;
      width: 328px;
      .img("signin/btn-sign");
      font-size: 32px;
      margin: 0 auto 28px;
      font-weight: bold;
      filter: drop-shadow(0 20px 20px #e2f5f7);
    }
  }
  .line {
    display: block;
    height: 1px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.15)
    );
    border-radius: 1px;
  }

  .yunshi {
    margin-top: 70px;
    position: relative;
    padding: 0 30px;
    width: 690px;
    height: 300px;
    .img("signin/signedOrangeBk","png");

    .sign-rewad {
      display: flex;
      width: 100%;
      text-align: center;
      color: #333;
      font-size: 24px;
      line-height: 28px;
      & > div {
        width: 50%;
      }
      .info {
        color: #fff;
        margin: 36px 0 14px;
        font-size: 76px;
        line-height: 80px;
        font-weight: bold;
      }
    }
  }
}
</style>
