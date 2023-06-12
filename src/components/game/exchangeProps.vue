<template>
  <Popup round :value="value" class="visible" @input="$emit('input')" closeable>
    <div class="popup-warp">
      <slot name="title">
        <div class="title">{{ title }}</div>
      </slot>
      <div class="popup-content">
        <slot>
          <div>
            奖品道具将会通过邮件的方式直接发送到您的游戏内，请您确认角色信息
          </div>
          <br />
          <vRole ref="role" :gameId="gameId" />
        </slot>
      </div>
      <div v-if="footer !== null">
        <v-button @click="onOK()">{{ btnTxt }}</v-button>
      </div>
    </div>
  </Popup>
</template>
<script>
import { Popup } from "vant";
import vRole from "./role.vue";
export default {
  components: { Popup, vRole },
  props: {
    btnTxt: { type: String, default: "确定兑换" },
    title: { type: String },
    gameId: { type: [String, Number], default: 0 },
    value: { type: Boolean, default: false },
    footer: {},
  },
  methods: {
    async onOK() {
      const { formModal } = this.$refs.role;
      if (!formModal.role_id) {
        return this.$Toast("请选择角色");
      }
      this.$emit("ok", formModal);
    },
  },
};
</script>
<style lang="less" scoped>
.popup-warp {
  .popup-content {
    margin: 40px 0;
  }
}
</style>
