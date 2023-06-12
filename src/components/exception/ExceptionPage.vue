<template>
  <div class="exception-page">
    <v-empty image="network" description="啊哦，找不到页面！" />
  </div>
</template>

<script>
import Config from "./typeConfig";
export default {
  name: "ExceptionPage",
  props: ["type", "homeRoute"],

  data() {
    return {
      config: Config,
    };
  },
  methods: {
    backHome() {
      if (this.homeRoute) {
        this.$router.push(this.homeRoute);
      }
      this.$emit("backHome", this.type);
    },
  },
};
</script>

<style lang="less" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: @bg-main;
  .img {
    padding-right: 52px;
    zoom: 1;
    img {
      max-width: 430px;
    }
  }
  .content {
    margin-top: 32px;
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: @main;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
