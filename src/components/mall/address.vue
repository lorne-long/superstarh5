<template>
  <div class="address-item">
    <div @click="$emit('click')">
      <span class="name">{{ address.name }}</span
      >&nbsp;<span>{{ address.phone }}</span>
    </div>
    <div class="address-info" @click="$emit('click')">
      <span class="main" v-if="isDefault && address.default == 1">默认</span>
      <span class="info">
        {{ address.address }}
      </span>
    </div>
    <span class="icon" v-if="isIcon" @click="$emit('edit')">
      <svg-icon name="down" dir="right" />
    </span>
  </div>
</template>
<script>
import "icons/close.svg";
import "icons/down.svg";
export default {
  props: {
    address: {},
    isDefault: { type: Boolean, default: true },
    isIcon: { type: Boolean, default: true },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.address-item {
  position: relative;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 24px 64px 32px 32px;
  font-size: 28px;
  line-height: 34px;
  &.active::after {
    .hairline(@main);
    border-width: 1px;
    border-radius: 8px;
  }
  .scheme(background-color, #F5F5F5,#1a1a1a);
  &:last-child {
    margin-bottom: 0;
  }
  .address-info {
    margin-top: 13px;
    line-height: 42px;
    height: 84px;
    padding-right: 2em;
    font-size: 24px;
    color: #788;
    .multi-ellipsis(2);
  }
  .icon {
    position: absolute;
    right: 32px;
    top: 50%;
    padding: 0 12px;
    font-size: 36px;
    transform: translateY(-50%);
  }
  .name {
    margin-right: 10px;
  }
  .main {
    display: inline-block;
    background: @btn-main;
    border-radius: 6px;
    padding: 0 5px;
    font-size: 24px;
    color: #fff;
    line-height: 36px;
    margin-right: 8px;
  }
}
</style>
