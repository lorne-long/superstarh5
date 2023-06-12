<template>
  <div class="lucky-draw">
    <img src="./imgs/title.png" class="title-img" alt="" />
    <Barrage
      :show_lines="3"
      :height="50"
      :fun-type="5"
      class="luckyDraw-Barrage"
      contentclass="lucky_content"
    >
      <template slot-scope="scope">
        {{ "恭喜" + scope.data.user + "，抽中" }}
        <span class="award"> {{ scope.data.prize }}</span>
      </template>
    </Barrage>
    <div class="container">
      <div class="lott">
        <div
          class="item"
          v-for="(item, idx) in integrals.slice(0, 4)"
          :key="idx"
          :class="{ active: sort[active] == idx }"
        >
          <div class="xb" :class="{ pord: item.type == 1 }">
            <img v-if="item.id == 5" src="./imgs/pord5.png" />
            <img v-if="item.id == 7" src="./imgs/pord7.png" />
            <img v-if="item.id == 2" src="./imgs/pord2.png" />
            <img v-if="item.id == 4" src="./imgs/pord4.png" />
          </div>
          <div>{{ item.name }}</div>
        </div>
        <div
          class="item"
          @click="drawFun()"
          v-gather="'luck_draw'"
          :class="{ loading: loading }"
        ></div>
        <div
          class="item"
          v-for="(item, idx) in integrals.slice(4, 8)"
          :key="idx + 5"
          :class="{ active: sort[active] == idx + 5 }"
        >
          <div class="xb" :class="{ pord: item.type == 1 }">
            <img v-if="item.id == 5" src="./imgs/pord5.png" />
            <img v-if="item.id == 7" src="./imgs/pord7.png" />
            <img v-if="item.id == 2" src="./imgs/pord2.png" />
            <img v-if="item.id == 4" src="./imgs/pord4.png" />
          </div>
          <div>{{ item.name }}</div>
        </div>
      </div>
      <div class="btn-list">
        <div class="btn once" @click="drawFun()" v-gather="'luck_draw'">
          <div>抽一次</div>
          <div class="huafei">花费{{ info.consume_integral }}积分</div>
        </div>
        <div class="btn ten" @click="drawFun(10)" v-gather="'luck_draw'">
          <div>十连抽</div>
          <div class="huafei">花费{{ info.ten_consume_integral }}积分</div>
        </div>
      </div>
      <div class="my-integral">
        <div class="integral">{{ info.integral || 0 }}</div>
        我的积分
      </div>
      <div class="rule">
        <div class="title">活动规则</div>
        <div class="content">
          <p>1、用户可不限制次数使用积分抽奖</p>
          <p>2、每次抽奖必中一款奖项</p>
        </div>
      </div>
    </div>
    <div class="footer">
      奖励由深圳恒兆网络科技有限公司提供，与苹果官方无关<br /><br />
      本活动最终解释权归辰星俱乐部所有
    </div>
    <Popup v-model="visible" round>
      <div class="popup-warp">
        <div class="close" @click="visible = false">
          <svg-icon name="close"></svg-icon>
        </div>
        <div class="title">恭喜您获得以下奖品</div>
        <div class="result-list">
          <div v-for="(item, i) in result" :key="i">
            <div class="xb mb"></div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </Popup>
    <vLog :type="5" />
  </div>
</template>
<script>
import { drawOnce, drawTen, drawMain } from "@/api/activity/";
import { Popup, Button } from "vant";
import { Quad } from "@/utils/Tween";
import Barrage from "@/components/barrage";
import vLog from "@/components/barrage/log";
export default {
  components: { Popup, Barrage, vLog },
  data() {
    return {
      active: -1,
      sort: [0, 1, 2, 5, 8, 7, 6, 3], //动画顺序
      lott: [0, 1, 2, 7, 3, 6, 5, 4], //中奖index对应的 转动数值
      loading: false,
      animation: false,
      info: { integral: 0 },
      visible: false,
      result: [],
    };
  },
  computed: {
    integrals() {
      return this.info.prizes || [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    },
    hasProd() {
      return this.result.some((item) => item.type == 1);
    },
  },
  beforeDestroy() {
    clearTimeout(this._timer);
  },
  created() {
    this.getMain();
  },
  activated() {
    this.getMain();
  },
  methods: {
    async getMain(toast = true) {
      if (this.loading) return;
      this.loading = true;
      toast && this.$Toast.loading({ duration: 0, mask: true });
      const { success, data } = await drawMain();
      this.loading = false;
      if (success) {
        this.info = data;
      }
      toast && this.$Toast.clear();
    },
    async drawFun(times = 1) {
      if (this.animation) return;
      this.animation = true;
      const {
        integral = 0,
        prizes,
        consume_integral,
        ten_consume_integral,
      } = this.info;
      const consume = times == 0 ? ten_consume_integral : consume_integral;
      if (integral < consume) {
        return this.$Toast.fail("积分不足");
      }
      const toast = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg, data } = await (times == 10 ? drawTen : drawOnce)();
      toast.clear();
      if (success) {
        this.info.integral -= consume;
        this.result = data.draws;
        const rank = prizes.findIndex((item) => item.id == data.draws[0].id); //index
        this.startLott(this.lott[rank]); //index所在位置
      } else {
        this.animation = false;
        this.$Toast.fail(msg);
      }
    },
    startLott(rank) {
      //奖品index
      let change = 4 * 8 + rank; //动画转动总圈数
      const distance = 40; //步长 总时长 50 * 80 = 4秒
      let time = 0;
      this._timer = setInterval(() => {
        if (time < distance) {
          this.active = Math.ceil(Quad.easeOut(time, change, distance)) % 8;
          ++time;
        } else {
          this.animation = false;
          this.visible = true;
          this.getMain(false);
          clearTimeout(this._timer);
        }
      }, 80);
    },
  },
};
</script>

