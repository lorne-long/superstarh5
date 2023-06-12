<template>
  <svg class="svg-icon" :class="[className, dir]" aria-hidden="true">
    <use v-bind:xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      // svg文件名称
      type: String,
      required: true,
    },
    dir: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: transform 0.3s;
  animation-duration: 0.3s;
  &.right {
    transform: rotate(-90deg);
  }
  &.left {
    transform: rotate(90deg);
  }
  &.top {
    transform: rotate(-180deg);
  }
}
</style>
