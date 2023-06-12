<template>
  <router-link
    class="order-item"
    :to="{ name: 'mallOrderDetail', params: { id: source.id } }"
  >
    <div class="status">{{ statusMap[source.order_status] }}</div>
    <div class="order-top">
      <div>订单编号：{{ source.order_num }}</div>
      <div>交易时间：{{ source.order_time }}</div>
    </div>
    <order-item model="mid" :source="source" :sale="false" />
  </router-link>
</template>
<script>
import orderItem from "@/components/mall/orderItem";
export default {
  components: { orderItem },
  props: {
    index: {
      // 每一行的索引
      type: Number,
    },
    itemClick: Function,
    source: {
      // 每一行的内容
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      statusMap: {
        0: "待发货",
        1: "待收货",
        2: "已完成",
      },
    };
  },
};
</script>
<style lang="less" scoped>
.order-item {
  display: block;
  background-color: @bg-match;
  border-radius: 8px;
  margin-bottom: 32px;
  position: relative;
  .order-top {
    padding: 16px 32px 0;
    line-height: 36px;
    font-size: 28px;
    div {
      margin-top: 16px;
    }
    margin-bottom: 24px;
  }
  .status {
    position: absolute;
    right: 32px;
    top: 32px;
    line-height: 36px;
    color: @main;
  }
}
</style>