<style lang="less" scoped>
.luckyDraw-Barrage {
  position: absolute;
  top: 50px;
}
.lucky-draw {
  position: relative;
  background: #5b18de url(./imgs/bg.jpg) no-repeat;
  background-size: 100%;
  padding: 1px 0;
  color: #fff;
  .title-img {
    display: block;
    max-width: (640/750) * 100%;
    margin: 166px auto 0;
    background-color: transparent;
  }

  .xb {
    display: inline-block;
    background-image: url(./imgs/jf.png);
    background-size: contain;
    &.pord {
      background-image: none;
    }
    img {
      width: 80px;
      height: 80px;
    }
    // .img("masonry");
    width: 80px;
    height: 80px;
    margin-bottom: 16px;

    &.mb {
      margin-bottom: 0;
    }
  }

  .container {
    position: relative;
    display: block;
    background-image: url(./imgs/content.png);
    background-repeat: no-repeat;
    width: calc(100vw - 2px);
    margin: 25px auto 0;
    overflow: hidden;
    background-size: contain;
    height: 1426px;
  }

  .lott {
    display: flex;
    flex-wrap: wrap;
    padding: 70px 76px 0 82px;

    .item {
      width: 190px;
      height: 190px;
      background: url(./imgs/defult.png) no-repeat;
      background-size: contain;
      margin-top: 6px;
      margin-right: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #643cd8;
      font-size: 24px;
      .ellipsis();
      &:nth-child(5) {
        background-image: url(./imgs/start.png);
        &.loading {
          filter: grayscale(80%);
        }
      }

      &.active {
        background-image: url(./imgs/active.png);
      }
    }
  }

  .btn-list {
    margin-top: 24px;
    height: 127px;
    padding: 0 48px 0 51px;
    display: flex;
    justify-content: space-between;

    .btn {
      height: 127px;
      font-size: 36px;
      padding-top: 10px;
      color: #6f482f;
      text-align: center;
      font-weight: bold;
      width: 300px;
      background-size: contain;
      background-repeat: no-repeat;
      border: none;
      outline: none;
      line-height: 50px;
      background-color: transparent;

      &.once {
        background-image: url(./imgs/r-up.png);

        &:focus,
        &:active {
          background-image: url(./imgs/l-down.png);

          div {
            transform: scale(0.95);
          }
        }
      }

      &.ten {
        background-image: url(./imgs/r-up.png);

        &:focus,
        &:active {
          div {
            transform: scale(0.95);
          }

          background-image: url(./imgs/r-down.png);
        }
      }

      .huafei {
        font-weight: lighter;
        font-size: 24px;
        line-height: 33px;
        color: #895b21;
      }
    }
  }

  .my-integral {
    margin-top: 105px;
    text-align: center;
    line-height: 45px;
    font-size: 32px;

    .integral {
      font-size: 64px;
      line-height: 80px;
      color: #ffe900;
      text-shadow: 0px 3px 5px #ffe900;
    }
  }
  .rule {
    margin-top: 120px;
    .title {
      font-size: 32px;
      color: #ffffff;
      line-height: 45px;
      text-align: center;
    }

    .content {
      padding: 60px 74px 0;
      color: #ffffff;
      line-height: 42px;
    }
  }

  .footer {
    padding: 40px 0;
    font-size: 28px;
    color: #9491dc;
    letter-spacing: 0;
    text-align: center;
    line-height: 34px;
  }
}

.result-list {
  margin: 32px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    width: 25%;
    flex-shrink: 0;
    margin: 8px 0;
    text-align: center;
  }
}

.barrage_box {
  position: absolute;
  top: 100px;
  width: 100%;
  height: 500px;
}

.barrage_box ::v-deep .content::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  top: -10px;
  right: 30px;
  border: 1px solid #333;
}
</style>
