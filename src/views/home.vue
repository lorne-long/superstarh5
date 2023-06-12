<template>
  <div class="menu">
    <router-link
      v-for="item in list"
      :to="{ name: item.name }"
      :key="item.name"
    >
      {{ item.meta ? item.meta.title : item.name }}
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    const { routes } = this.$router.options;
    const list = [];
    routes.forEach((element) => {
      list.push(element);
      element.children && list.push(...element.children);
    });
    this.list = list.filter((item) => item.meta);
  },
};
</script>

<style lang="less" scoped>
.menu {
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  a {
    text-align: center;
    width: 33.33%;
    line-height: 80px;
    border: 1px solid red;
  }
}
</style>
