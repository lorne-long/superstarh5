<template>
  <Popup v-model="visible" round close> </Popup>
</template>
<script>
import { Popup } from "vant";
export default {
  components: { Popup },
  data() {
    return { visible: false };
  },
};
</script>
<style lang="less" scoped>
.result {
  .title {
    font-size: 32px;
    color: #2fcbdf;
    text-align: center;
  }
  padding: 80px 32px 40px;
  width: 584px;
  border-radius: 16px;
  background-color: #ffffff;
  background-image: url(~@/assets/tmd2.png);
  background-repeat: no-repeat;
  background-position: right 0;
  background-size: contain;
  color: #2fcbdf;
  text-align: center;
  font-size: 28px;
  color: #333;
  .close {
    position: absolute;
    top: 22px;
    right: 22px;
    font-size: 58px;
    color: #ccc;
  }
}
</style>
