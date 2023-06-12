<template>
  <div class="turntable">
    <img src="./imgs/title.png" alt="" class="title-img" />
    <div class="condition">新注册用户14天内</div>
    <div class="turntable-warp">
      <div class="turntable-content" :class="`disc-${prize.length}`">
        <div
          class="prize"
          v-for="(item, i) in prize"
          :key="i"
          :style="{ transform: `rotate(${i * (360 / prize.length)}deg)` }"
        >
          {{ item }}积分
          <div class="jf"></div>
        </div>
        <div class="axis" :style="{ transform: `rotate(${angle}deg)` }">
          抽奖
        </div>
      </div>
    </div>
    <div class="pipe one"></div>
    <div class="rule-num">
      <button
        class="btn"
        @click="startLottery()"
        v-gather="'luck_draw'"
        v-login
        :disabled="num == 0 || loading"
      >
        抽一次
      </button>
      <div>剩余抽奖机会：{{ num }}</div>
    </div>
    <div class="pipe" v-if="list.length"></div>
    <div class="box" v-if="list.length">
      <div class="title">中奖信息</div>
      <div class="content">
        <div class="reward-list" direction="up" behavior="scroll">
          <div
            class="scroll-warp"
            :style="{ animationDuration: list.length + 's' }"
          >
            <div v-for="(item, i) in list" :key="i" class="item">
              <span>{{ item.time }}</span> <span>{{ item.user }}</span>
              <span>{{ item.prize }}</span>
            </div>
            <div v-for="(item, i) in list" :key="i" class="item">
              <span>{{ item.time }}</span> <span>{{ item.user }}</span>
              <span>{{ item.prize }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pipe"></div>
    <div class="box rule-text">
      <div class="title">活动规则</div>
      <div class="content">
        <p>1、用户每天拥有3次抽奖机会。</p>
        <p>2、每一次抽奖必中一款奖项。</p>
        <p>3、奖励由深圳恒兆网络科技有限公司提供，与苹果官方无关。</p>
      </div>
    </div>
    <div class="pipe"></div>
    <div class="box day-task">
      <div class="title">每日任务</div>
      <div class="task-list">
        <div class="task" v-for="(item, index) in dailyTasks" :key="index">
          <div>
            {{ item.content }} <span class="second">抽奖+{{ item.score }}</span>
          </div>
          <div
            class="btn"
            :disabled="item.status == 2"
            v-gather="'task_receive'"
            :class="{ dis: item.status == 2, get: item.status == 1 }"
            @click="doAction(item)"
          >
            {{ status[item.status] }}
          </div>
        </div>
      </div>
    </div>
    <div class="pipe"></div>
    <div class="box normal-task">
      <div class="title">常规任务</div>
      <div class="task-list">
        <div class="task" v-for="(item, index) in normalTasks" :key="index">
          <div>
            {{ item.content }} <span class="second">抽奖+{{ item.score }}</span>
          </div>
          <div
            :disabled="item.status == 2"
            v-gather="'task_receive'"
            class="btn"
            :class="{ dis: item.status == 2, get: item.status == 1 }"
            @click="doAction(item)"
          >
            {{ status[item.status] }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">本活动最终解释权归辰星俱乐部所有</div>
    <Popup v-model="result" round close>
      <div class="result">
        <i class="close" @click="result = false">
          <svg-icon name="close" />
        </i>
        <div>恭喜你获得以下奖品</div>
        <div class="jf get"></div>
        <div class="inter">{{ integral }}积分</div>
        <v-button @click="(result = false) || startLottery()"
          >再抽一次</v-button
        >
      </div>
    </Popup>
  </div>
</template>
<script>
import "icons/close.svg";
import { NoobMain, NoobLottery, winningRecord } from "@/api/activity/";
import { TaskGet } from "@/api/task";
import { Popup } from "vant";
import { Quart } from "@/utils/Tween";
import appAction, { actionMap } from "@/utils/app-action";
export default {
  components: { Popup },
  data() {
    return {
      num: 0,
      angle: 0,
      status: {
        0: "去完成",
        1: "领取",
        2: "已领取",
      },
      start: false,
      prize: [],
      list: [],
      dailyTasks: [],
      normalTasks: [],
      result: false,
      integral: 0,
      loading: false,
    };
  },
  created() {
    this.getData();
    this.getwinningRecord();
  },
  activated() {
    this.getData();
    this.getwinningRecord();
  },
  beforeDestroy() {
    clearTimeout(this._timer);
  },
  methods: {
    async getData() {
      if (this.loading) return;
      this.loading = true;
      const { success, data } = await NoobMain();
      this.loading = false;
      if (success) {
        const { daily_tasks, recommend_tasks, Pond, lottery_num, id } =
          data || {};
        this.dailyTasks = daily_tasks;
        this.normalTasks = recommend_tasks;
        this.num = lottery_num || 0;
        this.prize = Pond; //奖品
        this._id = id;
        if (id == 0 && this.$store.getters.isLogin) {
          this.$Toast({
            message: "您不是新注册用户/活动已结束",
            duration: 0,
            mask: true,
          });
        }
      }
    },
    async startLottery() {
      if (!this.$store.getters.isLogin || this.loading) return;
      if (this.num <= 0) {
        return this.$Toast.fail("抽奖次数不足");
      }
      this.loading = true;
      const { success, msg, data } = await NoobLottery(this._id);
      if (!success) {
        this.loading = false;
        return this.$Toast.fail(msg);
      }
      this.integral = data.integral;
      const rank = this.prize.findIndex((item) => item == data.integral);
      this.rank = rank;
      let len = this.prize.length; //奖品项数量
      let change = (360 / len) * rank + 360 * 15; //最终角度，计算抽奖之后转盘应该转动的角度，多转x圈
      let time = 0;
      let distance = 200; //distance是步长，这里乘以setInterval的间隔时间得到的是总的动画时长
      this._timer = setInterval(() => {
        if (time < distance) {
          this.angle = Quart.easeOut(time, change, distance);
          time++;
        } else {
          this.result = true;
          this.loading = false;
          clearInterval(this._timer);
        }
      }, 40);
      this.num--;
      this.getData();
    },
    async doAction(item) {
      // 0:未完成 1:待领取 2:已领取
      if (item.status == 0) {
        switch (item.type + "") {
          case "11004": // 完成一次游戏分享
          case "10005": // 完过一款游戏
            this.$router.push({ name: "game", params: { id: 3 } });
            break;
          case "11005": //浏览一篇攻略&资讯
          case "11006": //完成一篇攻略&资讯点赞
            appAction(actionMap.Notice);
            break;
          case "11000": //每日签到  跳福利
            appAction(actionMap.Welfare);
            break;
          case "10007": //超级福利
            this.$router.push({ name: "activity_superWelfare" });
            break;
          case "10006": // 星仔旅途
            this.$router.push({ name: "activity_starBoy" });
            break;
          case "10008": // 积分夺宝
            this.$router.push({ name: "activity_luckyDraw" });
            break;
        }
        return;
      }
      if (item.status !== 1) return;
      this.$Toast.loading({ duration: 0 });
      const { success } = await TaskGet(item.type);
      if (success) {
        item.status++;
        this.$Toast.success("领取成功");
        this.getData();
      } else {
        this.$Toast.clear();
      }
    },
    async getwinningRecord() {
      const { success, data } = await winningRecord(4);
      if (success) {
        this.list = data.records;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.turntable {
  background: #4b30c5 url(./imgs/bg.png) no-repeat;
  background-size: 100%;
  min-height: 100vh;
  padding: 1px 0;
  color: #fff;
  .title-img {
    display: block;
    margin: 167px auto 0;
    max-width: (550/750) * 100%;
    background-color: transparent;
  }
  .prize {
    position: absolute;
    left: 50%;
    margin-left: -70px;
    top: 62px;
    padding-top: 32px;
    color: #6f20c6;
    width: 140px;
    height: 278px;
    text-align: center;
    transform-origin: 50% 100%;
  }
  .condition {
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    margin: 32px 0 52px;
  }
  &-warp {
    position: relative;
    z-index: 2;
    padding: 0 35px;
  }
  &-content {
    position: relative;
    background-image: url(./imgs/disc-6.png);
    background-repeat: no-repeat;
    background-size: contain;
    height: 680px;
    &.disc-7 {
      background-image: url(./imgs/disc-7.png);
    }
    &.disc-9 {
      background-image: url(./imgs/disc-9.png);
    }

    .axis {
      position: absolute;
      width: 258px;
      height: 258px;
      line-height: 258px;
      text-align: center;
      font-size: 50px;
      left: 50%;
      top: 50%;
      z-index: 2;
      margin-left: -129px;
      margin-top: -129px;
      background: url(./imgs/pointer.png) no-repeat;
      background-size: 100% 100%;
      &.start {
        animation: lottStart 20s linear infinite;
      }
    }
  }

  .jf {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-top: 10px;
    background-image: url(./imgs/jf.png);
    background-size: 100%;
    background-repeat: no-repeat;
    &.get {
      width: 160px;
      height: 160px;
      margin: 32px 0 20px;
    }
  }
  .box {
    position: relative;
    background: #4b30c5 linear-gradient(#3e3ef7, #331ab0);
    border-radius: 12px;
    border: 8px solid;
    border-image: linear-gradient(to bottom, #5e63fe 10%, #2303c6) 4 4;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;
    width: calc(100% - 144px);
    margin: -80px auto 0;
  }
  .pipe {
    background: url(./imgs/pipe2.png) no-repeat center;
    background-size: auto 100%;
    height: 246px;
    margin: -80px auto 0;
    &.one {
      background-image: url(./imgs/pipe1.png);
      margin-top: -200px;
    }
  }
  .rule-num {
    position: relative;
    padding-top: 200px;
    text-align: center;
    color: #ffffff;
    line-height: 34px;
    background: url(./imgs/1.png) no-repeat;
    background-size: auto 100%;
    height: 431px;
    width: 618px;
    margin: -80px auto 0;
    .btn {
      display: block;
      height: 80px;
      width: 360px;
      line-height: 80px;
      margin: 24px auto;
      background-color: #fa7d9d;
      outline: none;
      border: none;
      box-shadow: inset 0 3px 3px 0 rgba(255, 202, 202, 0.5),
        inset 0 -3px 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 44px;
      font-size: 32px;
      color: #ffffff;
      &[disabled] {
        opacity: 0.5;
      }
    }
    .rule-role {
      span {
        color: #4eebff;
      }
    }
  }
  .title {
    position: relative;
    font-size: 32px;
    height: 57px;
    line-height: 57px;
    text-align: center;
    font-weight: bold;
    background: url(./imgs/bg-title.png) no-repeat center;
    background-size: auto 100%;
    margin-top: -22px;
  }
  .reward-list {
    // padding: 32px 0 0;
    height: 40vw;
    position: relative;
    overflow: hidden;
    .scroll-warp {
      animation: identifier 10s linear infinite;
    }
    @keyframes identifier {
      to {
        transform: translateY(-50%);
      }
    }
    .item {
      line-height: 1.6;
      font-size: 30px;
      display: flex;
      justify-content: space-between;
      span:last-child {
        color: #ffd901;
        .ellipsis();
        width: 6em;
      }
    }
  }
  .rule-text {
    .content {
      margin-top: 45px;
      line-height: 34px;
      p {
        margin-bottom: 16px;
      }
    }
  }
  .task-list {
    margin-top: 49px;
    .task {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      line-height: 34px;
    }
    .btn {
      height: 64px;
      width: 150px;
      background-image: @btn-main;
      border-radius: 32px;
      line-height: 64px;
      text-align: center;
      font-weight: bold;
      margin-left: 1em;
      flex-shrink: 0;
      opacity: 0.5;
      .get {
        opacity: 1;
        color: #fff;
        background-color: #fa7d9d;
      }
      &.dis {
        opacity: 1;
        color: #999999;
        background: #444444;
      }
      &.get {
        opacity: 1;
        color: #fff;
        background: #fa7d9d;
        outline: none;
        border: none;
        box-shadow: inset 0 3px 3px 0 rgba(255, 202, 202, 0.5),
          inset 0 -3px 3px 0 rgba(0, 0, 0, 0.5);
      }
    }
  }
  .footer {
    padding: 18px 0 48px;
    font-size: 28px;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
    line-height: 34px;
  }
}
.result {
  padding: 80px 80px 40px;
  width: 584px;
  border-radius: 16px;
  background-color: #ffffff;
  background-image: url(~@/assets/tmd2.png);
  background-repeat: no-repeat;
  background-position: right 0;
  background-size: contain;
  color: #2fcbdf;
  text-align: center;
  font-size: 32px;
  .close {
    position: absolute;
    top: 22px;
    right: 22px;
    font-size: 58px;
    color: #ccc;
  }
  .inter {
    color: #333;
    margin-bottom: 32px;
  }
}
@keyframes lottStart {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(36000deg);
  }
}
</style>
