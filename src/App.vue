<template>
  <div id="app">
    <v-login />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import vLogin from "./views/login";
export default {
  components: {
    vLogin,
  },
  created() {
    this.$store.dispatch("login"); //直接从app获取token进行登录;
  },
};
</script>
<style lang="less" scoped></style>
