<template>
  <virtual-list
    data-key="id"
    class="order-list"
    image="mall"
    description="咦，当前未有商品，请耐心等待"
    :data-sources="orderList"
    :load-data="getData"
    :data-component="itemComponent"
    :finished="finished"
  >
  </virtual-list>
</template>
<script>
import "icons/down.svg";
import itemComponent from "./item";

import { OrderList } from "@/api/mall";
import virtualList from "@/components/virtual-list";
export default {
  name: "mallOrderlist",
  components: {
    virtualList,
  },
  data() {
    return {
      itemComponent,
      orderList: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this._page = 1;
  },
  methods: {
    async getData(isRefresh) {
      if (this.loading || (this.finished && !isRefresh)) return {};
      this.loading = true;
      const { success, data } = await OrderList({
        page: isRefresh ? 1 : this._page,
        page_size: 10,
      });
      this.loading = false;
      if (success) {
        const filterData = data.order_items || [];
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
.order-list {
  background-color: @bg-second;
  min-height: 100vh;
  padding: 32px;
}
</style>
