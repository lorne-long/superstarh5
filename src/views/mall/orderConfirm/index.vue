<template>
  <div class="confirm-order">
    <!-- <van-sticky> <van-nav-bar title="确认订单" /></van-sticky> -->
    <div class="btn-add" @click="$refs.address.toggle()" v-if="!address">
      <div class="add">请添加收货地址</div>
    </div>
    <AddressItem
      v-else
      class="address-warp"
      :address="address"
      @click="$refs.address.toggle()"
    />
    <div class="warp">
      <orderItem :source="info" />
    </div>
    <div class="btn-warp">
      <v-button
        @click="handSubmit"
        v-gather="'periphery_receive'"
        :disabled="!address || (skuVal && skuVal.inventory <= 0)"
        >{{
          !skuVal ? "购买" : skuVal.inventory > 0 ? "购买" : "库存不足"
        }}</v-button
      >
    </div>
    <vAddress ref="address" @confirm="(v) => (address = v)" />
  </div>
</template>
<script>
import AddressItem from "@/components/mall/address.vue";
import vAddress from "@/components/mall/popupAddress";
import orderItem from "@/components/mall/orderItem";
import { addOrder, ProductDetail } from "@/api/mall";
import { omit } from "lodash-es";
import { mapGetters } from "vuex";
export default {
  name: "mallOrderConfirm",
  components: {
    vAddress,
    orderItem,
    AddressItem,
  },
  data() {
    return {
      loading: true,
      address: undefined,
      info: {},
      skuVal: undefined,
    };
  },
  created() {
    const { id, sku } = this.$route.params;
    this._id = id;
    this._sku = sku;
    this.handLoad();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },

  methods: {
    async handLoad() {
      this.$Toast.loading({ duration: 0 });
      const { success, data, msg } = await ProductDetail({
        id: this._id,
      });
      this.$Toast.clear();
      if (success) {
        var skuVal = data.sku_items.find((item) => item.sku_id == this._sku);
        if (!skuVal) {
          this.$Toast.fail("不存在该规格");
          this.$router.back();
          return;
        }
        this.skuVal = skuVal;
        var valArr = data.spec_items.map((item, i) => {
          //找到选择的sku
          return {
            ...item,
            spec_items: item.spec_items.filter(
              (sku) => sku.spec_item_id == skuVal.spec_item_ids[i]
            ),
          };
        });
        this.info = {
          ...omit(data, ["sku_items", "spec_items"]),
          spec_items: valArr,
          integral: skuVal.integral,
          inventory: skuVal.inventory,
        };
      } else {
        this.$Toast.fail(msg);
      }
    },
    async handSubmit() {
      if (!this.address) {
        return this.$refs.address.toggle();
      }
      if (this.info.integral > this.userInfo.integral) {
        return this.$Toast.fail("积分不足");
      }
      this.$Toast.loading({ duration: 0 });
      const { success, msg, data } = await addOrder({
        sku_id: this._sku,
        address_id: this.address.id,
      });
      this.$Toast.clear();
      if (success) {
        this.$router.push({
          name: "mallOrderDetail",
          params: { id: data.order_id },
        });
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.confirm-order {
  min-height: 100vh;
  background-color: @bg-second;
  .safe-bottom(124px);
  .btn-add {
    background-color: @bg-match;
    padding: 16px;
    .add {
      height: 155px;
      text-align: center;
      line-height: 155px;
      background: rgba(47, 203, 223, 0.05);
      border: 1px dashed @main;
      border-radius: 8px;
      font-size: 28px;
      color: @main;
    }
  }
  .address-warp {
    background-color: @bg-match;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6px;
      .img("mall/地址条");
      background-repeat: repeat-x;
    }
  }
  .warp {
    padding: 0 32px;
    margin-top: 32px;
  }
  .btn-warp {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 32px;
    width: 100%;
    padding-top: 24px;
    .safe-bottom(24px);
  }
}
</style>
