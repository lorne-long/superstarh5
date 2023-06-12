<template>
  <div class="jzjhq">
    <div class="top" v-if="!platform.myApp">
      <div class="left">
        <img src="~@/assets/logo.png" class="logo" alt="" />
        <div class="name">辰星俱乐部</div>
      </div>
      <a @click="openWebSite"></a>
    </div>
    <!-- <div class="gift">
      <div class="item" v-for="item in 6" :key="item">
        <div class="arc">
          <img src="./img/btn.png" alt="" />
        </div>
        <div>礼包名称*{{ item }}</div>
      </div>
    </div> -->
    <img class="block" src="./img/page1.jpg" alt="" />
    <img class="block" src="./img/page2.jpg" alt="" />
    <div class="parent">
      <img class="block" src="./img/page3_1.jpg" alt="" />
      <div class="content">
        <div class="btn" @click="yuyue"></div>
        <div class="rule">
          <div class="rule-title">
            <span>活</span>
            <span>动</span>
            <span>规</span>
            <span>则</span>
          </div>
          <p>
            <span class="num">1</span>
            预约成功即可获得预约大礼包，游戏上线后，请在<span class="r"
              >辰星俱乐部APP-我的-礼包记录</span
            >中领取。
          </p>
          <p><span class="num">2</span> 本活动将在游戏正式上线后结束。</p>
          <p>
            <span class="num">3</span> 辰星俱乐部<a @click="openWebSite"
              >官网</a
            >
            。
          </p>
          <p><span class="num">4</span>活动最终解释权归辰星俱乐部所有。</p>
        </div>
      </div>
    </div>

    <van-overlay
      :zIndex="999"
      :show="showResult"
      @click="showResult = false"
      :custom-style="{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }"
    >
      <div class="result">
        <img src="./img/model.png" alt="" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { platform } from "@/utils/";
import { Overlay } from "vant";
import { Jzjhq } from "@/api/activity/";
export default {
  components: { [Overlay.name]: Overlay },
  data() {
    return {
      platform,
      showResult: false,
      website: process.env.VUE_APP_WEBSITE,
    };
  },
  methods: {
    openWebSite() {
      var win = window.parent || window
      win.location.href = this.website;
    },
    async yuyue() {
      if (!this.$store.getters.isLogin) {
        this.$store.commit("SET_LOGIN", true);
      } else {
        this.$Toast.loading({ duration: 0, mask: true });
        const { success, msg, code } = await Jzjhq({
          prop_bags_id: process.env.VUE_APP_JZJHQ_BAG_ID,
          source: "9",
        });
        this.$Toast.clear();
        if (success || code == 1) {
          this.showResult = true;
        } else {
          this.$Toast.fail(msg);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.jzjhq {
  background-color: #f9ffe7;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center 97px;
  width: 100%;
  color: #000;
  background-image: url("./img/bg.jpg");
  .top {
    position: relative;
    background-image: url("./img/top.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    height: 97px;
    a {
      position: absolute;
      right: 34px;
      top: 30px;
      height: 40px;
      width: 200px;
    }
    .left {
      display: flex;
      align-items: center;
      height: 97px;
      padding-left: 40px;
      color: #fff;
      .logo {
        height: 60px;
        width: 60px;
        border-radius: 12px;
        margin-right: 20px;
      }
    }
  }
  .block {
    display: block;
    width: 100%;
  }
  .parent {
    position: relative;
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .gift {
    padding-top: 668px;
    // padding-left: 58px;
    // padding-right: 58px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .btn {
    display: block;
    width: 346px;
    height: 125px;
    margin: 0 auto;
    background-size: 100%;
  }
  .rule {
    margin-top: 80px;
    padding: 0 66px;
    p {
      margin: 20px 0;
      line-height: 1.6;
      font-size: 28px;
      .r {
        color: #688042;
      }
      a {
        color: #c95d4a;
      }
    }
  }
  .rule-title {
    display: flex;
    font-size: 32px;
    color: #f9ffe7;
    span {
      background-color: #728259;
      border-radius: 50%;
      padding: 10px;
      margin-left: -10px;
    }
  }
  .num {
    display: inline-block;
    width: 1.6em;
    height: 1.6em;
    text-align: center;
    background-color: #d8e0c7;
    border-radius: 50%;
    line-height: 1.6;
  }
}
.result {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  img {
    width: 603px;
  }
}
</style>
