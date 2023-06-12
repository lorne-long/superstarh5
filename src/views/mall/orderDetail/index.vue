<template>
  <div class="order-detail">
    <v-status :status="orderInfo.order_status" />
    <div class="contain">
      <vAddress
        :isIcon="false"
        :isDefault="false"
        :address="address"
        class="order-detail-address"
      />
      <orderItem :source="orderInfo" :sale="false" />
      <div class="order-info">
        <div class="item">
          <div>订单编号：{{ orderInfo.order_num }}</div>
          <span
            class="copy"
            v-clipboard
            :data-clipboard-text="orderInfo.order_num"
            >复制</span
          >
        </div>
        <div class="item">
          <div>
            订单状态：<span class="main">{{
              orderInfo.order_status == 0 ? "未发货" : "已发货"
            }}</span>
          </div>
        </div>
        <div class="item">交易时间：{{ orderInfo.order_time }}</div>
        <div class="item" v-if="orderInfo.express_num">
          <div>快递单号：{{ orderInfo.express_num }}</div>
          <span
            class="copy"
            v-clipboard
            :data-clipboard-text="orderInfo.express_num"
            >复制</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vAddress from "@/components/mall/address.vue";
import orderItem from "@/components/mall/orderItem";
import vStatus from "./status.vue";
import { OrderDetail } from "@/api/mall";
export default {
  name: "mallOrderDetail",
  components: { orderItem, vAddress, vStatus },
  data() {
    return { orderInfo: {}, address: {} };
  },
  created() {
    this.handLoad();
  },
  methods: {
    async handLoad() {
      this.$Toast.loading({ duration: 0 });
      const { success, data, msg } = await OrderDetail(this.$route.params.id);
      this.$Toast.clear();
      if (success) {
        this.orderInfo = data;
        this.address = {
          name: data.consignee,
          address: data.address,
          phone: data.phone,
        };
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.order-detail {
  font-size: 28px;
  background-color: @bg-second;
  min-height: 100vh;
  .contain {
    padding: 0 32px;
  }
  .order-detail-address {
    background-color: @bg-match;
    margin: 32px 0;
  }
  .main {
    color: @main;
  }
  .order-info {
    background-color: @bg-match;
    margin-top: 32px;
    padding: 32px 32px 16px;
    border-radius: 8px;
    .item {
      position: relative;
      line-height: 34px;
      margin-bottom: 16px;
    }
    .copy {
      position: absolute;
      right: 0;
      top: -6px;
      border: 1px solid @line1;
      text-align: center;
      width: 72px;
      line-height: 42px;
      border-radius: 6px;
    }
  }
}
</style>
