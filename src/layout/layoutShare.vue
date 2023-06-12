<template>
  <div class="layout safe-bottom">
    <Sticky>
      <OpenInApp v-if="!platform.myApp" />
    </Sticky>
    <router-view />
  </div>
</template>
<script>
import OpenInApp from "@/components/basic/OpenInApp.vue";
import { platform } from "@/utils/";
import { Sticky } from "vant";
export default {
  components: { OpenInApp, Sticky },
  provide() {
    return { setTitle: this.setTitle };
  },
  data() {
    return {
      title: undefined,
      platform,
      cachedViews: [],
    };
  },
  methods: {
    setTitle(t) {
      this.title = t;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
