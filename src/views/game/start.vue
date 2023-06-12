<template>
  <van-overlay :show="visable" :zIndex="999">
    <div class="appointment-success">
      <i class="close" @click="visable = false">
        <svg-icon name="close" />
      </i>
      <div>您安装了多款相同的游戏，请选择想要启动的游戏：</div>
      <div
        class="game-item"
        v-for="(item, i) in gameList"
        :key="i"
        @click="StartGame(item)"
      >
        <img class="logo" :src="item.icon || icon" />
        <div class="name ellipsis">{{ item.name }}</div>
        <div class="btn" @click="startGame(item)">启动</div>
      </div>
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
  props: { gameList: { type: Array, default: () => [] }, icon: String },
  data: () => {
    return { visable: false };
  },

  methods: {
    startGame(item) {
      this.$emit("action", item);
      this.visable = false;
    },
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
  margin: 0 auto;
  padding: 100px 32px 20px;
  font-size: 28px;
  color: #333;
  font-size: 28px;
  line-height: 40px;
  .close {
    position: absolute;
    top: 22px;
    right: 22px;
    font-size: 58px;
  }
  .game-item {
    display: flex;
    align-items: center;
    margin: 32px 0;
    .name {
      flex: 1;
      padding: 0 20px;
    }
    .logo {
      width: 104px;
      height: 104px;
      display: block;
      margin: 0 auto;
      flex-shrink: 0;
    }
    .btn {
      background-image: @btn-main;
      border-radius: 8px;
      line-height: 64px;
      height: 64px;
      text-align: center;
      width: 164px;
      color: #fff;
      flex-shrink: 0;
    }
  }
}
</style>
