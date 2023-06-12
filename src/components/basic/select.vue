<template>
  <div style="position: relative">
    <div class="select hairline-surround" @click="handClick">
      <input
        :placeholder="placeholder"
        disabled
        readonly
        :value="active.text"
      />
      <svg-icon
        class="down"
        :class="{ loading }"
        :name="loading ? 'loading' : 'down'"
      />
    </div>
    <div class="select-options line-b two" v-show="show">
      <div class="line-l two"></div>
      <div class="line-r two"></div>
      <div
        class="options-item line-b two"
        v-for="item in columns"
        @click="onConfirm(item)"
        :class="{ active: item.value == active.value }"
        :key="item.value"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script>
import "icons/down.svg";
import "icons/loading.svg";
export default {
  props: {
    columns: { type: Array, default: () => [] },
    loading: Boolean,
    value: {},
    disabled: Boolean,
    placeholder: String
  },
  data() {
    return { show: false };
  },
  computed: {
    active() {
      const item = this.columns.find((item) => item.value == this.value);
      return item || {};
    },
  },
  methods: {
    handClick() {
      if (this.show) this.show = false;
      else {
        !this.disabled && (this.show = true);
        if (this.show) {
          setTimeout(() => {
            window.addEventListener(
              "click",
              () => {
                this.show = false;
              },
              { once: true }
            );
          }, 100);
        }
      }
    },
    onConfirm(e) {
      e && this.$emit("input", e.value);
      e && this.$emit("change", e);
      this.show = false;
    },
  },
};
</script>
<style lang="less" scoped>
div.select {
  position: relative;
  background-color: @bg-main;
  border-radius: 8px;
  margin-bottom: 16px;
  outline: none;
  &::after {
    border-radius: 8px;
    border-color: @line1;
  }
  input,
  select {
    height: 80px;
    border: none;
    background-color: transparent;
    border: none;
    width: 100%;
    padding: 0 24px;
    height: 80px;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    color: @body;
    border-radius: 4px;
  }
  .down {
    position: absolute;
    right: 32px;
    top: 50%;
    font-size: 36px;
    color: @cl-second;
    transform: translateY(-50%);
    &.loading {
      animation: rotate 1s linear infinite;
    }
  }
}
@keyframes rotate {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}
.select-options {
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: @bg-match;
  box-shadow: 0 0 8px @bg-second;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  .options-item {
    line-height: 80px;
    font-size: 34px;
    color: @cl-second;
    border-radius: 8px;
    padding: 0 24px;
    &.active {
      color: @main;
    }
  }

  &::after {
    border-radius: 8px;
    border-color: @line1;
    background-color: @bg-match;
  }
}
</style>
