<template>
  <div class="journey-warp">
    <div class="top">
      每日登录此页面，即可获得一次充能机会哦！
      <Barrage :lines="4" :height="50">
        <template slot-scope="scope">
          {{
            scope.data.time + "&nbsp;恭喜" + scope.data.user + "开启盲盒获得:"
          }}
          <span class="award"> {{ scope.data.prize }}</span>
        </template>
      </Barrage>
      <img class="boat" src="../img/飞船.png" alt="" />
    </div>
    <div class="journey">
      <div class="flex just-between">
        <span></span>
        <!-- <span>当前你的位置</span> -->
        <span>{{ main.pos_final }}KM</span>
      </div>
      <div class="proess">
        <div class="proess-val" :style="{ width: proessStyle }"></div>
        <div class="currennt flex just items" :style="{ left: proessStyle }">
          <van-image fit="scale-down" class="my-artra" round :src="avatar" />
          <span>&nbsp;{{ main.pos_curr }}KM</span>
        </div>
      </div>

      <button
        class="star-btn"
        @click="tripCharge"
        v-login
        :disabled="main.charge_num <= 0"
        v-gather="'charging'"
      >
        <template v-if="main.charge_num_already == main.charge_num_max">
          今日充能达上限
        </template>
        <template v-else>
          {{ main.charge_num > 0 ? "充能" : "充能次数不足" }}
        </template>
      </button>
      <div class="flex just-between">
        <div>充能次数：{{ main.charge_num || 0 }}</div>
        <div>持有飞船币：{{ main.coin || 0 }}</div>
      </div>
    </div>
    <Popup v-model="visible" round>
      <div class="popup-warp pop-recharge">
        <div class="close" @click="visible = false">
          <svg-icon name="close" />
        </div>
        <div class="title">充能成功</div>
        <img class="tf" src="../img/飞船.png" alt="" />
        <div v-if="result.lottery_num != 1">
          飞船前进{{ result.forward_num }}KM
        </div>
        <div class="mt flex just">
          <span class="flex items"
            >获得飞船币： <i class="coin"></i>{{ result.coin_num }}</span
          >&nbsp;&nbsp;&nbsp;
          <span v-if="result.lottery_num == 1">盲盒次数+1</span>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Popup } from "vant";
import { tripCharge } from "@/api/activity/";
import Barrage from "@/components/barrage";
import { mapGetters } from "vuex";
export default {
  props: { main: { default: () => ({}) } },
  components: { Popup, Barrage },
  data() {
    return { visible: false, result: {} };
  },
  inject: ["refresh"],
  computed: {
    ...mapGetters(["avatar"]),
    proessStyle() {
      const { pos_curr = 0, pos_final = 100 } = this.main;
      return ((pos_curr / pos_final) * 100).toFixed(2) + "%";
    },
  },
  methods: {
    async tripCharge() {
      const { charge_num_already, charge_num_max } = this.main;
      if (charge_num_max == charge_num_already) return;
      const tosat = this.$Toast.loading({ duration: 0 });
      const { success, data, msg } = await tripCharge(this.main.id);
      tosat.clear();
      if (success) {
        this.result = data;
        this.visible = true;
        this.refresh();
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../index.less";

.journey {
  line-height: 40px;
  padding: 20px 32px 32px;
  background-color: #3500aa;

  .proess {
    background-color: #250076;
    box-shadow: 0 1px 0 #844efb;
    height: 8px;
    border-radius: 8px;
    position: relative;
    margin: 2px auto 90px;

    &-val {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 50%;
      background-image: linear-gradient(116deg, #00dcff 5%, #ff43de 100%);
      border-radius: 8px;
    }
  }

  .currennt {
    position: absolute;
    left: 0;
    top: 30px;
    transform: translateX(-32px);
  }

  .my-artra {
    width: 40px;
    height: 40px;
  }
}

.journey-warp {
  margin-top: 72px;
  background: url(../img/星仔旅途.png) no-repeat;
  background-size: 100%;
  height: 1007px;
  width: 702px;
  border-radius: 18px;
  overflow: hidden;

  .top {
    position: relative;
    height: 667px;
    padding-top: 120px;
    text-align: center;
    line-height: 40px;
    font-weight: 500;

    img {
      position: absolute;
      top: 0;
      left: 50%;
      width: 380px;
      margin: 180px 0 0 -190px;
      animation: anf 1.5s ease-in-out infinite alternate;
    }
  }
}

@keyframes anf {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, 40px);
  }
}

.pop-recharge {
  padding-top: 80px;
  text-align: center;
  font-size: 28px;
  line-height: 40px;

  .tf {
    margin: 40px 0;
    width: 160px;
  }

  .mt {
    margin-top: 16px;
  }
}
</style>
