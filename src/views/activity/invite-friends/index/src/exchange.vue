<template>
  <div class="box exchange">
    <div class="title">星币兑换</div>
    <div class="list">
      <div class="item" v-for="(item, i) in dataSource" :key="i">
        <div class="img">
          <van-image
            class="v-img"
            fit="scale-down"
            :src="item.main_image_url"
          />
        </div>
        <div class="content">
          <div class="name ellipsis">
            {{ item.name }}
          </div>
          <div class="flex items price">
            <i class="coin small"></i>
            <span>{{ item.integral }}</span>
          </div>
          <div class="waring">
            <!-- {{ item.restriction_description }} -->
          </div>
          <button
            class="btn"
            v-gather="{
              event_name: 'props_bags_receive',
              game_id: gameId,
              props_bags_id: item.id,
            }"
            v-login
            :class="{ dis: item.id == -1 }"
            @click="handChange(item)"
          >
            兑换
          </button>
        </div>
      </div>
    </div>
    <vExchangeProps
      @ok="handOk"
      v-model="exchang"
      :gameId="gameId"
      title="选择角色"
    />
  </div>
</template>
<script>
import vExchangeProps from "@/components/game/exchangeProps.vue";
import { Exchange } from "@/api/activity/invitefriends";
export default {
  components: { vExchangeProps },
  props: {
    dataSource: { type: Array, default: () => [] },
    gameId: { type: [Number, String], default: undefined },
    kid: { type: [Number, String] },
  },
  data() {
    return { exchang: false, current: {} };
  },
  methods: {
    handChange(item) {
      this.exchang = true;
      this.current = item;
    },
    async handOk(params = {}) {
      const toast = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await Exchange({
        id: this.kid,
        props_bags_id: this.current.id,
        ...params,
      });
      this.current = undefined;
      toast.clear();
      if (success) {
        this.exchang = false;
        this.$Toast.success("兑换成功");
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url(../index.less);
.exchange {
  width: 670px;
  margin: 52px auto 0;
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    border-radius: 8px;
    overflow: hidden;
    width: 281px;
    margin-left: 28px;
    margin-bottom: 24px;
    background-color: #fff;
    .content {
      padding: 16px 24px 24px;
      color: #333;
      line-height: 34px;
    }
    .img {
      background: #f8f8f8;
      height: 281px;
      line-height: 281px;
      width: 100%;
      text-align: center;
      .v-img {
        vertical-align: middle;
        width: 133px;
        height: 133px;
      }
    }
  }
  .price {
    color: #ffdb00;
    margin: 8px 0;
    line-height: 30px;
    .coin {
      margin-right: 10px;
    }
  }
  .waring {
    font-size: 24px;
    color: #999999;
    margin: 0 0 16px;
  }
  .name {
    line-height: 1.6;
  }
  .btn {
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    height: 64px;
    line-height: 64px;
    border-radius: 8px;
    text-align: center;
    color: #fff;
    background-image: @btn-main;
    &.dis {
      background: #ccc;
      color: #999;
    }
  }
}
</style>
