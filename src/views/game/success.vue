<template>
  <van-overlay :show="visable" :zIndex="999">
    <div class="appointment-success">
      <i class="close" @click="visable = false">
        <svg-icon name="close" />
      </i>
      <div class="logo">
        <van-image :src="icon" alt="" />
      </div>
      <div class="success">预约成功!</div>
      <div>游戏正式上线时将通过手机短信通知您</div>
      <div class="btn" @click="visable = false">我知道了</div>
    </div>
  </van-overlay>
</template>
<script>
import "icons/close.svg";
import { Overlay } from "vant";
export default {
  components: {
    [Overlay.name]: Overlay,
  },
  props: { icon: String },
  data: () => {
    return { visable: false };
  },
  methods: {
    toggle(v) {
      this.visable = v === undefined ? !this.visable : v;
    },
  },
};
</script>
<style lang="less" scoped>
.appointment-success {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100000;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 16px;
  width: 584px;
  height: 567px;
  margin: 0 auto;
  text-align: center;
  padding-top: 80px;
  font-size: 28px;
  color: #333;
  .close {
    position: absolute;
    top: 22px;
    right: 22px;
    font-size: 58px;
  }
  img {
  }
  .logo {
    width: 104px;
    height: 104px;
    display: block;
    margin: 0 auto;
  }
  .success {
    font-weight: bold;
    font-size: 32px;
    color: @main;
    letter-spacing: 0;
    margin: 32px 0;
  }
  .btn {
    background-image: @btn-main;
    border-radius: 8px;
    margin-top: 66px;
    line-height: 88px;
    width: 374px;
    margin: 66px auto 0;
    color: #fff;
    font-size: 36px;
  }
}
</style>
