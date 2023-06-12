<template>
  <div class="tab" ref="malltab">
    <div
      v-for="(item, i) in source"
      :key="item.id"
      ref="tab"
      class="tab-item"
      :class="{ active: item.id == value }"
      :style="item.id == value ? activeStyle : undefined"
      @click="tabClick(item, i)"
    >
      {{ item.name }}
    </div>
    <div class="tabs-line" ref="tabLine"></div>
  </div>
</template>
<script>
export default {
  props: {
    activeStyle: [String, Object],
    value: [Number, String],
    source: { type: Array, default: () => [] },
  },
  watch: {
    value() {
      this.watchChang();
    },
    source() {
      this.watchChang();
    },
  },
  mounted() {
    this.watchChang();
  },
  methods: {
    tabClick(item, i) {
      this.$emit("input", item.id);
      this.$emit("change", item.id, i);
    },
    watchChang() {
      this.$nextTick(() => {
        var ids = this.source.findIndex((item) => {
          return item.id == this.value;
        });
        ids > -1 && this.changeLine(ids);
      });
    },
    changeLine(i) {
      const { offsetWidth: _w } = this.$refs.malltab;
      console.log();
      const { offsetLeft, offsetWidth } = this.$refs.tab[i];
      this.$refs.malltab.scrollTo({
        top: 0,
        left: offsetLeft - _w / 2 + offsetWidth / 2,
        behavior: "smooth",
      });
      this.$refs.tabLine.style = `transform:translateX(${
        offsetLeft + offsetWidth / 2
      }px) translateX(-50%); transition-duration: 0.3s;`;
    },
  },
};
</script>
<style lang="less" scoped>
.tab {
  height: 112px;
  flex-shrink: 0;
  padding: 0 24px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  line-height: 112px;
  font-size: 32px;
  position: relative;
  align-items: center;
  &-item {
    padding: 0 24px;
  }
  .active {
    font-weight: bold;

    color: rgba(84, 152, 255, 1);
  }
  .tabs-line {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 32px;
    height: 6px;
    background-image: @btn-main;
    border-radius: 3px;
  }
}
</style>
