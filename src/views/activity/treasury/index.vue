<template>
  <div class="treasury">
    <Barrage
      :show_lines="3"
      :height="50"
      :fun-type="5"
      class="treasury-Barrage"
      contentclass="treasury_content"
    >
      <template slot-scope="scope">
        {{ "恭喜" + scope.data.user + "，获得" }}
        <span class="award"> {{ scope.data.prize }}</span>
      </template>
    </Barrage>
    <div class="machine">
      <!-- <img src="./img/ball.png" alt="" class="ball" /> -->
      <div class="my-intal">
        <div>我的积分：600</div>
        <div>抽奖券：0</div>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="lottery(1)">花费50积分</div>
      <div class="btn ten" @click="lottery(10)">花费450积分</div>
    </div>
    <div class="prize">
      <div class="list">
        <div class="item" v-for="item in 8">
          <img src="" alt="" />
          <div>小米手环</div>
        </div>
      </div>
    </div>
    <div class="sign-contaion">
      <div class="tab">
        <div
          class="tab-item"
          v-for="(item, index) in ['每日签到', '每周成就']"
          :class="{ active: active == index }"
          @click="active = index"
        >
          {{ item }}
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-content-item day-sign" v-show="active == 0">
          <div class="tab-title">每日签到即可获得抽奖券</div>
          <div class="list">
            <div class="day-item" v-for="item in 6">
              <div class="icon" :class="{ gift: item == 5 }">{{ item }}</div>
              <div>{{ item }}天</div>
            </div>
            <div class="day-item">
              <div>7天</div>
              <div class="big"></div>
            </div>
          </div>
        </div>
        <div class="tab-content-item" v-show="active == 1">
          <div class="tab-title">每日签到即可获得抽奖券</div>
          <div class="gift-list">
            <div class="gift-item" v-for="(item, index) in ary">
              <div class="gift" :class="`gift${index + 1}`"></div>
              <div>抽{{ item }}次</div>
              <div class="dot"></div>
            </div>
            <div class="process">
              <div
                class="process-val"
                :style="{
                  width: process,
                }"
              ></div>

              <div
                class="vvv"
                :style="{
                  left: process,
                }"
              >
                {{ count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-log">
      <div>中奖<br />记录</div>
      <div @click="rule = true">
        活动 <br />
        规则
      </div>
    </div>
    <Overlay :show="result">
      <div class="congratulations">
        <div class="close" @click="result = false"></div>
        <div class="title"></div>
        <div class="congratulations-content">
          <div class="flex just wrap">
            <div class="prop-item" v-for="item in prize">
              <img src="" alt="" :class="{ big: prize.length == 1 }" />
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="flex w-full just">
            <div class="btn">确认领取</div>
            <div class="btn play">再抽{{ prize.length }}次</div>
          </div>
        </div>
      </div>
    </Overlay>
    <Overlay :show="rule">
      <div class="congratulations">
        <div class="close" @click="rule = false"></div>
        <div class="title">活动规则</div>
        <div class="congratulations-content">
          1.活动期间：2020年6月1日00：00：00-2020年6月20日23：59：59<br />
          2.活动参与资格： <br />
          1）活动期间，在360商城(含网站及手机客户端)的新注册用户；<br />
          2）2019年1月1日00：00：00至本次活动开始前的期间从未在360商城支付过订单的已注册用户。<br />
          3）本次活动仅针对本条前述第1）项和第2）项列明的符合活动资格的注册用户；除前述列明的用户外，其他用户均不具有参与本次活动的资格。<br />

          3.活动参与方式： <br />
          活动期间，符合活动参与资格的用户需登录360商城，进入相应的活动页面，领取相应的赠品。
        </div>
      </div>
    </Overlay>
  </div>
</template>
<script>
import Barrage from "@/components/barrage";
import { Overlay } from "vant";
export default {
  components: { Barrage, Overlay },
  data() {
    return {
      active: 1,
      count: 25,
      ary: [10, 20, 30, 40],
      rule: false,
      result: false,
      prize: [{ a: 1 }],
    };
  },
  computed: {
    process() {
      const count = this.count;
      var idx = this.ary.findIndex((item) => item >= this.count);
      if (idx == -1) return "100%";
      const diff = this.ary[idx] - count;
      console.log(diff);
      var x = idx ? idx * 25 - 12.5 : 0;
      return x + (diff / 10) * (idx ? 25 : 12.5) + "%";
    },
  },
  methods: {
    lottery(num) {
      this.result = true;
      this.prize = Array.from({ length: num }).fill({ name: "小米手环" });
      console.log(num, this.prize);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
