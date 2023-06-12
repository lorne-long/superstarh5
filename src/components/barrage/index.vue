<template>
  <div class="barrage">
    <div
      v-for="item in list"
      :key="item.key"
      :style="{ top: item.top }"
      :class="[item.is_show ? 'content' : 'hide', contentclass, item.key]"
    >
      <slot :data="item"></slot>
    </div>
  </div>
</template>
<script>
import { winningRecord } from "@/api/activity/";

export default {
  props: {
    lines: {
      type: Number,
      default: 4,
    },
    funType: {
      type: Number,
      default: 3, // 3-星仔的旅途 4-新人活动 5-积分抽奖
    },
    max: {
      type: Number,
      default: 10,
    },
    height: {
      type: Number,
      default: 50,
    },
    timeCell: {
      type: Number,
      default: 2000, //秒
    },
    contentclass: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      list: [],
      timer: 0,
      curLine: -1,
      curIndex: -1,
      dataList: [],
    };
  },
  mounted() {
    this.getDta();
  },
  methods: {
    async getDta() {
      const { success, data } = await winningRecord(this.funType);
      if (success) {
        this.dataList.push(...data.records);
        this.clear_timer();
        data.records && this.loopPlay();
      }
    },
    loopPlay() {
      this.timer = setTimeout(() => {
        if (this.dataList.length < this.lines) {
          this.getDta();
          return;
        }
        this.curIndex = (this.curIndex + 1) % this.max;
        this.curLine = (this.curLine + 1) % this.lines;
        var o = this.dataList.shift();
        o.top = this.curLine * this.height + 20 + "px";
        o.is_show = false;
        o.key = Math.random();
        const len = this.list.length;
        if (len >= this.max) {
          this.list[this.curIndex] = o;
          this.list.splice(0, 0);
        } else {
          this.list.push(o);
        }
        this.$nextTick(() => {
          this.list[this.curIndex].is_show = true;
          this.list.splice(0, 0);
        });
        this.loopPlay();
      }, this.timeCell);
    },
    clear_timer() {
      clearInterval(this.timer);
    },
  },
  beforeDestroy() {
    this.clear_timer();
  },
};
</script>
<style lang="less" scoped>
.hide {
  display: none;
}
.barrage {
  position: absolute;
  pointer-events: none;
  left: 0;
  width: 100%;
  height: 500px;
  padding: 20px 0;
  overflow: hidden;
  .award {
    color: #ffd901;
  }
  .lucky_content {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    &::before {
      position: absolute;
      content: "";
      width: 44px;
      height: 44px;
      top: -20px;
      right: -23px;
      background: url("~@/views/activity/lucky-draw/imgs/星币@2x.png") no-repeat
        center;
      background-size: cover;
      // border: 1px solid;
    }
  }
  .treasury_content {
    background-color: rgba(0, 0, 0, 0.4);
    background-image: none;
    border-radius: 40px;
    border: none;
    color: #fff;
  }
}
.content {
  display: block;
  white-space: nowrap;
  position: absolute;
  font-size: 28px;
  left: 100%;
  animation: trans 10s linear;
  padding: 16px 1.2em;
  // border: 2px solid #ffd901;
  box-sizing: border-box;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogICAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhciIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZFREUxRiIgLz4KICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGNzU5MCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICA8L2RlZnM+CiAgICAgIDxyZWN0CiAgICAgICAgeD0iMCIKICAgICAgICB5PSIwIgogICAgICAgIHJ4PSIyMCIKICAgICAgICByeT0iMjAiCiAgICAgICAgd2lkdGg9IjEwMCUiCiAgICAgICAgaGVpZ2h0PSIxMDAlIgogICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6IDI7IGZpbGw6IHRyYW5zcGFyZW50OyIKICAgICAgICBzdHJva2U9InVybCgjbGluZWFyKSIKICAgICAgLz4KICAgIDwvc3ZnPg==");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
@keyframes trans {
  to {
    left: -100%;
  }
}
</style>
