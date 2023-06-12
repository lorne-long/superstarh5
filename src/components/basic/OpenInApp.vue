<template>
  <div class="open-in-app safe-top">
    <div class="left">
      <img src="~@/assets/logo.png" class="logo" alt="" />
      <div class="name">辰星俱乐部</div>
    </div>
    <a
      :href="DownLoadUrl"
      v-gather="'download_app'"
      target="_blank"
      class="open-btn"
      >下载</a
    >
  </div>
</template>
<script>
import "icons/close.svg";
import { platform } from "../../utils/";
export default {
  data() {
    return {
      platform,
      DownLoadUrl: process.env.VUE_APP_WEBSITE,
    };
  },
  mounted() {
    this.openWithApp();
  },
  methods: {
    openWithApp() {
      var scheme =
        "acingstar:" +
        window.location.href.replace(window.location.protocol, ""); // 需要打开的app scheme 地址
      // 尝试打开 scheme
      var iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = scheme;
      document.body.appendChild(iframe);
    },
  },
};
</script>
<style lang="less" scoped>
.open-in-app {
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 32px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-size: 28px;
  .left {
    display: flex;
    align-items: center;
  }
  .name {
    margin-left: 32px;
  }
  .logo {
    height: 90px;
    width: 90px;
    border-radius: 12px;
  }
  .open-btn {
    // background-color: lavender;
    background-image: linear-gradient(90deg, #7b2af3 0%, #3842d3 100%);
    color: #fff;
    line-height: 60px;
    padding: 0 22px;
    border-radius: 8px;
    font-size: 24px;
  }
}
</style>
