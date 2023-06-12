<template>
  <PullRefresh
    class="virtual-list"
    v-model="isRefresh"
    @refresh="getData(0)"
    :disabled="disabled"
  >
    <!-- :success-text="$t('Common.success-text')"
    :pulling-text="$t('Common.pulling-text')"
    :loosing-text="$t('Common.loosing-text')"
    :loading-text="$t('Common.loading-text')" -->
    <virtual-list
      style="height: 100%; overflow-y: auto"
      v-bind="{
        ...$props,
      }"
      @tobottom="tobottom"
      @totop="totop"
      @resized="resized"
      @scroll="scroll"
    >
      <template slot="header">
        <v-empty
          :image="image"
          :description="description"
          v-show="!isLoading && dataSources.length == 0"
        />
      </template>
      <template #footer>
        <van-loading
          v-show="isLoading"
          type="spinner"
          class="loading"
          size="14"
        />
      </template>
      <template :slot="slot" v-for="slot in slots">
        <slot :name="slot"></slot>
      </template>
    </virtual-list>
  </PullRefresh>
</template>
<script>
import { PullRefresh } from "vant";
import VirtualList from "vue-virtual-scroll-list";
export default {
  components: { VirtualList, PullRefresh },
  name: "virtual-scroll-list",
  props: {
    dataKey: String,
    image: { type: String, default: "data" },
    description: { type: String },
    dataComponent: {},
    dataSources: { type: [Object, Array], default: () => [] },
    estimateSize: { type: Number, default: 50 },
    keeps: { type: Number, default: 30 },
    start: { type: Number, default: 0 },
    offset: { type: Number, default: 0 },
    direction: { type: String, default: "vertical" },
    pageMode: { type: Boolean, default: false },
    topThreshold: { type: Number, default: 0 },
    bottomThreshold: { type: Number, default: 0 },
    itemClass: String,
    itemStyle: { type: Object, default: () => ({}) },
    itemTag: { type: String, default: "div" },
    wrapClass: String,
    wrapStyle: { type: Object, default: () => ({}) },
    wrapTag: { type: String, default: "div" },
    headerClass: String,
    headerStyle: { type: Object, default: () => ({}) },
    headerTag: { type: String, default: "div" },
    footerClass: String,
    footerStyle: { type: Object, default: () => ({}) },
    footerTag: { type: String, default: "div" },
    rootTag: { type: String, default: "div" },
    finished: { type: Boolean, default: false },
    extraProps: { type: Object, default: () => ({}) },
    immediate: { type: Boolean, default: true },
    loadData: {
      type: Function,
      default: () => {
        return Promise.resolve();
      },
    },
  },
  data() {
    return {
      isLoading: false,
      isRefresh: false,
      disabled: false,
    };
  },
  mounted() {
    this.immediate && this.getData(0);
  },
  computed: {
    slots() {
      return Object.keys(this.$slots);
    },
  },
  methods: {
    resized(id, size) {
      this.$emit("resized", { id, size });
    },
    scroll(event, range) {
      this.disabled = true;
      this.$emit("scroll", { event, range });
    },
    totop() {
      this.disabled = false;
      this.$emit("totop");
    },
    tobottom() {
      this.getData(this.page);
      // this.$emit("tobottom");
    },
    async getData() {
      if (this.isLoading === true) return (this.isRefresh = false);
      if (!this.isRefresh) this.isLoading = true;
      await this.loadData(this.isRefresh);
      this.isLoading = this.isRefresh = false;
    },
  },
};
</script>
<style lang="less" scoped>
.virtual-list {
  flex: 1;
  height: 100%;
}
.loading {
  text-align: center;
  padding: 16px 0;
}
</style>
