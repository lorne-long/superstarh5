<template>
  <!-- <div class="title">礼包次数：10</div> -->
  <div class="gift-item">
    <div class="gift-status" :class="{ active: !source.order_status }"></div>
    <div>
      <label>订单编号</label><span>{{ source.order_num }}</span>
    </div>
    <div class="gift-name line-b">
      <label class="ellipsis"
        >游戏礼包*{{ source.items ? source.items.length : 0 }}</label
      >
      <span>{{ source.order_time }}</span>
    </div>
    <div class="role-info">
      <!-- <span>湖北电信一区</span> -->
      <span>{{ source.server_name }}</span>
      <span>{{ source.role_name }}</span>
      <span class="integral">
        <!-- {{source}} -->
        <!-- -{{ source.integral || 0 }}<i></i> -->
      </span>
      <v-button
        v-if="!source.order_status"
        @click="itemClick(source, index)"
        size="small"
        >领取</v-button
      >
    </div>
    <div
      class="prop-item"
      v-for="item in (source.items || []).slice(
        0,
        source.reverse ? undefined : 1
      )"
      :key="source.id + '' + item.id"
    >
      <div class="prop-name ellipsis">
        <van-image class="img" :src="item.image" :lazy-load="true" />
        <span class="ellipsis">{{ item.name }}</span
        ><span>*{{ item.num }}</span>
      </div>
      <!-- <span class="integral shrink">-{{ source.integral }}<i></i> </span> -->
    </div>
    <div
      class="gift-footer line-t"
      v-if="source.items && source.items.length > 1"
    >
      <span
        class="action"
        @click="source.reverse = !source.reverse"
        :class="{ reverse: source.reverse }"
      >
        <svg-icon className="icon" name="down" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      // 每一行的索引
      type: Number,
    },
    itemClick: Function,
    source: {
      // 每一行的内容
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
.gift-item {
  position: relative;
  padding: 32px 32px 0;
  background: @bg-match;
  border-radius: 8px;
  margin-top: 32px;
  padding-bottom: 1px;
  .title {
    font-size: 36px;

    letter-spacing: 0;
    line-height: 44px;
    font-weight: bold;
  }
  label {
    margin-right: 24px;
  }
  .gift-name {
    position: relative;
    white-space: nowrap;
    margin-top: 16px;
    padding-bottom: 32px;
    display: flex;
    justify-content: space-between;
    &::after {
      border-color: @line1;
    }
  }
  .role-info {
    margin: 32px 0;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 34px;
  }
  .integral {
    display: flex;
    color: #ffdb00;
    i {
      width: 32px;
      height: 32px;
      .img("masonry","png");
      margin-left: 16px;
    }
  }
  .prop-item {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: space-between;
    .prop-name {
      display: flex;
      align-items: center;
      width: 70%;
    }
    .img {
      height: 88px;
      width: 88px;
      margin-right: 24px;
    }
  }
  .gift-status {
    top: 0;
    right: 0;
    position: absolute;
    width: 159px;
    height: 141px;
    .img("wait-get","png");
    &.active {
      .img("done-get","png");
    }
  }

  .gift-footer {
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::after {
      border-color: @line1;
    }
    .action {
      display: flex;
      align-items: center;
      height: 48px;
      width: 96px;
      background-color: @bg-dir;
      border-radius: 24px;
      justify-content: center;
      &.reverse .icon {
        transform: rotate(180deg);
      }
    }
    .icon {
      transition: all 0.2s;
      width: 36px;
      fill: #999;
    }
  }
}
</style>
