<template>
  <Popup position="bottom" class="visible safe-bottom" round v-model="visable">
    <div class="close" @click="visable = false">
      <svg-icon name="close" />
    </div>
    <div class="title">选择地址</div>
    <div class="choose-address" v-if="ispdate">
      <v-address
        v-for="(item, i) in address"
        :key="i"
        :address="item"
        @click="onClick(item, i)"
        @edit="edit(item)"
        :class="{ active: i === active }"
      />
      <v-empty v-show="!loading && address.length == 0" />
    </div>
    <v-button class="btn" @click="edit()">添加收货地址 </v-button>
  </Popup>
</template>
<script>
import { Popup } from "vant";
import "icons/close.svg";
import "icons/down.svg";
import vAddress from "./address.vue";
import AppAction, { actionMap } from "@/utils/app-action";
import { AddressList } from "@/api/mall";
export default {
  components: { Popup, vAddress },
  data() {
    return {
      visable: false,
      active: -1,
      address: [],
      loading: false,
      ispdate: true,
    };
  },
  watch: {
    visable(v) {
      v && this.getAddress();
    },
  },
  methods: {
    async getAddress() {
      const _this = this;
      _this.loading = true;
      const { success, data } = await AddressList();
      _this.loading = false;
      if (success) {
        const _list = data.addresses || [];
        this.$set(_this, "address", _list);
        if (this.active > -1) {
          _this.$emit("confirm", _list[this.active]);
        } else {
          var idx = _list.findIndex((item) => item.default == 1);
          _this.active = idx > -1 ? idx : undefined;
          _this.$emit("confirm", idx > -1 ? _list[idx] : undefined);
        }
      }
    },
    onClick(item, i) {
      this.visable = false;
      this.active = i;
      this.$emit("confirm", item);
    },
    toggle() {
      this.visable = true;
    },
    async edit(address = {}) {
      const { data, success } = await AppAction(actionMap.addAddredd, address);
      if (success && data === true) {
        this.getAddress();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.close {
  position: absolute;
  top: -64px;
  right: 32px;
  border-radius: 50%;
  border: 1px solid #fff;
  color: #fff;
  padding: 8px;
}
.title {
  padding: 32px 32px;
}
.choose-address {
  max-height: 70vh;
  padding: 0 32px;
  border-radius: 16px 16px 0 0;
  background-color: @bg-match;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
.btn {
  width: calc(100% - 64px);
  margin: 0 auto 12px;
}
</style>
