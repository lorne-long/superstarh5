<template>
  <van-pull-refresh class="container" v-model="loading" @refresh="getData">
    <div class="task-center">
      <signIn @onChange="onChange"></signIn>
      <div class="title">推荐任务</div>
      <div class="task-list">
        <div
          class="task-item line-b"
          v-for="item in recommendTasks.slice(0, more ? undefined : 3)"
          :key="item.id"
        >
          <div class="flex">
            <div :class="`icon icon-${item.type}`"></div>
            <div>
              <div class="content">{{ item.content }}</div>
              <div class="flex get">
                <i class="icon-masonry"></i>+{{ item.score }}
              </div>
            </div>
          </div>
          <div
            class="btn"
            @click="doAction(item)"
            :class="{ disabeld: item.status == 2 }"
          >
            {{ item.status == 0 ? btnText[item.type] : statusMap[item.status] }}
          </div>
        </div>
        <div class="more" @click="more = !more" :class="{ reverse: more }">
          <svg-icon className="icon" name="down" />
        </div>
      </div>
      <div class="title">每日任务</div>
      <div class="task-list">
        <div class="task-item line-b" v-for="item in dailyTasks" :key="item.id">
          <div class="flex">
            <div :class="`icon icon-${item.type}`"></div>
            <div>
              <div class="content">{{ item.content }}</div>
              <div class="flex get">
                <i class="icon-masonry"></i>+{{ item.score }}
              </div>
            </div>
          </div>
          <div
            class="btn"
            @click="doAction(item)"
            :class="{ disabeld: item.status == 2 }"
          >
            {{ item.status == 0 ? btnText[item.type] : statusMap[item.status] }}
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>
<script>
import { Swipe, SwipeItem, PullRefresh } from "vant";
import "icons/down.svg";
import signIn from "@/components/signIn/index";
import { TaskCenter, TaskGet } from "@/api/task";
import btnText, { statusMap } from "@/config/task";
import AppAction from "@/utils/app-action";
export default {
  components: {
    signIn,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      btnText,
      statusMap,
      loading: false,
      more: false,
      dailyTasks: [],
      recommendTasks: [],
    };
  },
  created() {
    this.$Toast.loading({ duration: 0 });
    this.getData();
  },
  methods: {
    async doAction(item) {
      if (item.status === 0) {
        if (["11000"].includes(item.type)) {
          window.scrollTo(0, 0);
        } else {
          await AppAction(item.type, { id: item.id });
        }
      } else if (item.status === 1) {
        const loading = this.$Toast.loading({ duration: 0 });
        const { success, msg } = await TaskGet(item.type);
        loading.clear();
        if (success) {
          this.$Toast.success("领取成功");
          item.status = 2;
        } else {
          this.$Toast.fail(msg);
        }
      }
    },
    onChange(v) {
      if (v) {
        this.getData();
      }
    },
    async getData() {
      const { success, data = {} } = await TaskCenter();
      this.$Toast.clear();
      this.loading = false;
      if (success) {
        this.recommendTasks = data.recommend_tasks || [];
        this.dailyTasks = data.daily_tasks || [];
      }
    },
  },
};
</script>
<style lang="less" scoped>
//类型对应图片
.tasks() {
  11002: "游戏";
  11001: "充值";
  10100: "个人信息";
  10001: "积分夺宝";
  10002: "积分商城";
  11003: "礼包";
  11000: "签到";
  10003: "下载";
  10200: "v1";
  10201: "v2";
  10202: "v3";
  10203: "v4";
  10204: "v5";
}
//test
each(.tasks(),{
  .icon-@{key}{
    display: block;
    width:50px;
    height:50px;
    .img('task/@{value}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
});
.icon-masonry {
  display: block;
  width: 32px;
  height: 32px;
  .img("task/积分");
}
.my-swipe {
  height: 422px;
  .item {
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
}
.container {
  background-image: @bg-img;
  // min-height: 100%;
}
.task-center {
  padding: 1px 32px 32px;
  .title {
    margin: 32px 0;
    font-size: 36px;

    line-height: 44px;
    font-weight: bold;
  }
  .more {
    display: flex;
    align-items: center;
    height: 48px;
    width: 96px;
    margin: 32px auto 0;
    background-color: @bg-dir;
    border-radius: 24px;
    justify-content: center;
    &.reverse .icon {
      transform: rotate(180deg);
    }
    .icon {
      transition: all 0.2s;
      width: 72px;
      height: 42px;
      fill: #999;
    }
  }
  .task-list {
    background-color: @bg-match;
    padding: 0 32px 32px;
    border-radius: 8px;
    .task-item {
      display: flex;
      justify-content: space-between;
      padding: 32px 0;
      &::after {
        border-bottom-color: @line1;
      }
      .icon {
        width: 50px;
        height: 50px;
        margin-right: 24px;
      }
      .get {
        color: @three;
        i {
          margin-right: 16px;
        }
      }
      .content {
        font-size: 28px;
        line-height: 34px;
        margin-bottom: 16px;
      }
      .icon-masonry {
        width: 32px;
        height: 29px;
      }
    }
  }
  .btn {
    background-image: @btn-main;
    border-radius: 8px;
    height: 64px;
    line-height: 64px;
    color: #fff;
    text-align: center;
    width: 164px;
    &.disabeld {
      background: @btn-dis;
      border-radius: 8px;
      color: @cl-second;
    }
  }
}
</style>
