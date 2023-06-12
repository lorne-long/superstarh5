<template>
  <div class="container award">
    <div class="list">
      <div class="item" v-for="item in products" :key="item.id">
        <div class="img">
          <van-image
            fit="scale-down"
            class="v-img"
            :src="item.props ? item.props.image : ''"
          />
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="price">
            <i class="coin"></i> <span>{{ item.integral }}</span>
          </div>
          <button
            class="btn-get"
            v-gather="{
              event_name: 'props_bags_receive',
              game_id: gameId,
              props_bags_id: item.id,
            }"
            v-login
            @click="handShow(item)"
          >
            兑换
          </button>
        </div>
      </div>
    </div>
    <exchangeProps
      @ok="handConfirm"
      v-model="exchang"
      :gameId="gameId"
      title="选择角色"
    />
    <Popup v-model="visible" round>
      <div class="popup-warp pop-recharge">
        <div class="close" @click="visible = false">
          <svg-icon name="close" />
        </div>
        <div class="title">兑换奖品</div>
        <div class="confirm-txt">确认是否兑换如下奖品</div>
        <van-image
          fit="scale-down"
          class="img"
          :src="current.props ? current.props.image : ''"
          alt=""
        />
        <div>{{ current.name }}</div>
        <div class="name"><i class="coin"></i>{{ current.integral }}</div>
        <v-button @click="handOk">确定</v-button>
      </div>
    </Popup>
  </div>
</template>
<script>
import { tripExchange } from "@/api/activity/";
import exchangeProps from "@/components/game/exchangeProps";
import { Popup } from "vant";
export default {
  components: {
    exchangeProps,
    Popup,
  },
  props: { products: { type: Array, default: () => [] }, gameId: {}, id: {} },
  data() {
    return { visible: false, exchang: false, current: {}, params: {} };
  },
  methods: {
    handShow(item) {
      this.exchang = true;
      this.current = item;
    },
    handConfirm(params) {
      this.params = params;
      this.visible = true;
      this.exchang = false;
    },
    async handOk() {
      const tosat = this.$Toast.loading({ duration: 0, mask: true });
      const { success, msg } = await tripExchange({
        id: this.id,
        props_bags_id: this.current.id,
        ...this.params,
      });
      tosat.clear();
      if (success) {
        this.exchang = false;
        this.$Toast.success("兑换成功,请进入游戏查收");
      } else {
        this.$Toast.fail(msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../index.less";
.award {
  position: relative;
  border: @bd;
  background-color: @bg-cl;
  color: #333333;
  padding: 50px 0 24px;
  border-radius: 16px;
  &::after {
    background-image: url(../img/txt4.png);
  }
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 28px;
  }
  .item {
    border-radius: 8px;
    background-color: #fff;
    width: 305px;
    margin-bottom: 24px;
    overflow: hidden;

    .info {
      padding: 0 24px 24px;
      background-color: #fff;
    }
    .img {
      height: 305px;
      line-height: 305px;
      width: 100%;
      text-align: center;
      background: #f8f8f8;
      .v-img {
        vertical-align: middle;
        width: 133px;
        height: 133px;
      }
    }
    .price {
      display: flex;
      align-items: center;
      color: #ffdb00;
      line-height: 34px;
      font-weight: 400;
    }
    .name {
      .multi-ellipsis(2);
      line-height: 34px;
      font-weight: 400;
      margin: 16px 0;
      color: #333;
    }
    .btn-get {
      line-height: 64px;
      text-align: center;
      width: 100%;
      color: #fff;
      margin-top: 16px;
      background-image: linear-gradient(90deg, #7b2af3 0%, #3842d3 100%);
      border-radius: 8px;
    }
  }
}
.popup-warp {
  padding-top: 80px;
  line-height: 40px;
  font-size: 28px;
  text-align: center;
  .confirm-txt {
    margin-top: 20px;
    text-align: left;
  }
  .img {
    margin: 20px 0;
    height: 180px;
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
