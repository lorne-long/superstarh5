<template>
  <div class="container blind-box">
    <div class="list">
      <div
        class="blind-item"
        v-for="(item, i) in params.box"
        :key="i"
        @click="tripOpenBox(item, i)"
        :class="{ open: item.open != 0 }"
      >
        <img
          :src="getImg(i)"
          :class="{ animated: active == i }"
          v-if="item.open == 0"
        />
      </div>
    </div>
    <div class="blind-num">开启次数：{{ params.lottery_num || 0 }}</div>
    <!-- <div class="tips">
      盲盒说明： <br />
      1、充能有概率获得积分、盲盒
    </div> -->
    <Popup v-model="visible" round>
      <div class="popup-warp">
        <div class="close" @click="visible = false">
          <svg-icon name="close"></svg-icon>
        </div>
        <div class="title">恭喜您获得</div>
        <img v-if="result.id == 6" src="../img/prod6.png" />
        <img v-else-if="result.id == 7" src="../img/prod7.png" />
        <img v-else-if="result.id == 8" src="../img/prod8.png" />
        <img v-else src="../img/星币-大.png" />
        <div>{{ result.name }}</div>
        <!-- <div></div> -->
      </div>
    </Popup>
  </div>
</template>
<script>
import { tripOpenBox } from "@/api/activity/";
import { Popup } from "vant";
export default {
  components: { Popup },
  props: { params: { default: () => ({}) } },
  inject: ["refresh"],
  data() {
    return {
      visible: false,
      active: undefined,
      result: {},
      imgData: Array.from({ length: 20 }).map((x, i) => {
        return require("../img/" + i + ".png");
      }),
    };
  },
  methods: {
    getImg(i) {
      // return this.imgData[Math.floor(Math.random() * 20)];
      return this.imgData[i % 20];
    },
    async tripOpenBox(item, i) {
      if (this.active !== undefined || item.open != 0) return;
      if (this.params.lottery_num <= 0) return this.$Toast.fail("开启次数不足");
      this.active = i;
      const tosat = this.$Toast.loading({ duation: 0 });
      const { success, data, msg } = await tripOpenBox({
        id: this.params.id,
        box_id: item.id,
      });
      this.active = undefined;
      tosat.clear();
      if (success) {
        item.open = 1;
        this.visible = true;
        this.result = data;
        this.refresh();
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.blind-box {
  &::after {
    background-image: url(../img/txt2.png);
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 31px;
  }
  .blind-item {
    flex-shrink: 0;
    width: 114px;
    height: 250px;
    margin-right: 16px;
    margin-bottom: 16px;

    img {
      width: 100%;
    }
    &.open {
      background: url(../img/已开.png) no-repeat;
      background-size: contain;
    }
  }
  .blind-num {
    text-align: center;
    color: #e6d9fd;
    text-align: center;
    line-height: 80px;
    font-weight: 500;
  }
  .animated {
    animation: trans linear 1.5s infinite;
  }
  .tips {
    padding: 0 31px 32px;
    line-height: 1.6;
  }
}
@keyframes trans {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.popup-warp {
  padding-top: 80px;
  text-align: center;
  img {
    width: 200px;
  }
}
</style>
