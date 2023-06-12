<template>
  <Popup
    position="bottom"
    round
    :value="value"
    :lock-scroll="true"
    @close="$emit('input', false)"
    @click-overlay="$emit('input', false)"
  >
    <div class="welfare safe-bottom">
      <span @click="$emit('input', false)" class="close">
        <svg-icon name="down"
      /></span>
      <div class="welfare-header line-b">
        <span class="bold">{{ game.name || "-" }}</span>
        <span
          >共{{ item.props_bags_total }}款礼包,<span class="wait">{{
            item.pending_total
          }}</span
          >款待领取</span
        >
      </div>
      <gift :gameId="game.id" @change="bindChange" />
    </div>
  </Popup>
</template>
<script>
import { Popup } from "vant";
import gift from "@/components/game/gift";
import "icons/down.svg";
export default {
  components: { Popup, gift },
  props: ["item", "value"],
  data: () => ({
    visabled: false,
  }),
  computed: {
    game() {
      return this.item.game || {};
    },
  },
  methods: {
    more() {
      this.visabled = true;
    },
    bindChange() {
      this.$emit("change");
    },
  },
};
</script>
<style lang="less" scoped>
.welfare {
  position: relative;
  background-color: @bg-match;
  height: 70vh;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0;
  .welfare-header {
    position: relative;
    padding: 32px;
    letter-spacing: 0;
    line-height: 32px;
    &::after {
      border-bottom-color: @line1;
    }
    .bold {
      margin-right: 16px;
    }
    .wait {
      color: @main;
    }
  }
  .bold {
    font-weight: bold;
    font-size: 36px;
  }
  .close {
    position: absolute;
    right: 32px;
    top: 30px;
    font-size: 36px;
    color: #999;
    z-index: 2;
  }
  .welfare-list {
    padding: 32px;
    flex: 1;
    overflow: auto;
  }
}
</style>
