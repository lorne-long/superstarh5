<template>
  <div class="item">
    <div class="num">{{ index }}</div>
    <van-image class="avtar" round :src="getAvatar(source.avatar)" />
    <div class="name">{{ source.nickname | hide }}</div>
    <span class="val">{{ source.coin }}</span>
    <span class="coin small"></span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    source: { type: Object, default: () => ({}) },
    index: {},
  },
  computed: {
    ...mapGetters(["getAvatar"]),
  },
};
</script>
<style lang="less" scoped>
@import "../coin.less";
.item {
  height: 136px;
  display: flex;
  align-items: center;
  .num {
    font-size: 40px;
    font-weight: bold;
    width: 88px;
  }
  .avtar {
    height: 88px;
    width: 88px;
    margin-right: 22px;
  }
  .val {
    color: #666;
    margin-right: 10px;
  }
  .name {
    flex: 1;
  }
}
</style>
