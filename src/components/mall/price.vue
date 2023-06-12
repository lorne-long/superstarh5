<template>
  <div class="cargo-price" :class="!price || price <= 0 ? 'integral' : 'price'">
    <template v-if="!price || price <= 0">
      <i class="icon"></i> <span class="val">{{ integral }}</span>
    </template>
    <template v-else>
      <em>¥</em><span class="val">150</span><sub class="sub">参考价¥210</sub>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    integral: { type: [Number, String], default: 0 },
    price: { type: [Number, String], default: 0 },
  },
};
</script>
<style lang="less" scoped>
.cargo-price {
  display: flex;
  align-items: center;
  font-size: 24px;
  .val {
    font-size: 36px;
  }
  &.integral .val {
    color: #ffdb00;
  }
  &.price {
    .val {
      margin-right: 16px;
    }
  }
  .sub {
    text-decoration: line-through;
  }
  em {
    align-self: flex-end;
    font-style: normal;
  }
  .icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    .img("masonry","png");
    margin-right: 12px;
  }
}
</style>
