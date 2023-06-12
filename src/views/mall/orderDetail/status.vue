<template>
  <div class="order-status">
    <div class="img"></div>
    <div v-if="status == 0">
      <div class="title">购买成功</div>
      <div>请您耐心等待发货</div>
    </div>
    <div v-if="status == 1">
      <div class="title">商品已发货</div>
      <div>请您注意查收</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: { type: Number, default: 0 },
  },
};
</script>
<style lang="less" scoped>
.order-status {
  background: @bg-match;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  line-height: 34px;
  padding: 10px 0 32px 0;
  .img {
    width: 114px;
    height: 114px;
    .img("/mall/购买成功","png");
    margin-right: 18px;
  }
  .title {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 4px;
  }
}
</style>
