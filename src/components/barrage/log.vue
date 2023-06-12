<template>
  <div v-if="isLogin">
    <div class="log" @click="visible = !0">中奖记录</div>
    <Popup v-model="visible" round>
      <div class="popup-warp" @click="onGet">
        <div class="close" @click="visible = false">
          <svg-icon name="close"></svg-icon>
        </div>
        <div class="title">中奖记录</div>
        <v-empty v-if="!list.length && !loading" />
        <List
          v-model="loading"
          finished-text="没有更多了"
          :finished="finished"
          @load="getData"
          :immediate-check="false"
          class="result-list"
          v-else
        >
          <div v-for="(item, i) in list" class="item" :key="item.id">
            <div>{{ item.prize }}</div>
            <div>{{ item.time.slice(0, 10) }}</div>
            <div
              :class="{
                disGet: item.status == 1 && item.type == 1,
                unsend: item.status == 2 && item.type == 1,
              }"
              :data-idx="i"
            >
              {{ getState(item) }}
            </div>
          </div>
        </List>
      </div>
    </Popup>
    <vAddress ref="address" @confirm="onConfirm" />
  </div>
</template>
<script>
import { Popup, List } from "vant";
import vAddress from "@/components/mall/popupAddress";
import { DrawWinningRecord, DrawAccept } from "@/api/activity/";
import { mapGetters } from "vuex";
export default {
  components: { Popup, vAddress, vAddress, List },
  props: {
    type: {
      type: [Number, String],
      default: 5, // 3-星仔的旅途 4-新人活动 5-积分抽奖
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  data() {
    return {
      active: -1,
      dom: null,
      visible: false,
      page: 0,
      list: [],
      finished: false,
      loading: false,
      status: {
        1: "待领取",
        2: "已发放",
        3: "已发货",
      },
    };
  },
  watch: {
    visible(v) {
      if (v) {
        this.finished = false;
        this.loading = true;
        this.getData(true);
      }
    },
  },
  methods: {
    getState(item) {
      return item.type == 1 && item.status == 2
        ? "待发货"
        : this.status[item.status];
    },
    onGet(e) {
      var dom = e.target;
      if (dom.className == "disGet") {
        this.active = Number(dom.dataset.idx);
        this.$refs.address.toggle();
      }
    },
    async getData(refresh = false) {
      this.page = refresh ? 1 : this.page + 1;
      const { success, data } = await DrawWinningRecord({
        page: this.page,
        activity_type: this.type,
      });
      this.loading = false;
      if (success) {
        refresh && (this.list = []);
        this.list.push(...data.records);
        this.finished = this.list.length >= data.total;
      }
    },
    async onConfirm(v) {
      if (this.active == -1 || !v) return;
      this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await DrawAccept({
        id: this.list[this.active].id,
        address_id: v.id,
      });
      if (success) {
        this.list[this.active].status = 2;
        this.list.splice(0, 0);
        this.$Toast.success("领取成功,等待发货!");
      } else {
        this.$Toast.fail(msg);
      }
      this.active = -1;
      this.$Toast.clear();
    },
  },
};
</script>
<style lang="less" scoped>
.log {
  position: fixed;
  right: 0;
  top: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 48px;
  line-height: 48px;
  padding: 0 24px;
  border-radius: 24px 0 0 24px;
  z-index: 2;
}
.loading {
  text-align: center;
  padding: 10px;
  font-size: 24px;
  color: #ccc;
}
.result-list {
  height: 500px;
  overflow: auto;
  margin-top: 24px;
  .disGet {
    color: blue;
  }
  .unsend {
    color: green;
  }
  .item {
    display: flex;
    padding: 10px 0;
    div {
      flex-shrink: 0;
      &:nth-child(1) {
        flex-grow: 1;
        flex-shrink: 1;
      }
      &:nth-child(3) {
        width: 5em;
      }
      .ellipsis;
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>
