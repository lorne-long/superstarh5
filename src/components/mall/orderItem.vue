<template>
  <div :class="`order-cargo ${model}`">
    <div class="order-cargo-name" v-if="model == 'bottom'">
      {{ source.product_name }}
    </div>
    <div class="info">
      <VanImage
        class="order-cargo-logo"
        fit="scale-down"
        :src="source.main_image_url"
        :lazy-load="true"
      />
      <div class="order-cargo-right">
        <div class="order-cargo-name" v-if="model == 'mid'">
          {{ source.product_name }}
        </div>
        <div class="flex grow items">
          <vPrice :integral="source.integral" />
        </div>
        <div class="order-cargo-sale" v-if="sale">
          <div class="item">销量：{{ source.sales }}</div>
          <div class="item">库存：{{ source.inventory }}</div>
        </div>
      </div>
    </div>
    <div class="sku-item" v-for="(item, x) in source.spec_items" :key="x">
      {{ source.sku ? source.sku[0] : "" }}
      <template v-for="elm in item.spec_items"
        >{{ item.spec_name }}：{{ elm.spec_item_value }}</template
      >
    </div>
  </div>
</template>
<script>
import vPrice from "@/components/mall/price";
import { Image as VanImage } from "vant";
export default {
  props: {
    source: { type: Object, default: () => ({}) },
    sale: { type: Boolean, default: true },
    model: { type: String, default: "bottom" },
  },
  components: { vPrice, VanImage },
};
</script>
<style lang="less" scoped>
.order-cargo {
  background-color: @bg-match;
  border-radius: 8px;
  padding: 32px;
  &.mid {
    padding-top: 0;
    .order-cargo-name {
      font-size: 28px;
    }
    .info {
      margin-top: 0;
    }
  }
  &-name {
    .multi-ellipsis(2);
    font-size: 32px;
    line-height: 36px;
  }
  .info {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }
  &-right {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 172px;
    flex: 1;
  }
  &-logo {
    flex-shrink: 0;
    width: 172px;
    height: 172px;
    margin-right: 24px;
    border-radius: 8px;
    overflow: hidden;
  }
  &-sale {
    display: flex;
    width: 100%;
    line-height: 30px;
    background-color: @bg-match;
    font-size: 24px;
    align-self: flex-end;
    .item {
      width: 50%;
      color: #999999;
    }
  }
  .sku-item {
    font-size: 28px;

    line-height: 36px;
    margin-top: 16px;
  }
}
</style>
