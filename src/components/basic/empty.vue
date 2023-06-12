<template>
  <div class="empty">
    <van-image class="img" :src="images[image]" />
    <div class="description">{{ description }}</div>
    <slot></slot>
  </div>
  <!-- <van-empty :image="empty"></van-empty> -->
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    image: { type: String, default: "data" },
    description: {
      type: String,
      default: "啊喔，当前暂无数据",
    },
  },
  computed: {
    ...mapState(["theme"]),
    images() {
      const theme = this.theme;
      return {
        data: require(`@/assets/${theme}/empty-data.png`),
        network: require(`@/assets/${theme}/empty-network.png`),
        welfare: require(`@/assets/${theme}/empty-welfare.png`),
        mall: require(`@/assets/${theme}/empty-mall.png`),
        bag: require(`@/assets/${theme}/empty-bag.png`),
      };
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.empty {
  width: 100%;
  padding: 32px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  .img {
    width: 375px;
    margin-bottom: 50px;
  }
  .description {
    padding: 0 32px;
    line-height: 1.6;
    color: #9de4e8;
    font-size: 30px;
    white-space: pre-wrap;
  }
}
</style>
