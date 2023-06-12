<template>
  <div class="cargo-sale line-t pdlr">
    <div class="item">销量：{{ sales }}</div>
    <div class="item">库存：{{ inventory }}</div>
  </div>
</template>
<script>
export default {
  props: ["inventory", "sales"],
};
</script>
<style lang="less" scoped>
.cargo-sale {
  position: relative;
  line-height: 72px;
  padding: 0 32px;
  display: flex;
  background-color: @bg-match;
  font-size: 24px;
  &::after {
    border-top-color: @line1;
  }
  .item {
    width: 50%;
    flex-shrink: 0;
    color: #999;
  }
}
</style>
