<template>
  <Overlay :show="visible" :lock-scroll="false" zIndex="111">
    <div class="container bindgame">
      <div class="txt">请选择需要绑定的游戏，绑定后不允许更改！</div>
      <v-select
        :columns="games"
        class="select"
        v-model="game_id"
        placeholder="请选择游戏"
      />
      <v-button class="btn" :disabled="!game_id" @click="bindSubmit"
        >确定</v-button
      >
    </div>
  </Overlay>
</template>
<script>
import vSelect from "@/components/basic/select";
import { tripBindGame } from "@/api/activity/";
import { games } from "@/api/game";
import { Overlay } from "vant";
export default {
  components: { vSelect, Overlay },
  data() {
    return {
      visible: false,
      games: [],
      game_id: undefined,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.getGames();
      }
    },
  },
  methods: {
    async getGames() {
      const { success, data } = await games();
      if (success) {
        this.games = data.games.map((item) => {
          return { text: item.name, value: item.id };
        });
      }
    },
    async bindSubmit() {
      const { game_id } = this;
      const tosat = this.$Toast.loading({ duation: 0 });
      const { success, data } = await tripBindGame({ game_id });
      tosat.clear();
      console.log(data);
      if (success) {
        this.visible = false;
        this.$emit("change", game_id);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../index.less";
.container.bindgame {
  position: fixed;
  left: 24px;
  width: 702px;
  top: 50%;
  z-index: 99;
  padding: 0 32px;
  transform: translateY(-50%);
  &::after {
    background-image: url(../img/txt3.png);
  }

  .txt {
    font-size: 28px;
    text-align: center;
    margin: 32px 0 32px;
  }
  .btn {
    margin: 32px 0;
  }
}
</style>
