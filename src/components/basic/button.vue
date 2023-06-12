<template>
  <div
    class="btn-base"
    v-bind="{ ...$props }"
    :class="[
      size,
      {
        disabled: disabled,
      },
    ]"
    @click="onClick"
  >
    <slot>test</slot>
  </div>
</template>
<script>
// import { Button as vButton } from "vant";
export default {
  name: "vButton",
  props: {
    text: String,
    icon: String,
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: { type: Boolean, default: false },
    iconPrefix: String,
    nativeType: String,
    loadingText: String,
    loadingType: String,
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "normal",
    },
    loadingSize: {
      type: String,
      default: "20px",
    },
    iconPosition: {
      type: String,
      default: "left",
    },
  },
  methods: {
    onClick(e) {
      !this.disabled && this.$emit("click", e);
    },
  },
};
</script>
<style lang="less" scoped>
.btn-base {
  background: @btn-main;
  border-radius: 8px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  font-size: 36px;
  width: 100%;
  &.disabled {
    background: @btn-dis;
  }
  &.small {
    line-height: 64px;
    font-size: 28px;
  }
  &.mini {
    line-height: 44px;
    font-size: 24px;
  }
}
</style>
