<template>
  <div class="list">
    <div v-for="(days, key) in list" :key="key">
      <div class="month title">{{ key }}</div>
      <div class="day-warp" v-for="(preject, day) in days" :key="day">
        <div class="day-name title">{{ day }}</div>
        <div class="link-line"></div>
        <div class="day-list">
          <div class="day-item line-b" v-for="(x, i) in preject" :key="i">
            <span>{{ x.log_time | format("HH:mm") }}</span>
            <div class="project">
              <div class="project-name">{{ x.event_name || x.event_type }}</div>
              <div class="project-integral">
                {{ x.type === "Add" ? "+" : "" }}{{ x[type] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  props: {
    dataSource: { type: [Array], default: () => [] },
    type: { type: String, default: "integral" }, //默认获取积分
  },
  data() {
    return { list: {} };
  },
  computed: {
    isEmpty() {
      return Object.keys(this.list).length === 0;
    },
  },
  watch: {
    dataSource(val) {
      this.list = {}; //不用担心立刻更新 vue有机制哦
      this.handleData(val);
    },
  },
  methods: {
    clear() {
      this.list = {};
    },
    handleData(_data) {
      var _list = _data.reduce((sum, item) => {
        //数据处理  变成 {2021-12:{31日:[],30:[],28:[]}}
        var formatTime = dayjs(item.log_time);
        let month = formatTime.format("YYYY年MM月");
        let day = formatTime.format("DD日"); //不加日 或导致自动排序 升序
        sum[month] = sum[month] || {};
        if (sum[month][day]) {
          sum[month][day].push(item);
        } else {
          sum[month][day] = [item];
        }
        return sum;
      }, this.list);
      this.list = Object.assign({}, _list);
    },
  },
};
</script>
<style lang="less" scoped>
.list {
  & > div:last-child {
    .link-line::after {
      height: 110%;
    }
  }
}
.month {
  font-weight: bold;
  margin-bottom: 16px;

  position: relative;
  z-index: 2;
}
.day-warp {
  display: flex;

  .link-line {
    border-radius: 50%;
    width: 20px;
    flex-shrink: 0;
    margin: 0px 24px 0;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: @three;
    }
    &::after {
      position: absolute;
      content: "";
      width: 1px;
      left: 50%;
      height: 110%;
      top: 10px;
      background-color: @three;
      // background-color: red;
      border-left-width: 1px;
    }
  }
  .day-name {
    font-weight: bold;
  }
}
.day-list {
  flex: 1;
}
.day-item {
  margin-bottom: 32px;
  display: flex;
  &::after {
    border-color: @bg-second;
  }
  .project {
    padding-bottom: 24px;
    font-weight: bold;
    margin-left: 56px;
    line-height: 40px;
    &-integral {
      margin: 8px 0 0;
      color: @three;
    }
  }
}
</style>
