<template>
  <div class="layout">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cachedViews: [],
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: @tabBarH;
  padding-bottom: calc(@tabBarH + constant(safe-area-inset-bottom));
  padding-bottom: calc(@tabBarH + env(safe-area-inset-bottom));
}
</style>
