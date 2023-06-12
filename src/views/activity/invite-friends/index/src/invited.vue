<template>
  <div class="my-friends" :class="{ disabled }">
    <div class="title">{{ disabled ? "好友邀请码" : "为好友助力" }}</div>
    <div class="control">
      <div class="input" v-if="disabled">{{ helpCode }}</div>
      <input
        v-else
        type="text"
        class="input"
        v-login
        v-model="inviteCode"
        maxlength="30"
        placeholder="输入好友邀请码"
      />
    </div>
    <button
      class="btn-confirm"
      v-if="!disabled"
      v-login
      @click="handHelp"
      v-gather="'confirm_invitation'"
    >
      确认
    </button>
    <button class="btn-confirm" v-else v-login @click="unBind">解除绑定</button>
    <Popup round v-model="visable" closeable>
      <div class="popup-warp">
        <div class="popup-title">助力成功</div>
        <div class="popup-content">
          <img src="../../imgs/laugh.png" alt="" />
        </div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Popup, Dialog } from "vant";
import { Help, unBanding } from "@/api/activity/invitefriends";
export default {
  components: { Popup },
  props: ["helpCode"],
  data: () => ({
    visable: false,
    inviteCode: undefined,
    hasInvite: false,
  }),
  computed: {
    disabled() {
      return this.helpCode || this.hasInvite;
    },
  },
  methods: {
    async unBind() {
      try {
        await Dialog.confirm({
          title: "解绑提示",
          message: "确认解除绑定?\r\n解除绑定后需等待15天可再次绑定",
        });
        const toast = this.$Toast.loading({ duration: 0, mask: true });
        const { success, msg } = await unBanding();
        toast.clear();
        if (success) {
          this.$Toast.success("解绑成功");
          this.inviteCode = undefined;
          this.hasInvite = false;
          this.$emit("success");
        } else {
          this.$Toast.fail(msg);
        }
      } catch (e) {}
    },
    async handHelp() {
      if (!this.inviteCode) return this.$Toast("输入好友邀请码");
      const toast = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await Help({ invite_code: this.inviteCode });
      toast.clear();
      if (success) {
        // this.$Toast.success("邀请成功");
        this.inviteCode = undefined;
        this.visable = true;
        this.hasInvite = true;
        this.$emit("success");
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url(../index.less);
img {
  display: block;
  width: 112px;
  height: 112px;
  margin: 0 auto;
}
.my-friends {
  width: 670px;
  margin: 0 auto;
  padding-top: 26px;
  background: #fff url(~@/assets/tmd2.png) no-repeat;
  border-radius: 32px;
  background-size: contain;
  background-position: right top;
  &.disabled {
    padding-bottom: 20px;
  }
  .control {
    border: 1px #ffd7ba dashed;
    padding: 16px;
    border-radius: 8px;
    width: 95%;
    margin: 0 auto;
    user-select: text !important;
    .input {
      background-color: #ececee;
      outline: none;
      border: none;
      height: 88px;
      display: block;
      width: 100%;
      line-height: 88px;
      border-radius: 8px;
      text-align: center;
      font-size: 28px;
      color: #333;
      &::placeholder {
        color: #999999;
      }
    }
  }

  .title {
    position: relative;
    color: #2b25ba;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    &::after,
    &::before {
      position: absolute;
      top: 50%;
      left: calc(50% + 4em);
      transform: translateY(-50%) scaleY(0.5);
      content: "";
      height: 1px;
      width: 100px;
      background: linear-gradient(
        to right,
        rgba(43, 37, 186, 1),
        rgba(43, 37, 186, 0)
      );
    }
    &::before {
      left: initial;
      right: calc(50% + 4em);
      background: linear-gradient(
        to right,
        rgba(43, 37, 186, 0),
        rgba(43, 37, 186, 1)
      );
    }
  }
  .btn-confirm {
    line-height: 88px;
    margin-top: 16px;
    text-align: center;
    width: calc(100% + 20px);
    margin-left: -10px;
    font-weight: bold;
    border-radius: 0 0 32px 32px;
    background: linear-gradient(to right, #48bcff, #4260ff);
  }
}
</style>
