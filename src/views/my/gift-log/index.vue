<template>
  <div style="height: 100%">
    <virtual-list
      data-key="id"
      class="gift-log"
      :data-sources="orderList"
      :load-data="getData"
      :data-component="itemComponent"
      :finished="finished"
      :extra-props="{
        itemClick: exchange,
      }"
    >
    </virtual-list>
    <v-exchangeProps
      :gameId="active.game_id"
      title="礼包领取"
      v-model="visible"
      @ok="onReceive"
    >
    </v-exchangeProps>
  </div>
</template>
<script>
import "icons/down.svg";
import vExchangeProps from "@/components/game/exchangeProps.vue";
import itemComponent from "./item";
import { giftLog, giftGet } from "@/api/";
import { WelfareReceive } from "@/api/welfare";
import virtualList from "@/components/virtual-list";
export default {
  components: {
    virtualList,
    vExchangeProps,
  },
  data() {
    return {
      itemComponent,
      orderList: [],
      loading: false,
      finished: false,
      visible: false,
      active: {},
      idx: 0,
    };
  },
  created() {
    this._page = 1;
  },
  methods: {
    exchange(e, idx) {
      this.active = e;
      this.idx = idx;
      this.visible = true;
    },
    async onReceive(e) {
      this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await WelfareReceive({
        ...e,
        props_bags_id: this.active.bag_id,
      });
      this.$Toast.clear();
      if (success) {
        this.orderList[this.idx].order_status = 1;
        this.$Toast.fail("领取成功");
        this.visible = false;
      } else {
        this.$Toast.fail(msg);
      }
    },
    async getData(isRefresh) {
      if (this.loading || (this.finished && !isRefresh)) return {};
      this.loading = true;
      const { success, data } = await giftLog({
        page: isRefresh ? 1 : this._page,
        page_size: 10,
      });
      this.loading = false;
      if (success) {
        const filterData = data.gifts || [];
        filterData.forEach((item) => {
          item.reverse = false;
        });
        if (isRefresh) {
          this._page = 2;
          this.orderList = filterData;
        } else {
          this._page++;
          this.orderList.push(...filterData);
        }
        this.finished = filterData.length < data.page_size;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.gift-log {
  background-color: @bg-second;
  min-height: 100vh;
  padding: 1px 32px 32px;
}
</style>
